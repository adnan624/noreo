import Image from 'next/image';
import styles from '../styles/CartItem.module.css';

const CartItem = ({ item, onRemove, onQuantityChange }) => {
  return (
    <div className={styles.cartItem}>
      <div className={styles.itemImage}>
        <img src={item.image} alt={item.name} />
      </div>
      <div className={styles.itemDetails}>
        <h3 className={styles.itemName}>{item.name}</h3>
        <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
        <div className={styles.quantityControl}>
          <button 
            className={styles.quantityBtn} 
            onClick={() => onQuantityChange(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <span className={styles.quantity}>{item.quantity}</span>
          <button 
            className={styles.quantityBtn} 
            onClick={() => onQuantityChange(item.id, item.quantity + 1)}
          >
            +
          </button>
        </div>
      </div>
      <div className={styles.itemTotal}>
        <p>${(item.price * item.quantity).toFixed(2)}</p>
        <button 
          className={styles.removeBtn}
          onClick={() => onRemove(item.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;