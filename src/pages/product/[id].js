import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Rating from '../../components/Rating';
import products from '../../data/products';
import styles from '../../styles/Product.module.css';
import ProductCard from '@/components/ProductCard';                                 

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const mainImageRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  
  // Find product from the router query id
  const product = products.find(p => p?.id === parseInt(id));
  
  // Product images array (defined outside conditionals to avoid hook order issues)
  const productImages = product ? [
    product.image,
    `/images/products/${product.id}_alt1.jpg`,
    `/images/products/${product.id}_alt2.jpg`,
    `/images/products/${product.id}_alt3.jpg`,
  ] : [];

  // Handle quantity change
  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity > 0 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  // Handle add to cart
  const handleAddToCart = () => {
    if (product) {
      // Here you would implement your cart logic
      alert(`Added ${quantity} ${product.name} to cart`);
    }
  };

  // Handle image navigation with swiping
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const difference = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;
    
    if (Math.abs(difference) > minSwipeDistance) {
      if (difference > 0) {
        // Swiped left - show next image
        nextImage();
      } else {
        // Swiped right - show previous image
        prevImage();
      }
    }
  };

  const nextImage = () => {
    if (productImages.length > 0) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === productImages.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (productImages.length > 0) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? productImages.length - 1 : prevIndex - 1
      );
    }
  };

  // Add swipe indicator effect for mobile
  useEffect(() => {
    if (!mainImageRef.current) return;
    
    const showSwipeIndicator = () => {
      if (mainImageRef.current && window.innerWidth <= 768) {
        mainImageRef.current.classList.add(styles.showSwipeIndicator);
        setTimeout(() => {
          if (mainImageRef.current) {
            mainImageRef.current.classList.remove(styles.showSwipeIndicator);
          }
        }, 2000);
      }
    };

    // Show swipe indicator on first load
    showSwipeIndicator();

    // Add an event listener to show swipe indicator when the element comes into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          showSwipeIndicator();
        }
      });
    }, { threshold: 0.7 });

    observer.observe(mainImageRef.current);

    return () => {
      if (mainImageRef.current) {
        observer.unobserve(mainImageRef.current);
      }
    };
  }, []);

  // Handle loading state
  if (!product) {
    return (
      <>
        <Header />
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading product...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{product.name} | ElectroShop</title>
        <meta name="description" content={product.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
      <Header />
      
      <main className={styles.productPage}>
        {/* Breadcrumb Navigation */}
        {/* <div className={styles.circuitBackground}> */}
        <div className={styles.container}>
          <nav className={styles.breadcrumb}>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href={`/products?category=${encodeURIComponent(product.category)}`}>{product.category}</Link></li>
              <li className={styles.active}>{product.name}</li>
            </ul>
          </nav>
          
          <div className={styles.productDetail}>
            <div className={styles.productGallery}>
            <div 
  className={styles.mainImage} 
  ref={mainImageRef}
  onTouchStart={handleTouchStart}
  onTouchMove={handleTouchMove}
  onTouchEnd={handleTouchEnd}
>
  <img 
    src={productImages[currentImageIndex]} 
    alt={product.name} 
    className={styles.productImg}
  />
  <div className={styles.swipeIndicator}>
    <span>Swipe to view more</span>
  </div>
  <button className={`${styles.galleryNav} ${styles.prevButton}`} onClick={prevImage}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
  </button>
  <button className={`${styles.galleryNav} ${styles.nextButton}`} onClick={nextImage}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  </button>
  <div className={styles.paginationDots}>
    {productImages.map((_, index) => (
      <span 
        key={index} 
        className={`${styles.paginationDot} ${index === currentImageIndex ? styles.activeDot : ''}`}
        onClick={() => setCurrentImageIndex(index)}
      ></span>
    ))}
  </div>
  
  {/* New image counter/indicator */}
  <div className={styles.imageCounter}>
    {currentImageIndex + 1} / {productImages.length}
  </div>
</div>

              <div className={styles.imagePreviewStrip}>
  {productImages.map((_, index) => (
    <div 
      key={index} 
      className={`${styles.previewDot} ${index === currentImageIndex ? styles.activePreviewDot : ''}`}
      onClick={() => setCurrentImageIndex(index)}
    />
  ))}
</div>
              
              <div className={styles.thumbnailGrid}>
                {productImages.map((img, index) => (
                  <div 
                    key={index}
                    className={`${styles.thumbnail} ${currentImageIndex === index ? styles.activeThumbnail : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img src={img} alt={`${product.name} view ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>
            
            <div className={styles.productInfo}>
              <div className={styles.productBrand}>{product.brand}</div>
              <h1 className={styles.productTitle}>{product.name}</h1>
              
              <div className={styles.productMeta}>
                <div className={styles.rating}>
                  <Rating value={product.rating} />
                  <span className={styles.reviewCount}>{product.reviews} reviews</span>
                </div>
                <div className={`${styles.stockStatus} ${product.inStock ? styles.inStock : styles.outOfStock}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </div>
              </div>
              
              <div className={styles.productPrice}>
                {product.oldPrice && (
                  <span className={styles.oldPrice}>${product.oldPrice.toFixed(2)}</span>
                )}
                <span className={styles.currentPrice}>${product.price.toFixed(2)}</span>
                {product.oldPrice && (
                  <span className={styles.discount}>
                    {Math.round((1 - product.price / product.oldPrice) * 100)}% OFF
                  </span>
                )}
              </div>
              
              <p className={styles.productDescription}>{product.description}</p>
              
              <div className={styles.productActions}>
                <div className={styles.mobileActionsRow}>
                  <div className={styles.quantityControl}>
                    <button 
                      className={styles.quantityBtn} 
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className={styles.quantity}>{quantity}</span>
                    <button 
                      className={styles.quantityBtn}
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= 10}
                    >
                      +
                    </button>
                  </div>
                  
                  <button 
                    className={`${styles.addToCartBtn} ${!product.inStock ? styles.disabled : ''}`}
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                  >
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
                
                <button className={styles.wishlistBtn}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
              </div>
              
              <div className={styles.productOptions}>
                {product.colors && (
                  <div className={styles.colorOptions}>
                    <h3>Available Colors</h3>
                    <div className={styles.optionValues}>
                      {product.colors.map(color => (
                        <div 
                          key={color} 
                          className={styles.colorOption}
                          style={{ backgroundColor: color }}
                          title={color}
                        ></div>
                      ))}
                    </div>
                  </div>
                )}
                
                {product.sizes && (
                  <div className={styles.sizeOptions}>
                    <h3>Select Size</h3>
                    <div className={styles.optionValues}>
                      {product.sizes.map(size => (
                        <div key={size} className={styles.sizeOption}>
                          {size}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className={styles.productFeatures}>
                <h3>Key Features</h3>
                <ul>
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              
              <div className={styles.deliveryInfo}>
                <div className={styles.deliveryItem}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13"></rect>
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                    <circle cx="5.5" cy="18.5" r="2.5"></circle>
                    <circle cx="18.5" cy="18.5" r="2.5"></circle>
                  </svg>
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className={styles.deliveryItem}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                  <span>2-year warranty</span>
                </div>
                <div className={styles.deliveryItem}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>30-day money-back guarantee</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.productTabs}>
            <div className={styles.tabHeaders}>
              <button 
                className={`${styles.tabHeader} ${activeTab === 'description' ? styles.active : ''}`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button 
                className={`${styles.tabHeader} ${activeTab === 'reviews' ? styles.active : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews ({product.reviews})
              </button>
              <button 
                className={`${styles.tabHeader} ${activeTab === 'specs' ? styles.active : ''}`}
                onClick={() => setActiveTab('specs')}
              >
                Specifications
              </button>
            </div>
            
            <div className={styles.tabContent}>
              {activeTab === 'description' && (
                <div className={styles.descriptionTab}>
                  <h3>Product Description</h3>
                  <p>Experience the ultimate performance with the {product.name}. Designed for tech enthusiasts who demand the best, this device combines cutting-edge technology with sleek aesthetics.</p>
                  <p>Our latest model features enhanced processing power, extended battery life, and a stunning display that brings your content to life. Whether you're a professional user or a casual tech lover, the {product.name} adapts to your needs with its intuitive interface and customizable settings.</p>
                  <p>Crafted with premium materials, this device not only performs exceptionally but also stands the test of time. The ergonomic design ensures comfortable usage even during extended sessions, while the compact form factor makes it perfectly portable for your on-the-go lifestyle.</p>
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div className={styles.reviewsTab}>
                  <h3>Customer Reviews</h3>
                  <div className={styles.reviewSummary}>
                    <div className={styles.averageRating}>
                      <div className={styles.ratingNumber}>{product.rating.toFixed(1)}</div>
                      <Rating value={product.rating} />
                      <div className={styles.totalReviews}>Based on {product.reviews} reviews</div>
                    </div>
                    <div className={styles.ratingBreakdown}>
                      {[5, 4, 3, 2, 1].map(star => (
                        <div key={star} className={styles.ratingBar}>
                          <span>{star} stars</span>
                          <div className={styles.progressBar}>
                            <div 
                              className={styles.progressFill} 
                              style={{ width: `${Math.random() * 100}%` }}
                            ></div>
                          </div>
                          <span>{Math.floor(Math.random() * product.reviews)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className={styles.reviewsList}>
                    {/* Sample reviews */}
                    {[1, 2, 3].map(i => (
                      <div key={i} className={styles.reviewItem}>
                        <div className={styles.reviewHeader}>
                          <div className={styles.reviewUser}>
                            <div className={styles.userAvatar}>{`JD`}</div>
                            <div className={styles.userInfo}>
                              <div className={styles.userName}>John Doe</div>
                              <div className={styles.reviewDate}>March 15, 2025</div>
                            </div>
                          </div>
                          <div className={styles.reviewRating}>
                            <Rating value={4 + i % 2} />
                          </div>
                        </div>
                        <h4 className={styles.reviewTitle}>Great product, exceeded expectations!</h4>
                        <p className={styles.reviewContent}>
                          This is exactly what I was looking for. The quality is exceptional and it works perfectly with my setup. Would definitely recommend to anyone considering this purchase.
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <button className={styles.loadMoreBtn}>Load More Reviews</button>
                </div>
              )}
              
              {activeTab === 'specs' && (
                <div className={styles.specsTab}>
                  <h3>Technical Specifications</h3>
                  <table className={styles.specsTable}>
                    <tbody>
                      <tr>
                        <th>Dimensions</th>
                        <td>15.6 x 7.8 x 0.7 inches</td>
                      </tr>
                      <tr>
                        <th>Weight</th>
                        <td>1.2 pounds</td>
                      </tr>
                      <tr>
                        <th>Materials</th>
                        <td>Aluminum, Glass</td>
                      </tr>
                      <tr>
                        <th>Display</th>
                        <td>6.5-inch OLED, 2400 x 1080 pixels</td>
                      </tr>
                      <tr>
                        <th>Processor</th>
                        <td>Octa-core 2.4 GHz</td>
                      </tr>
                      <tr>
                        <th>Memory</th>
                        <td>8GB RAM, 128GB Storage</td>
                      </tr>
                      <tr>
                        <th>Battery</th>
                        <td>4500 mAh, Fast charging</td>
                      </tr>
                      <tr>
                        <th>Connectivity</th>
                        <td>Wi-Fi 6, Bluetooth 5.2, USB-C</td>
                      </tr>
                      <tr>
                        <th>Warranty</th>
                        <td>2 years limited warranty</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
          
          <div className={styles.relatedProducts}>
            <h2 className={styles.sectionTitle}>You May Also Like</h2>
            <div className={styles.productsGrid}>
              {products
                .filter(p => p.id !== product.id && p.category === product.category)
                .slice(0, 4)
                .map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
          </div>
        </div>
        {/* </div> */}
      </main>
      
      <Footer />
    </>
  );
}

// For server-side rendering with Next.js
export async function getServerSideProps({ params }) {
  // In a real app, you would fetch the product data from an API
  // For this example, we're using the static products data
  return {
    props: {}
  };
}