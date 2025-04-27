import { useState, useEffect, useRef, useCallback } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import styles from '../styles/Products.module.css';
import products from '@/data/products';
import { FaSync, FaBroom, FaSearch, FaFilter, FaTag, FaTh } from 'react-icons/fa';

export default function Products() {
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [priceFilter, setPriceFilter] = useState('All');
  const [sortOption, setSortOption] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSticky, setIsSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  
  // Refs for sticky behavior
  const searchBarRef = useRef(null);
  const filterPanelRef = useRef(null);
  const searchBarContainerRef = useRef(null);
  
  // Get unique categories
  const categories = ['All', ...new Set(products.map(product => product.category))];

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
    
    // Function to detect keyboard
    const detectKeyboard = () => {
      // On most mobile devices, when keyboard opens, the window height becomes smaller
      const isKeyboardLikelyOpen = window.innerHeight < window.outerHeight * 0.75;
      setKeyboardOpen(isKeyboardLikelyOpen);
      
      // When keyboard opens, we force sticky mode
      if (isKeyboardLikelyOpen && !isSticky) {
        setIsSticky(true);
      }
    };
    
    // Listen for resize events that might indicate keyboard appearance
    window.addEventListener('resize', detectKeyboard);
    
    return () => window.removeEventListener('resize', detectKeyboard);
  }, [isMobile, isSticky]);

  // Create memoized scroll handler to prevent recreating on each render
  const handleScroll = useCallback(() => {
    // Skip scroll handling if keyboard is open on mobile
    if (isMobile && keyboardOpen) return;
    
    if (filterPanelRef.current && searchBarRef.current) {
      // Get the position of the filter panel bottom relative to viewport
      const filterPanelRect = filterPanelRef.current.getBoundingClientRect();
      
      // For both mobile and desktop, use the same logic
      // If we've scrolled past the filter panel, make the search bar sticky
      if (filterPanelRect.bottom <= 0) {
        if (!isSticky) {
          setIsSticky(true);
        }
      } else {
        if (isSticky) {
          setIsSticky(false);
        }
      }
    }
  }, [isSticky, isMobile, keyboardOpen]);
  
  // Handle scroll event to make search bar sticky
  useEffect(() => {
    // Add event listener with passive option for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    handleScroll();
    
    // Add resize listener to handle orientation changes
    window.addEventListener('resize', handleScroll, { passive: true });
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll]);

  // Add focus/blur event listeners to handle keyboard appearance on mobile
  useEffect(() => {
    const searchInput = document.querySelector(`.${styles.searchInput}`);
    
    if (searchInput) {
      const handleFocus = () => {
        // Force sticky on focus (when keyboard appears)
        setIsSticky(true);
        
        // On mobile, set keyboard open state
        if (isMobile) {
          setKeyboardOpen(true);
        }
      };
      
      const handleBlur = () => {
        // On mobile, reset keyboard open state after a short delay
        // to allow scroll position to adjust
        if (isMobile) {
          setTimeout(() => {
            setKeyboardOpen(false);
            // Recalculate sticky state based on scroll position
            handleScroll();
          }, 300);
        }
      };
      
      // Touch events to better handle mobile interactions
      const handleTouchStart = () => {
        // On mobile, force sticky behavior when interacting with search
        if (isMobile) {
          setIsSticky(true);
        }
      };
      
      searchInput.addEventListener('focus', handleFocus);
      searchInput.addEventListener('blur', handleBlur);
      searchInput.addEventListener('touchstart', handleTouchStart);
      
      return () => {
        searchInput.removeEventListener('focus', handleFocus);
        searchInput.removeEventListener('blur', handleBlur);
        searchInput.removeEventListener('touchstart', handleTouchStart);
      };
    }
  }, [isMobile, handleScroll]);

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

  // Handle search reset
  const handleResetAll = () => {
    setCategoryFilter('All');
    setPriceFilter('All');
    setSortOption('featured');
    setSearchQuery('');
  };

  return (
    <>
      <Head>
        <title>Products | ElectroShop</title>
        <meta name="description" content="Browse our wide selection of electrical appliances" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      <Header />
      <main className={styles.productsPage}>
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
                      onClick={() => setCategoryFilter(category)}
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

            {/* Search Bar Container with padding placeholder */}
            <div className={styles.searchBarContainer} ref={searchBarContainerRef}>
              {/* Padding placeholder that activates when search bar is sticky */}
              <div className={`${styles.stickyPadding} ${isSticky ? styles.active : ''}`}></div>
              
              {/* Search/Sort Bar */}
              <div
                ref={searchBarRef}
                className={`${styles.searchSortBar} ${isSticky ? styles.stickySearchBar : ''} ${keyboardOpen ? styles.keyboardOpenSearchBar : ''}`}
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
                <div className={styles.sortOptions}>
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
            <div className={styles.productsContent}>
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

// Helper function to get icons for categories
function getCategoryIcon(category) {
  switch(category) {
    case 'Televisions': return 'fas fa-tv';
    case 'Computers': return 'fas fa-laptop';
    case 'Phones': return 'fas fa-mobile-alt';
    case 'Audio': return 'fas fa-headphones';
    case 'Gaming': return 'fas fa-gamepad';
    case 'Home Appliances': return 'fas fa-blender';
    default: return 'fas fa-plug';
  }
}