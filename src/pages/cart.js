import { useSelector, useDispatch } from 'react-redux';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Footer from '../components/Footer';
import styles from '../styles/Cart.module.css';
import { addToCart, removeFromCart } from '../store/slices/cartSlice/cartSlice';
import PaymentButton from '../components/PaymentButton';

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
            onClick={() => onQuantityChange(item.uniqueId, false)}
            disabled={item.quantity <= 1}
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className={styles.quantityValue}>{item.quantity}</span>
          <button
            className={styles.quantityButton}
            onClick={() => onQuantityChange(item.uniqueId, true)}
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
          onClick={() => onRemove(item.uniqueId)}
          aria-label="Remove item"
        >
          <span>×</span>
        </button>
      </div>
    </div>
  );
};

export default function Cart() {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const totalAmount = useSelector(state => state.cart.totalAmount);

  // Function to handle complete removal (regardless of quantity)
  const handleRemoveItem = (uniqueId) => {
    console.log('Removing item:', uniqueId);
    const item = cartItems.find(item => item.uniqueId === uniqueId);
    if (!item) {
      console.log('Item not found:', uniqueId);
      return;
    }
    for (let i = 0; i < item.quantity; i++) {
      dispatch(removeFromCart(uniqueId));
    }
    console.log('Cart state after removal:', cartItems.map(item => ({ uniqueId: item.uniqueId, id: item.id, name: item.name, quantity: item.quantity })));
  };

  // Function to handle quantity changes
  const handleQuantityChange = (uniqueId, isIncrease) => {
    console.log('Quantity change:', { uniqueId, isIncrease });
    const item = cartItems.find(item => item.uniqueId === uniqueId);
    if (!item) {
      console.log('Item not found:', uniqueId);
      return;
    }
    if (isIncrease) {
      dispatch(addToCart(item));
      console.log('Added quantity for:', uniqueId);
    } else {
      dispatch(removeFromCart(uniqueId));
      console.log('Removed quantity for:', uniqueId);
    }
    console.log('Cart state after quantity change:', cartItems.map(item => ({ uniqueId: item.uniqueId, id: item.id, name: item.name, quantity: item.quantity })));
  };

  const handleCheckout = () => {
    const token = localStorage.getItem('authToken');
    console.log('token', token);

    if (token) {
      console.log('Authenticated, proceeding to payment');
      router.push('/auth/login'); // Update to '/checkout/payment' when ready
    } else {
      console.log('Not authenticated, redirecting to login');
      router.push('/auth/login');
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
      <div className={styles.circuitBackground}></div>
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
                    key={item.uniqueId}
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
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>

                <div className={styles.summaryRow}>
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <button onClick={handleCheckout} className={styles.checkoutButton}>
                  Proceed to Checkout
                </button>
                <PaymentButton name={'adnan'} email={'adnan@gmail.com'} phone={'8109257552'} />
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
              <Link href="/products" className={styles.continueButton}>
                Continue Shopping
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}