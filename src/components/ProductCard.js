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
    className={`${styles.productImage} ${(isOnSale && product.inStock) || !product.inStock ? styles.shiftedImage : ''}`}

  />
  {!product.inStock && (
    <div className={styles.outOfStock}>Out of Stock</div>
  )}
  {isOnSale && product.inStock && (
    <div className={styles.saleBadge}>Sale</div>
  )}
</div>
      <div className={styles.productInfo}>
        <h3 className={styles.productName}>
          <Link href={`/products/${product.id}`}>{product.name}</Link>
        </h3>
        <p className={styles.productDescription}>{product.description.substring(0, 45)}...</p>
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
            {!product.inStock ? 'Out' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;