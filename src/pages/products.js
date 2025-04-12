import { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

import styles from '../styles/Products.module.css';
import products from '@/data/products';

export default function Products() {
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [priceFilter, setPriceFilter] = useState('All');
  const [sortOption, setSortOption] = useState('featured');

  // Get unique categories
  const categories = ['All', ...new Set(products.map(product => product.category))];

  // Filter products based on selected filters
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

  // Sort products based on selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'price-low') {
      return a.price - b.price;
    } else if (sortOption === 'price-high') {
      return b.price - a.price;
    } else if (sortOption === 'rating') {
      return b.rating - a.rating;
    } else {
      // Featured (default) - could implement your own logic here
      return a.id - b.id;
    }
  });

  return (
    <>
      <Head>
        <title>Products | ElectroShop</title>
        <meta name="description" content="Browse our wide selection of electrical appliances" />
      </Head>
      
      <Header />
      
      <main className={styles.productsPage}>
        <div className="container">
          <div className={styles.pageHeader}>
            <h1>Our Products</h1>
            <p>Find the perfect appliance for your home</p>
          </div>
          
          <div className={styles.productsLayout}>
            <aside className={styles.sidebar}>
              <div className={styles.filterSection}>
                <h3>Categories</h3>
                <ul className={styles.filterList}>
                  {categories.map(category => (
                    <li key={category}>
                      <button 
                        className={`${styles.filterButton} ${categoryFilter === category ? styles.active : ''}`}
                        onClick={() => setCategoryFilter(category)}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className={styles.filterSection}>
                <h3>Price Range</h3>
                <ul className={styles.filterList}>
                  {['All', 'Under $100', '$100 - $500', 'Over $500'].map(price => (
                    <li key={price}>
                      <button 
                        className={`${styles.filterButton} ${priceFilter === price ? styles.active : ''}`}
                        onClick={() => setPriceFilter(price)}
                      >
                        {price}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
            
            <div className={styles.productsContent}>
              <div className={styles.productsHeader}>
                <p>{sortedProducts.length} products found</p>
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
              
              <div className={styles.productsGrid}>
                {sortedProducts.length > 0 ? (
                  sortedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))
                ) : (
                  <div className={styles.noResults}>
                    <p>No products match your selected filters.</p>
                    <button 
                      className="btn btn-outline"
                      onClick={() => {
                        setCategoryFilter('All');
                        setPriceFilter('All');
                      }}
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}