import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import styles from '../styles/Products.module.css';
import { FaSync, FaBroom, FaSearch, FaFilter, FaTag, FaTh, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getProductList } from '@/store/slices/productSlice/action';
import { getCategoryList } from '@/store/slices/categorySlice/action';
import { clearCart } from '@/store/slices/cartSlice/cartSlice';
import { getWishlist } from '@/store/slices/wishlistSlice/action';

export default function Products() {
  const router = useRouter();
  const isInitialRender = useRef(true);
  const hasAutoFocused = useRef(false);
  const [selectedCategory, setselectedCategory] = useState('All');
  const [priceFilter, setPriceFilter] = useState('All');
  const [sortOption, setSortOption] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [shouldAutoFocus, setShouldAutoFocus] = useState(false);
  const [products, setProducts] = useState([]);
  const pageSize = 30;
  

  const dispatch = useDispatch();
  const { productList, isLoading } = useSelector((state) => state.products);
  const {wishlist} = useSelector(state => state.wishlist.wishlistItems);
  const { categoryList } = useSelector((state) => state.categroy);


useEffect(()=>{
  const wishlistIds = wishlist?.map(item => item._id);
  const updatedProducts = productList.products.map(product => ({
    ...product,
    isWishlisted: wishlistIds?.includes(product._id)
  }));
  setProducts(updatedProducts);
  console.log("product change")
},[productList.products , wishlist])



  // Fetch products from API with filters and pagination
  const fetchProducts = () => {
    const params = {
      page: currentPage,
      limit: pageSize,
      category: selectedCategory !== 'All' ? selectedCategory : undefined,
      priceFilter,
      sort: sortOption,
    };
    console.log('Fetching products with params:', params);
    dispatch(getProductList(params));
    dispatch(getWishlist());
  };

  // Refs for containers
  const searchBarRef = useRef(null);
  const filterPanelRef = useRef(null);
  const searchBarContainerRef = useRef(null);
  const mainRef = useRef(null);
  const searchInputRef = useRef(null);

  // Check for duplicate product IDs
  useEffect(() => {
    if (productList?.products) {
      const ids = productList.products.map(product => product.id);
      const uniqueIds = new Set(ids);
      if (ids.length !== uniqueIds.size) {
        console.error('Duplicate product IDs found:', ids);
        console.log('Product list:', productList.products.map(p => ({ id: p.id, name: p.name })));
      } else {
        console.log('All product IDs are unique');
      }
      console.log('Full productList:', productList);
    }
  }, [productList]);

  // Initialize component
  useEffect(() => {
    fetchProducts();
    dispatch(getCategoryList());
  }, [currentPage, selectedCategory, priceFilter, sortOption]);

  // Check if mobile or tablet
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Handle URL changes and search parameter on initial load
  useEffect(() => {
    if (!router.isReady) return;

    if (isInitialRender.current) {
      const { category, search, fromHome } = router.query;
      
      // Check if user came from home page search
      if (fromHome === 'true' || search) {
        setShouldAutoFocus(true);
      }
      
      if (search && typeof search === 'string') {
        setSearchQuery(search);
      }
      
      setLoading(false);
      isInitialRender.current = false;
    }
  }, [router.isReady, router.query]);

  // Enhanced auto-focus logic
  useEffect(() => {
    if (!shouldAutoFocus || hasAutoFocused.current || loading) return;

    const focusSearchInput = () => {
      const searchInput = searchInputRef.current || document.querySelector(`.${styles.searchInput}`);
      if (searchInput) {
        // Force focus with multiple attempts for mobile devices
        const attemptFocus = (attempt = 0) => {
          if (attempt > 3) return;
          
          searchInput.focus();
          
          // For mobile devices, trigger click to ensure keyboard opens
          if (isMobile || window.innerWidth <= 1024) {
            searchInput.click();
            
            // Additional focus attempt after click
            setTimeout(() => {
              searchInput.focus();
              // Set cursor to end of text if there's a search query
              if (searchQuery) {
                searchInput.setSelectionRange(searchQuery.length, searchQuery.length);
              }
            }, 100);
          } else {
            // Desktop - just set cursor position
            if (searchQuery) {
              searchInput.setSelectionRange(searchQuery.length, searchQuery.length);
            }
          }
          
          // Verify focus worked, retry if not
          setTimeout(() => {
            if (document.activeElement !== searchInput) {
              attemptFocus(attempt + 1);
            } else {
              hasAutoFocused.current = true;
              // Scroll to search bar if needed
              if (searchBarRef.current) {
                searchBarRef.current.scrollIntoView({ 
                  behavior: 'smooth', 
                  block: 'start' 
                });
              }
            }
          }, 200);
        };

        attemptFocus();
      }
    };

    // Wait for component to be fully rendered
    const timer = setTimeout(focusSearchInput, 300);
    return () => clearTimeout(timer);
  }, [shouldAutoFocus, searchQuery, isMobile, loading]);

  // Detect keyboard open state for mobile
  useEffect(() => {
    if (!isMobile) return;
    
    const initialWindowHeight = window.innerHeight;
    const detectKeyboard = () => {
      const heightDifference = initialWindowHeight - window.innerHeight;
      const isKeyboardLikelyOpen = heightDifference > 150;
      
      if (isKeyboardLikelyOpen !== keyboardOpen) {
        setKeyboardOpen(isKeyboardLikelyOpen);
        
        // Adjust scroll position when keyboard opens
        if (isKeyboardLikelyOpen && searchBarRef.current) {
          setTimeout(() => {
            const rect = searchBarRef.current.getBoundingClientRect();
            if (rect.top < 0 || rect.bottom > window.innerHeight) {
              window.scrollTo({
                top: window.scrollY + rect.top - 20,
                behavior: 'smooth',
              });
            }
          }, 300);
        }
      }
    };
    
    // Listen for both resize and visual viewport changes
    window.addEventListener('resize', detectKeyboard);
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', detectKeyboard);
    }
    
    detectKeyboard();
    
    return () => {
      window.removeEventListener('resize', detectKeyboard);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', detectKeyboard);
      }
    };
  }, [isMobile, keyboardOpen]);

  // Enhanced focus/blur event listeners
  useEffect(() => {
    const searchInput = searchInputRef.current || document.querySelector(`.${styles.searchInput}`);
    if (!searchInput) return;

    const handleFocus = () => {
      if (isMobile) {
        setKeyboardOpen(true);
        
        // Ensure search bar is visible
        setTimeout(() => {
          const rect = searchInput.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          
          if (rect.top < 60 || rect.bottom > viewportHeight - 100) {
            window.scrollTo({
              top: window.scrollY + rect.top - 80,
              behavior: 'smooth',
            });
          }
        }, 300);
      }
    };

    const handleBlur = () => {
      if (isMobile) {
        // Delay to allow for keyboard animation
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
  }, [isMobile]);

  // Show loading while initializing
  if (isLoading && !productList?.products) {
    return (
      <>
        <Head>
          <title>Products | ElectroShop</title>
          <meta name="description" content="Browse our wide selection of electrical appliances" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        </Head>
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

  // Handle category filter change
  const handleCategoryChange = (category) => {
    setselectedCategory(category.name);
    const newQuery = { ...router.query };
    delete newQuery.fromHome; // Remove the fromHome flag
    router.replace({
      pathname: router.pathname,
      query: newQuery,
    }, undefined, { shallow: true });
    if (isMobile) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle search reset
  const handleResetAll = () => {
    setselectedCategory('All');
    setPriceFilter('All');
    setSortOption('featured');
    setSearchQuery('');
    setCurrentPage(1);
    dispatch(clearCart()); // Reset cart to clear any corrupted state
    router.replace({
      pathname: router.pathname,
    }, undefined, { shallow: true });
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate page numbers for pagination
  const generatePageNumbers = () => {
    const totalPages = productList?.pagination?.totalPages || 1;
    const current = productList?.pagination?.page || 1;
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (current <= 4) {
        for (let i = 2; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (current >= totalPages - 3) {
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push('...');
        for (let i = current - 1; i <= current + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <>
      <Head>
        <title>{selectedCategory !== 'All' ? `${selectedCategory} | ElectroShop` : 'Products | ElectroShop'}</title>
        <meta name="description" content={selectedCategory !== 'All'
          ? `Browse our selection of ${selectedCategory}`
          : "Browse our wide selection of electrical appliances"} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      <main className={styles.productsPage} ref={mainRef}>
        <div className={styles.circuitBackground}></div>
        <div className={styles.container}>
          <div className={styles.filterContainer}>
            <div className={styles.filterPanel} ref={filterPanelRef}>
              <div className={styles.filterSection}>
                <div className={styles.filterHeader}>
                  <FaTh className={styles.filterIcon} />
                  <h3>Categories</h3>
                </div>
                <div className={styles.filterButtons}>
                  {categoryList.map(category => (
                    <button
                      key={category.id}
                      className={`${styles.filterButton} ${selectedCategory === category.name ? styles.active : ''}`}
                      onClick={() => handleCategoryChange(category)}
                    >
                      {category.name}
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
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search products, categories, or features..."
                      className={styles.searchInput}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                      inputMode="search"
                      enterKeyHint="search"
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
            <div className={`${styles.productsContent} ${keyboardOpen ? styles.keyboardOpenContent : ''}`}>
              {selectedCategory !== 'All' && (
                <div className={styles.categoryHeader}>
                  <h2>{selectedCategory}</h2>
                  <p>{productList?.products?.length || 0} products found</p>
                </div>
              )}
              {searchQuery && (
                <div className={styles.searchResultsHeader}>
                  <h2>Search Results for "{searchQuery}"</h2>
                  <p>{productList?.products?.length || 0} product{productList?.products?.length !== 1 ? 's' : ''} found</p>
                </div>
              )}
              {isLoading ? (
                <div className={styles.loadingContainer}>
                  <div className={styles.spinner}></div>
                  <p>Loading products...</p>
                </div>
              ) : productList?.products?.length > 0 ? (
                <div className={styles.productsGrid}>
                  {products.map((product, index) => (
                    <ProductCard 
                      key={product._id || `${product.id}-${index}`} 
                      product={{ ...product, uniqueId: product._id || `${product.id}-${index}` }} 
                      onWishlistToggle={()=>{
                        dispatch(getWishlist())
                      }}
                    
                    />
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
              {!isLoading && productList?.products?.length > 0 && productList?.pagination && (
                <div className={styles.paginationWrapper}>
                  <div className={styles.paginationContainer}>
                    <button
                      disabled={productList.pagination.page <= 1}
                      onClick={() => handlePageChange(productList.pagination.page - 1)}
                      className={`${styles.paginationButton} ${styles.prevButton} ${productList.pagination.page <= 1 ? styles.disabled : ''}`}
                    >
                      <FaChevronLeft className={styles.paginationIcon} />
                      Previous
                    </button>
                    <div className={styles.pageNumbers}>
                      {generatePageNumbers().map((page, index) => (
                        <button
                          key={index}
                          onClick={() => typeof page === 'number' ? handlePageChange(page) : null}
                          className={`
                            ${styles.pageNumber} 
                            ${productList.pagination.page === page ? styles.activePage : ''} 
                            ${typeof page !== 'number' ? styles.ellipsis : ''}
                          `}
                          disabled={typeof page !== 'number'}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                    <button
                      disabled={productList.pagination.page >= productList.pagination.totalPages}
                      onClick={() => handlePageChange(productList.pagination.page + 1)}
                      className={`${styles.paginationButton} ${styles.nextButton} ${productList.pagination.page >= productList.pagination.totalPages ? styles.disabled : ''}`}
                    >
                      Next
                      <FaChevronRight className={styles.paginationIcon} />
                    </button>
                  </div>
                  <div className={styles.resultsInfo}>
                    <p>
                      Showing{' '}
                      <span className={styles.resultNumber}>
                        {((productList.pagination.page - 1) * productList.pagination.limit) + 1}
                      </span>
                      -
                      <span className={styles.resultNumber}>
                        {Math.min(productList.pagination.page * productList.pagination.limit, productList.pagination.total)}
                      </span>
                      {' '}of{' '}
                      <span className={styles.resultNumber}>
                        {productList.pagination.total}
                      </span>
                      {' '}products
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}