import { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartItem from '../components/CartItem';
import styles from '../styles/Cart.module.css';

// Mock cart data
const initialCartItems = [
  {
    id: 1,
    name: "Smart Refrigerator",
    price: 1299.99,
    image: "/images/fridge.jpg",
    quantity: 1
  },
  {
    id: 2,
    name: "Air Fryer Pro",
    price: 89.99,
    image: "/images/airfryer.jpg",
    quantity: 2
  }
];

export default function Cart() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  
  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };
  
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };
  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
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
                  <span>${shipping.toFixed(2)}</span>
                </div>
                
                <div className={styles.summaryRow}>
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                
                <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                
                <button className="btn btn-primary">Proceed to Checkout</button>
                
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
              <Link href="/products" className="btn btn-primary">Continue Shopping</Link>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
}