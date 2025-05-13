// components/CartNotification.js
import { useSelector, useDispatch } from 'react-redux';
import { hideCartNotification } from '../store/slices/cartSlice';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import styles from '../styles/CartNotification.module.css';

const CartNotification = () => {
  const dispatch = useDispatch();
  const show = useSelector(state => state.cart.showNotification);
  const { totalQuantity } = useSelector(state => state.cart);
  
  const handleClose = () => {
    dispatch(hideCartNotification());
  };

  if (!show || totalQuantity === 0) return null;

  return (
    <div className={`${styles.cartNotification} ${show ? styles.visible : ''}`}>
      <div className={styles.notificationContent}>
        <FaShoppingCart className={styles.cartIcon} />
        <span className={styles.notificationText}>
          {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'} in cart
        </span>
        <button 
          className={styles.closeButton} 
          onClick={handleClose}
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
      <Link href="/cart" className={styles.cartLink}>
        <div className={styles.goToCartButton}>
          GO TO CART
        </div>
      </Link>
    </div>
  );
};

export default CartNotification;