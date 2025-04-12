import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Rating from '../../components/Rating';
import products from '../../data/products';
import styles from '../../styles/Product.module.css';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <Head>
        <title>{product.name} | ElectroShop</title>
        <meta name="description" content={product.description} />
      </Head>
      
      <Header />
      
      <main className={styles.productPage}>
        <div className="container">
          <div className={styles.productDetail}>
            <div className={styles.productGallery}>
              <div className={styles.mainImage}>
                <img src={product.image} alt={product.name} />
              </div>
            </div>
            
            <div className={styles.productInfo}>
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
              
              <div className={styles.productPrice}>${product.price.toFixed(2)}</div>
              
              <p className={styles.productDescription}>{product.description}</p>
              
              <div className={styles.productActions}>
                <div className={styles.quantityControl}>
                  <button className={styles.quantityBtn}>-</button>
                  <span className={styles.quantity}>1</span>
                  <button className={styles.quantityBtn}>+</button>
                </div>
                <button 
                  className={`btn btn-primary ${styles.addToCartBtn}`}
                  disabled={!product.inStock}
                >
                  Add to Cart
                </button>
              </div>
              
              <div className={styles.productFeatures}>
                <h3>Features</h3>
                <ul>
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className={styles.productTabs}>
            <div className={styles.tabHeaders}>
              <button className={`${styles.tabHeader} ${styles.active}`}>Description</button>
              <button className={styles.tabHeader}>Reviews</button>
              <button className={styles.tabHeader}>Specifications</button>
            </div>
            
            <div className={styles.tabContent}>
              <h3>Product Details</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere.</p>
              <p>Praesent id metus massa, ut blandit odio. Proin quis tortor orci. Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus condimentum laoreet. Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus eget in metus. In pellentesque faucibus vestibulum. Nulla at nulla justo, eget luctus tortor. Nulla facilisi. Duis aliquet egestas purus in blandit.</p>
            </div>
          </div>
          
          <div className={styles.relatedProducts}>
            <h2 className="section-title">You May Also Like</h2>
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
      </main>
      
      <Footer />
    </>
  );
}