import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import styles from '../styles/ProductCard.module.css';
import { addToCart, removeFromCart } from '../store/slices/cartSlice/cartSlice';
import CartNotification from '../components/CartNotification';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [showNotification, setShowNotification] = useState(false);
  
  // Find this product in cart (if it exists)
  const cartItem = cartItems.find(item => item.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;
  const isInCart = quantityInCart > 0;

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setShowNotification(true);
  };

  const incrementQuantity = () => {
    dispatch(addToCart(product));
  };

  const decrementQuantity = () => {
    dispatch(removeFromCart(product.id));
  };

  return (
    <>
      <Link href={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div 
          className={styles.productCard}
          style={{ cursor: 'pointer' }} 
        >
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
              {product.name}
            </h3>
            <p className={styles.quantityText}>{product.weight || '20W'}</p>
            <div className={styles.productFooter}>
              <div className={styles.priceContainer}>
                {product.originalPrice && (
                  <span className={styles.originalPrice}>₹{Math.round(product.originalPrice)}</span>
                )}
                <span className={styles.productPrice}>₹{Math.round(product.price)}</span>
              </div>
              
              {!isInCart ? (
                <button 
                  className={`${styles.addToCartBtn} ${!product.inStock ? styles.disabled : ''}`}
                  disabled={!product.inStock}
                  onClick={(e) => {
                    e.preventDefault(); // Prevent navigation
                    e.stopPropagation(); // Prevent card click event
                    handleAddToCart();
                  }}
                >
                  ADD
                </button>
              ) : (
                <div 
                  className={styles.quantityControl}
                  onClick={(e) => e.preventDefault()} // Prevent navigation
                >
                  <button 
                    className={styles.quantityButton} 
                    onClick={(e) => {
                      e.preventDefault(); // Prevent navigation
                      e.stopPropagation(); // Prevent card click event
                      decrementQuantity();
                    }}
                  >−</button>
                  <span className={styles.quantityValue}>{quantityInCart}</span>
                  <button 
                    className={styles.quantityButton} 
                    onClick={(e) => {
                      e.preventDefault(); // Prevent navigation
                      e.stopPropagation(); // Prevent card click event
                      incrementQuantity();
                    }}
                  >+</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
      
      {/* This is the CartNotification component */}
      <CartNotification 
        product={product} 
        onClose={() => setShowNotification(false)}
        show={showNotification}
      />
    </>
  );
};

export default ProductCard;