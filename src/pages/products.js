import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import styles from '../styles/Products.module.css';
import products from '@/data/products';
import { FaSync, FaBroom, FaSearch, FaFilter, FaTag, FaTh } from 'react-icons/fa';
import { getProductList } from '@/store/slices/productSlice/action';
import { useDispatch, useSelector } from 'react-redux';

export default function Products() {
  const dispatch = useDispatch()
  const router = useRouter();
  const isInitialRender = useRef(true);
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [priceFilter, setPriceFilter] = useState('All');
  const [sortOption, setSortOption] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Refs for containers
  const searchBarRef = useRef(null);
  const filterPanelRef = useRef(null);
  const searchBarContainerRef = useRef(null);
  const mainRef = useRef(null);
  
  // Get unique categories
  const categories = ['All', ...new Set(products.map(product => product.category))];

  const data = useSelector((state) => state.products.productList);
console.log('gokuuu',data?.data?.products)
  useEffect(()=>{
    console.log('bhaii kooooo')
    dispatch(getProductList())

    
  },[])

  // Handle URL changes only once on initial load
  useEffect(() => {
    if (!router.isReady) return;
    
    // Initialize category from URL on first load only
    if (isInitialRender.current) {
      const { category } = router.query;
      
      if (category && categories.includes(category)) {
        setCategoryFilter(category);
      } else {
        setCategoryFilter('All');
      }
      
      isInitialRender.current = false;
    }
  }, [router.isReady, router.query, categories]);

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Check on initial load
    checkIfMobile();
    
    // Listen for resize events
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Detect keyboard open state on mobile
  useEffect(() => {
    if (!isMobile) return;
    
    const initialWindowHeight = window.innerHeight;
    
    // Function to detect keyboard
    const detectKeyboard = () => {
      // On most mobile devices, when keyboard opens, the window height becomes smaller
      const heightDifference = initialWindowHeight - window.innerHeight;
      const isKeyboardLikelyOpen = heightDifference > 200; // Threshold of 200px for keyboard
      
      if (isKeyboardLikelyOpen !== keyboardOpen) {
        setKeyboardOpen(isKeyboardLikelyOpen);
        
        // When keyboard opens, ensure search bar is in view if needed
        if (isKeyboardLikelyOpen && searchBarRef.current) {
          // Ensure search bar is in view when keyboard opens
          const rect = searchBarRef.current.getBoundingClientRect();
          if (rect.top < 0 || rect.bottom > window.innerHeight) {
            window.scrollTo({ 
              top: window.scrollY + rect.top - 10, // Position just below the top
              behavior: 'smooth' 
            });
          }
        }
      }
    };
    
    // Listen for resize events that might indicate keyboard appearance
    window.addEventListener('resize', detectKeyboard);
    
    // Initialize window height reference
    detectKeyboard();
    
    return () => window.removeEventListener('resize', detectKeyboard);
  }, [isMobile, keyboardOpen]);

  // Add focus/blur event listeners to handle keyboard appearance on mobile
  useEffect(() => {
    const searchInput = document.querySelector(`.${styles.searchInput}`);
    
    if (searchInput) {
      const handleFocus = () => {
        if (isMobile) {
          // Mark keyboard as open - this may happen before resize event
          setKeyboardOpen(true);
          
          // Ensure the input is visible - scroll to it if needed
          const rect = searchInput.getBoundingClientRect();
          if (rect.top < 0 || rect.bottom > window.innerHeight) {
            window.scrollTo({ 
              top: window.scrollY + rect.top - 60, // Position with some space above
              behavior: 'smooth'
            });
          }
        }
      };
      
      const handleBlur = () => {
        // Reset keyboard state on blur after a delay
        if (isMobile) {
          setTimeout(() => {
            setKeyboardOpen(false);
          }, 300);
        }
      };
      
      searchInput.addEventListener('focus', handleFocus);
      searchInput.addEventListener('blur', handleBlur);
      
      return () => {
        searchInput.removeEventListener('focus', handleFocus);
        searchInput.removeEventListener('blur', handleBlur);
      };
    }
  }, [isMobile]);

  // If categoryFilter is null (initial state), don't render products yet
  if (categoryFilter === null) {
    return (
      <>
        <Head>
          <title>Products | ElectroShop</title>
          <meta name="description" content="Browse our wide selection of electrical appliances" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        </Head>
        <Header />
        <main className={styles.productsPage}>
          <div className={styles.circuitBackground}></div>
          <div className={styles.container}>
            <div className={styles.loadingContainer}>
              <div className={styles.spinner}></div>
              <p>Loading products...</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
    
    let matchesPrice = true;
    if (priceFilter === 'Under $100') {
      matchesPrice = product.price < 100;
    } else if (priceFilter === '$100 - $500') {
      matchesPrice = product.price >= 100 && product.price <= 500;
    } else if (priceFilter === '$500 - $1000') {
      matchesPrice = product.price > 500 && product.price <= 1000;
    } else if (priceFilter === 'Over $1000') {
      matchesPrice = product.price > 1000;
    } else if (priceFilter === 'Premium') {
      matchesPrice = product.price > 2000;
    }
    
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesPrice && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'price-low') return a.price - b.price;
    if (sortOption === 'price-high') return b.price - a.price;
    if (sortOption === 'rating') return b.rating - a.rating;
    return a.id - b.id; // Featured
  });

  // Handle category filter change with URL update
  const handleCategoryChange = (category) => {
    // First update the state directly (immediate UI change)
    setCategoryFilter(category);
    
    // Then update the URL without causing a refresh
    const newQuery = {...router.query};
    
    if (category === 'All') {
      delete newQuery.category;
    } else {
      newQuery.category = category;
    }
    
    // Use replace instead of push to avoid adding to history
    router.replace({
      pathname: router.pathname,
      query: newQuery
    }, undefined, { shallow: true });
    
    // Scroll to top when changing category on mobile
    if (isMobile) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle search reset
  const handleResetAll = () => {
    // Reset all filters in component state first
    setCategoryFilter('All');
    setPriceFilter('All');
    setSortOption('featured');
    setSearchQuery('');
    
    // Remove all query parameters from URL
    router.replace({
      pathname: router.pathname
    }, undefined, { shallow: true });
  };

  return (
    <>
      <Head>
        <title>{categoryFilter !== 'All' ? `${categoryFilter} | ElectroShop` : 'Products | ElectroShop'}</title>
        <meta name="description" content={categoryFilter !== 'All' 
          ? `Browse our selection of ${categoryFilter.toLowerCase()}`
          : "Browse our wide selection of electrical appliances"} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      <Header />
      <main className={styles.productsPage} ref={mainRef}>
        {/* Animated Circuit Background */}
        <div className={styles.circuitBackground}></div>

        <div className={styles.container}>
          <div className={styles.filterContainer}>
            {/* Filter Panel */}
            <div className={styles.filterPanel} ref={filterPanelRef}>
              <div className={styles.filterSection}>
                <div className={styles.filterHeader}>
                  <FaTh className={styles.filterIcon} />
                  <h3>Categories</h3>
                </div>
                <div className={styles.filterButtons}>
                  {categories.map(category => (
                    <button
                      key={category}
                      className={`${styles.filterButton} ${categoryFilter === category ? styles.active : ''}`}
                      onClick={() => handleCategoryChange(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.filterSection}>
                <div className={styles.filterHeader}>
                  <FaTag className={styles.filterIcon} />
                  <h3>Price Range</h3>
                </div>
                <div className={styles.filterButtons}>
                  {['All', 'Under $100', '$100 - $500', '$500 - $1000', 'Over $1000', 'Premium'].map(price => (
                    <button
                      key={price}
                      className={`${styles.filterButton} ${priceFilter === price ? styles.active : ''}`}
                      onClick={() => setPriceFilter(price)}
                    >
                      {price === 'All' ? 'All Prices' : price}
                    </button>
                  ))}
                </div>
              </div>

              <button
                className={styles.resetButton}
                onClick={handleResetAll}
              >
                <FaSync className={styles.buttonIcon} /> Reset All
              </button>
            </div>

            {/* Search Bar Container */}
            <div 
              className={`${styles.searchBarContainer} ${keyboardOpen ? styles.keyboardOpenContainer : ''}`} 
              ref={searchBarContainerRef}
            >
              <div
                ref={searchBarRef}
                className={`
                  ${styles.searchSortBar} 
                  ${styles.fixedSearchBar} 
                  ${keyboardOpen ? styles.keyboardOpenSearchBar : ''}
                `}
              >
                <div className={styles.searchContainer}>
                  <div className={styles.searchInputWrapper}>
                    <FaSearch className={styles.searchIcon} />
                    <input
                      type="text"
                      placeholder="Search products, categories, or features..."
                      className={styles.searchInput}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                      <button
                        className={styles.searchClearButton}
                        onClick={() => setSearchQuery('')}
                        aria-label="Clear search"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
                <div className={`${styles.sortOptions} ${keyboardOpen ? styles.keyboardOpenSortOptions : ''}`}>
                  <label htmlFor="sort">Sort by:</label>
                  <select
                    id="sort"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className={styles.sortSelect}
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Customer Rating</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Content */}
            <div className={`${styles.productsContent} ${keyboardOpen ? styles.keyboardOpenContent : ''}`}>
              {/* Category Title when filtered */}
              {categoryFilter !== 'All' && (
                <div className={styles.categoryHeader}>
                  <h2>{categoryFilter}</h2>
                  <p>{sortedProducts.length} products found</p>
                </div>
              )}
              
              {sortedProducts.length > 0 ? (
                <div className={styles.productsGrid}>
                  {sortedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className={styles.noResults}>
                  <div className={styles.noResultsIcon}>
                    <i className="fas fa-unlink"></i>
                  </div>
                  <h3>No products found</h3>
                  {searchQuery ? (
                    <p>No products match your search term "{searchQuery}". Try a different keyword or adjust your filters.</p>
                  ) : (
                    <p>Try adjusting your filters to find what you're looking for</p>
                  )}
                  <button
                    className={styles.clearFiltersButton}
                    onClick={handleResetAll}
                  >
                    <FaBroom className={styles.buttonIcon} /> Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}