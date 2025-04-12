import Link from 'next/link';
import Rating from './Rating';
import styles from '../styles/ProductCard.module.css';

const ProductCard = ({ product }) => {
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
      </div>
      <div className={styles.productInfo}>
        <h3 className={styles.productName}>{product.name}</h3>
        <div className={styles.productRating}>
          <Rating value={product.rating} />
          <span className={styles.reviewCount}>({product.reviews})</span>
        </div>
        <p className={styles.productDescription}>{product.description}</p>
        <div className={styles.productFooter}>
          <span className={styles.productPrice}>${product.price.toFixed(2)}</span>
          <button 
            className={`btn btn-primary ${styles.addToCartBtn}`}
            disabled={!product.inStock}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;