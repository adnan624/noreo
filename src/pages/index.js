import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';

import ProductCard from '../components/ProductCard';
import products from '../data/products';
import styles from '../styles/Home.module.css';
import Footer from '@/components/Footer';


export default function Home() {
  const featuredProducts = products.slice(0, 4);
  const onSaleProducts = products.slice(2, 6);

  return (
    <>
      <Head>
        <title>ElectroShop - Premium Electrical Appliances</title>
        <meta name="description" content="Shop the best electrical appliances for your home at competitive prices" />
      </Head>
      
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>Upgrade Your Home with Smart Appliances</h1>
              <p className={styles.heroSubtitle}>Discover our premium collection of energy-efficient and smart home appliances</p>
              <Link href="/products" className="btn btn-primary">Shop Now</Link>
            </div>
          </div>
        </section>
        
        {/* Featured Products */}
        <section className={`${styles.section} ${styles.featuredSection}`}>
          <div className="container">
            <h2 className="section-title">Featured Products</h2>
            <div className={styles.productsGrid}>
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className={styles.seeAllContainer}>
              <Link href="/products" className="btn btn-outline">View All Products</Link>
            </div>
          </div>
        </section>
        
        {/* Banner */}
        <section className={styles.banner}>
          <div className="container">
            <div className={styles.bannerContent}>
              <h2>Summer Sale!</h2>
              <p>Up to 30% off on selected items. Limited time offer.</p>
              <Link href="/products" className="btn btn-primary">Shop Sale</Link>
            </div>
          </div>
        </section>
        
        {/* On Sale Products */}
        <section className={styles.section}>
          <div className="container">
            <h2 className="section-title">On Sale</h2>
            <div className={styles.productsGrid}>
              {onSaleProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Features */}
        <section className={`${styles.section} ${styles.featuresSection}`}>
          <div className="container">
            <div className={styles.featuresGrid}>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <i className="fas fa-truck"></i>
                </div>
                <h3>Free Shipping</h3>
                <p>On orders over $100</p>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <i className="fas fa-undo"></i>
                </div>
                <h3>Easy Returns</h3>
                <p>30-day return policy</p>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <i className="fas fa-lock"></i>
                </div>
                <h3>Secure Payment</h3>
                <p>100% secure checkout</p>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <i className="fas fa-headset"></i>
                </div>
                <h3>24/7 Support</h3>
                <p>Dedicated support</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}