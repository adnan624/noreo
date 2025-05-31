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
  const pageSize = 20;

  const dispatch = useDispatch();
  const { productList, isLoading } = useSelector((state) => state.products);
  const { categoryList } = useSelector((state) => state.categroy);

  // Fetch products from API with filters and pagination
  const fetchProducts = () => {
    const params = {
      page: currentPage,
      limit: pageSize,
    };
    dispatch(getProductList(params));
  }

  // Refs for containers
  const searchBarRef = useRef(null);
  const filterPanelRef = useRef(null);
  const searchBarContainerRef = useRef(null);
  const mainRef = useRef(null);
  const searchInputRef = useRef(null);

  // Initialize component - no API calls needed
  useEffect(() => {
    fetchProducts()
    dispatch(getCategoryList())
  }, [currentPage]);

  // Handle URL changes and search parameter on initial load
  useEffect(() => {
    if (!router.isReady || loading) return;

    // Initialize on first load only
    if (isInitialRender.current) {
      const { category, search } = router.query;

      // Set search query from URL if coming from home page
      if (search && typeof search === 'string') {
        setSearchQuery(search);
      }

      isInitialRender.current = false;
    }
  }, [router.isReady, router.query, loading]);

  // Auto-focus search input when component mounts or when coming from home page
  useEffect(() => {
    // Only auto-focus once and after a short delay to ensure DOM is ready
    if (!hasAutoFocused.current && selectedCategory !== null && !loading) {
      const timer = setTimeout(() => {
        const searchInput = searchInputRef.current || document.querySelector(`.${styles.searchInput}`);
        if (searchInput) {
          // Focus the input to open keyboard on mobile/tablet
          searchInput.focus();

          // Force focus and trigger keyboard on mobile devices
          if (isMobile || window.innerWidth <= 1024) {
            // Trigger click event to ensure keyboard opens on mobile
            searchInput.click();

            // For iOS devices, sometimes we need to trigger focus multiple times
            setTimeout(() => {
              searchInput.focus();
            }, 100);
          }

          // If there's existing search text, position cursor at the end
          if (searchQuery) {
            searchInput.setSelectionRange(searchQuery.length, searchQuery.length);
          }

          hasAutoFocused.current = true;
        }
      }, 500); // Increased delay for mobile devices

      return () => clearTimeout(timer);
    }
  }, [searchQuery, isMobile, loading]);

  // Check if we're on mobile or tablet
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 1024); // Include tablets
    };

    // Check on initial load
    checkIfMobile();

    // Listen for resize events
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Detect keyboard open state on mobile and tablet
  useEffect(() => {
    if (!isMobile) return;

    const initialWindowHeight = window.innerHeight;

    // Function to detect keyboard
    const detectKeyboard = () => {
      // On most mobile devices, when keyboard opens, the window height becomes smaller
      const heightDifference = initialWindowHeight - window.innerHeight;
      const isKeyboardLikelyOpen = heightDifference > 150; // Reduced threshold for tablets

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
    const searchInput = searchInputRef.current || document.querySelector(`.${styles.searchInput}`);

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
  }, [isMobile, searchInputRef.current]);

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

  // Handle category filter change with URL update
  const handleCategoryChange = (category) => {
    // First update the state directly (immediate UI change)
    setselectedCategory(category.name);
    console.log(selectedCategory, 657890)

    // Then update the URL without causing a refresh
    const newQuery = { ...router.query };

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
    setselectedCategory('All');
    setPriceFilter('All');
    setSortOption('featured');
    setSearchQuery('');
    setCurrentPage(1);

    // Remove all query parameters from URL
    router.replace({
      pathname: router.pathname
    }, undefined, { shallow: true });
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate page numbers for pagination
  const generatePageNumbers = () => {
    const totalPages = productList?.pagination?.totalPages || 1;
    const current = productList?.pagination?.page || 1;
    const pages = [];

    if (totalPages <= 7) {
      // Show all pages if total pages is 7 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page
      pages.push(1);

      if (current <= 4) {
        // Show pages 2, 3, 4, 5, ..., last
        for (let i = 2; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (current >= totalPages - 3) {
        // Show 1, ..., last-4, last-3, last-2, last-1, last
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show 1, ..., current-1, current, current+1, ..., last
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
          ? `Browse our selection of `
          : "Browse our wide selection of electrical appliances"} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
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
                  {categoryList.map(category => (
                    <button
                      key={category}
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

            {/* Products Content */}
            <div className={`${styles.productsContent} ${keyboardOpen ? styles.keyboardOpenContent : ''}`}>
              {/* Category Title when filtered */}
              {selectedCategory !== 'All' && (
                <div className={styles.categoryHeader}>
                  <h2>{selectedCategory}</h2>
                  <p>{productList?.products?.length || 0} products found</p>
                </div>
              )}

              {/* Search Results Title */}
              {searchQuery && (
                <div className={styles.searchResultsHeader}>
                  <h2>Search Results for "{searchQuery}"</h2>
                  <p>{productList?.products?.length || 0} product{productList?.products?.length !== 1 ? 's' : ''} found</p>
                </div>
              )}

              {/* Products Grid or Loading */}
              {isLoading ? (
                <div className={styles.loadingContainer}>
                  <div className={styles.spinner}></div>
                  <p>Loading products...</p>
                </div>
              ) : productList?.products?.length > 0 ? (
                <div className={styles.productsGrid}>
                  {productList.products.map(product => (
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

              {/* Enhanced Pagination - Only show when not loading and has products */}
              {!isLoading && productList?.products?.length > 0 && productList?.pagination && (
                <div className={styles.paginationWrapper}>
                  <div className={styles.paginationContainer}>
                    {/* Previous Button */}
                    <button
                      disabled={productList.pagination.page <= 1}
                      onClick={() => handlePageChange(productList.pagination.page - 1)}
                      className={`${styles.paginationButton} ${styles.prevButton} ${productList.pagination.page <= 1 ? styles.disabled : ''}`}
                    >
                      <FaChevronLeft className={styles.paginationIcon} />
                      Previous
                    </button>

                    {/* Page Numbers */}
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

                    {/* Next Button */}
                    <button
                      disabled={productList.pagination.page >= productList.pagination.totalPages}
                      onClick={() => handlePageChange(productList.pagination.page + 1)}
                      className={`${styles.paginationButton} ${styles.nextButton} ${productList.pagination.page >= productList.pagination.totalPages ? styles.disabled : ''}`}
                    >
                      Next
                      <FaChevronRight className={styles.paginationIcon} />
                    </button>
                  </div>

                  {/* Results Info */}
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

      {/* <Footer marginTop="3rem" /> */}
    </>
  );
}