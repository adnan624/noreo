import { useSelector, useDispatch } from 'react-redux';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/Cart.module.css';
import { addToCart, removeFromCart } from '../store/slices/cartSlice';


// CartItem component with quantity controls similar to ProductCard
const CartItem = ({ item, onRemove, onQuantityChange }) => {
  return (
    <div className={styles.cartItem}>
      <div className={styles.itemImage}>
        <img src={item.image} alt={item.name} />
      </div>
      
      <div className={styles.itemDetails}>
        <h3>{item.name}</h3>
        <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
      </div>
      
      <div className={styles.itemActions}>
        <div className={styles.quantityControl}>
          <button 
            className={styles.quantityButton} 
            onClick={() => onQuantityChange(item.id, false)}
            disabled={item.quantity <= 1}
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className={styles.quantityValue}>{item.quantity}</span>
          <button 
            className={styles.quantityButton} 
            onClick={() => onQuantityChange(item.id, true)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        
        <div className={styles.itemTotal}>
          ${item.totalPrice ? item.totalPrice.toFixed(2) : (item.price * item.quantity).toFixed(2)}
        </div>
        
        <button 
          className={styles.removeButton}
          onClick={() => onRemove(item.id)}
          aria-label="Remove item"
        >
          <span>×</span>
        </button>
      </div>
    </div>
  );
};

export default function Cart() {
  // Replace useState with useSelector and useDispatch
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const totalAmount = useSelector(state => state.cart.totalAmount);
  
  // Function to handle complete removal (regardless of quantity)
  const handleRemoveItem = (id) => {
    const item = cartItems.find(item => item.id === id);
    for (let i = 0; i < item.quantity; i++) {
      dispatch(removeFromCart(id));
    }
  };
  
  // Function to handle quantity changes
  const handleQuantityChange = (id, isIncrease) => {
    if (isIncrease) {
      // Find the item in cartItems to pass to addToCart
      const item = cartItems.find(item => item.id === id);
      dispatch(addToCart(item));
    } else {
      dispatch(removeFromCart(id));
    }
  };
  
  // Calculate tax and shipping based on totalAmount
  const subtotal = totalAmount;
  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 500 ? 0 : 49.99;
  const total = subtotal + tax + shipping;

  return (
    <>
      <Head>
        <title>Your Cart | ElectroShop</title>
        <meta name="description" content="Review your cart items" />
      </Head>
      
      <Header />
      
      <main className={styles.cartPage}>
        <div className="container">
          <div className={styles.pageHeader}>
            <h1>Your Shopping Cart</h1>
            <p>Review your items before checkout</p>
          </div>
          
          {cartItems.length > 0 ? (
            <div className={styles.cartLayout}>
              <div className={styles.cartItems}>
                {cartItems.map(item => (
                  <CartItem 
                    key={item.id} 
                    item={item} 
                    onRemove={handleRemoveItem}
                    onQuantityChange={handleQuantityChange}
                  />
                ))}
              </div>
              
              <div className={styles.cartSummary}>
                <h2>Order Summary</h2>
                
                <div className={styles.summaryRow}>
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                <div className={styles.summaryRow}>
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                
                <div className={styles.summaryRow}>
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                
                <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                
                <button className={styles.checkoutButton}>Proceed to Checkout</button>
                
                <div className={styles.paymentMethods}>
                  <p>We accept:</p>
                  <div className={styles.paymentIcons}>
                    <i className="fab fa-cc-visa"></i>
                    <i className="fab fa-cc-mastercard"></i>
                    <i className="fab fa-cc-amex"></i>
                    <i className="fab fa-cc-paypal"></i>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.emptyCart}>
              <h2>Your cart is empty</h2>
              <p>Looks like you haven't added any items to your cart yet.</p>
              <Link href="/products" className={styles.continueButton}>Continue Shopping</Link>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
}