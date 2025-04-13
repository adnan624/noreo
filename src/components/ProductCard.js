import Link from 'next/link';
import Rating from './Rating';
import styles from '../styles/ProductCard.module.css';

const ProductCard = ({ product, isOnSale = false }) => {
  return (
    <div className={styles.productCard}>
      <div className={styles.productImageContainer}>
        <img 
          src={product.image} 
          alt={product.name} 
          className={styles.productImage}
        />
        {!product.inStock && (
          <div className={styles.outOfStock}>Out of Stock</div>
        )}
        {isOnSale && (
          <div className={styles.saleBadge}>Sale</div>
        )}
        <div className={styles.productActions}>
          <button className={styles.actionBtn}>
            <i className="fas fa-heart"></i>
          </button>
          <button className={styles.actionBtn}>
            <i className="fas fa-eye"></i>
          </button>
          <button className={styles.actionBtn}>
            <i className="fas fa-share-alt"></i>
          </button>
        </div>
      </div>
      <div className={styles.productInfo}>
        <div className={styles.productCategory}>{product.category}</div>
        <h3 className={styles.productName}>
          <Link href={`/products/${product.id}`}>{product.name}</Link>
        </h3>
        <div className={styles.productRating}>
          <Rating value={product.rating} />
          <span className={styles.reviewCount}>({product.reviews})</span>
        </div>
        <p className={styles.productDescription}>{product.description}</p>
        <div className={styles.productFooter}>
          <div className={styles.priceContainer}>
            {isOnSale && (
              <span className={styles.originalPrice}>${(product.price * 1.2).toFixed(2)}</span>
            )}
            <span className={styles.productPrice}>${product.price.toFixed(2)}</span>
          </div>
          <button 
            className={`${styles.addToCartBtn} ${!product.inStock ? styles.disabled : ''}`}
            disabled={!product.inStock}
          >
            {!product.inStock ? 'Out of Stock' : (
              <>
                <i className="fas fa-shopping-cart"></i> Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;