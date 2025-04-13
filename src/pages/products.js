import { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import styles from '../styles/Products.module.css';
import products from '@/data/products';
import { FaSync, FaBroom } from 'react-icons/fa';


export default function Products() {
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [priceFilter, setPriceFilter] = useState('All');
  const [sortOption, setSortOption] = useState('featured');

  // Get unique categories
  const categories = ['All', ...new Set(products.map(product => product.category))];

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
    
    let matchesPrice = true;
    if (priceFilter === 'Under $100') {
      matchesPrice = product.price < 100;
    } else if (priceFilter === '$100 - $500') {
      matchesPrice = product.price >= 100 && product.price <= 500;
    } else if (priceFilter === 'Over $500') {
      matchesPrice = product.price > 500;
    }
    
    return matchesCategory && matchesPrice;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'price-low') return a.price - b.price;
    if (sortOption === 'price-high') return b.price - a.price;
    if (sortOption === 'rating') return b.rating - a.rating;
    return a.id - b.id; // Featured
  });

  return (
    <div className={styles.electroTheme}>
      <Head>
        <title>Products | ElectroShop</title>
        <meta name="description" content="Browse our wide selection of electrical appliances" />
      </Head>
      
      <Header />
      
      <main className={styles.productsPage}>
        {/* Animated Circuit Background */}
        <div className={styles.circuitBackground}></div>
        
        <div className="container">
          <div className={styles.pageHeader}>
            <h1>
              <span className={styles.spark}>⚡</span> Our Products
              <span className={styles.spark}>⚡</span>
            </h1>
            <p className={styles.subtitle}>Power your home with cutting-edge technology</p>
          </div>
          
          <div className={styles.productsLayout}>
            <aside className={styles.sidebar}>
              <div className={styles.filterSection}>
                <h3>
                  <i className={`${styles.icon} fas fa-bolt`}></i> Categories
                </h3>
                <ul className={styles.filterList}>
                  {categories.map(category => (
                    <li key={category}>
                      <button 
                        className={`${styles.filterButton} ${categoryFilter === category ? styles.active : ''}`}
                        onClick={() => setCategoryFilter(category)}
                      >
                        {category === 'All' ? (
                          <><i className={`${styles.icon} fas fa-plug`}></i> All Categories</>
                        ) : (
                          <><i className={`${styles.icon} ${getCategoryIcon(category)}`}></i> {category}</>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className={styles.filterSection}>
                <h3>
                  <i className={`${styles.icon} fas fa-dollar-sign`}></i> Price Range
                </h3>
                <ul className={styles.filterList}>
                  {['All', 'Under $100', '$100 - $500', 'Over $500'].map(price => (
                    <li key={price}>
                      <button 
                        className={`${styles.filterButton} ${priceFilter === price ? styles.active : ''}`}
                        onClick={() => setPriceFilter(price)}
                      >
                        {price === 'All' ? (
                          <><i className={`${styles.icon} fas fa-coins`}></i> All Prices</>
                        ) : (
                          <><i className={`${styles.icon} fas fa-tag`}></i> {price}</>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              <button 
                className={styles.resetButton}
                onClick={() => {
                  setCategoryFilter('All');
                  setPriceFilter('All');
                  setSortOption('featured');
                }}
              >
  <FaSync className={styles.buttonIcon} /> Reset Filters
              </button>
            </aside>
            
            <div className={styles.productsContent}>
              <div className={styles.productsHeader}>
                <p className={styles.productCount}>
                  <i className={`${styles.icon} fas fa-microchip`}></i> {sortedProducts.length} products found
                </p>
                <div className={styles.sortOptions}>
                  <label htmlFor="sort">
                    <i className={`${styles.icon} fas fa-sort-amount-down`}></i> Sort by:
                  </label>
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
                  <p>Try adjusting your filters to find what you're looking for</p>
                  <button 
                    className={styles.clearFiltersButton}
                    onClick={() => {
                      setCategoryFilter('All');
                      setPriceFilter('All');
                    }}
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
    </div>
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