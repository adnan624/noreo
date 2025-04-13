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
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      </Head>
      
      <Header />
      
      <main>
          <div className={styles.circuitBackground}></div>
        {/* // */}
        {/* Hero Section with Particles */}
        <section className={styles.hero}>
          <div className={styles.particles}>
            {[...Array(15)].map((_, i) => (
              <div key={i} className={styles.particle} style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 20 + 10}s`
              }} />
            ))}
          </div>
          <div className="container">
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>Upgrade Your Home <span>with Smart Appliances</span></h1>
              <p className={styles.heroSubtitle}>Discover our premium collection of energy-efficient and smart home appliances</p>
              <div className={styles.heroButtons}>
                <Link href="/products" className={`${styles.btn} ${styles.btnPrimary}`}>Shop Now</Link>
                <Link href="/about" className={`${styles.btn} ${styles.btnOutline}`}>Learn More</Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Products */}
        <section className={`${styles.section}`}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Featured Products</h2>
              <p className={styles.sectionSubtitle}>Carefully selected for their quality and performance</p>
            </div>
            <div className={styles.productsGrid}>
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className={styles.seeAllContainer}>
              <Link href="/products" className={`${styles.btn} ${styles.btnOutline}`}>
                View All Products <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Animated Banner */}
        <section className={styles.banner}>
          <div className={styles.bannerOverlay}></div>
          <div className={styles.floatingCircle}></div>
          <div className={styles.floatingTriangle}></div>
          <div className="container">
            <div className={styles.bannerContent}>
              <h2>Summer Sale!</h2>
              <p>Up to <span className={styles.highlight}>30% off</span> on selected items. Limited time offer.</p>
              <Link href="/products" className={`${styles.btn} ${styles.btnWhite}`}>
                Shop Sale <i className="fas fa-bolt"></i>
              </Link>
            </div>
          </div>
        </section>
        
        {/* On Sale Products */}
        <section className={styles.section}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Hot Deals</h2>
              <p className={styles.sectionSubtitle}>Limited time offers you don't want to miss</p>
            </div>
            <div className={styles.productsGrid}>
              {onSaleProducts.map(product => (
                <ProductCard key={product.id} product={product} isOnSale={true} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Features */}
        <section className={`${styles.section} ${styles.featuresSection}`}>
          <div className={styles.featuresPattern}></div>
          <div className="container">
            <div className={styles.featuresGrid}>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <i className="fas fa-truck"></i>
                </div>
                <h3>Free Shipping</h3>
                <p>On orders over $100</p>
                <div className={styles.featureHoverEffect}></div>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <i className="fas fa-undo"></i>
                </div>
                <h3>Easy Returns</h3>
                <p>30-day return policy</p>
                <div className={styles.featureHoverEffect}></div>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <i className="fas fa-lock"></i>
                </div>
                <h3>Secure Payment</h3>
                <p>100% secure checkout</p>
                <div className={styles.featureHoverEffect}></div>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <i className="fas fa-headset"></i>
                </div>
                <h3>24/7 Support</h3>
                <p>Dedicated support</p>
                <div className={styles.featureHoverEffect}></div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Newsletter */}
        <section className={`${styles.section}`}>
          <div className="container">
            <div className={styles.newsletterContainer}>
              <h2>Stay Updated</h2>
              <p>Subscribe to our newsletter for the latest products and exclusive offers</p>
              <form className={styles.newsletterForm}>
                <input type="email" placeholder="Your email address" required />
                <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
                  Subscribe <i className="fas fa-paper-plane"></i>
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}