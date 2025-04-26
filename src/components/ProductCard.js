import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/ProductCard.module.css';

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    } else {
      // When quantity is 1 and user presses minus, remove from cart
      setIsAdded(false);
      setQuantity(1); // Reset quantity to 1 for next time
    }
  };

  const handleAddToCart = () => {
    setIsAdded(true);
  };

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
        {product.onSale && product.inStock && (
          <div className={styles.saleBadge}>Sale</div>
        )}
      </div>
      <div className={styles.productInfo}>
        <h3 className={styles.productName}>
          <Link href={`/products/${product.id}`}>{product.name}</Link>
        </h3>
        <p className={styles.quantityText}>{product.weight || '450 g'}</p>
        <div className={styles.productFooter}>
          <div className={styles.priceContainer}>
            {product.originalPrice && (
              <span className={styles.originalPrice}>₹{product.originalPrice}</span>
            )}
            <span className={styles.productPrice}>₹{product.price}</span>
          </div>
          
          {!isAdded ? (
            <button 
              className={`${styles.addToCartBtn} ${!product.inStock ? styles.disabled : ''}`}
              disabled={!product.inStock}
              onClick={handleAddToCart}
            >
              ADD
            </button>
          ) : (
            <div className={styles.quantityControl}>
              <button className={styles.quantityButton} onClick={decrementQuantity}>−</button>
              <span className={styles.quantityValue}>{quantity}</span>
              <button className={styles.quantityButton} onClick={incrementQuantity}>+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;