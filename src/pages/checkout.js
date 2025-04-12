import { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/Checkout.module.css';

export default function Checkout() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
    paymentMethod: 'credit-card',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: ''
  });
  
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    
    if (Object.keys(validationErrors).length === 0) {
      // Submit form
      alert('Order placed successfully!');
    } else {
      setErrors(validationErrors);
    }
  };
  
  const validateForm = (data) => {
    const errors = {};
    
    if (!data.firstName.trim()) errors.firstName = 'First name is required';
    if (!data.lastName.trim()) errors.lastName = 'Last name is required';
    if (!data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Email is invalid';
    }
    if (!data.address.trim()) errors.address = 'Address is required';
    if (!data.city.trim()) errors.city = 'City is required';
    if (!data.country.trim()) errors.country = 'Country is required';
    if (!data.zipCode.trim()) errors.zipCode = 'Zip code is required';
    
    if (data.paymentMethod === 'credit-card') {
      if (!data.cardNumber.trim()) errors.cardNumber = 'Card number is required';
      if (!data.cardName.trim()) errors.cardName = 'Card name is required';
      if (!data.cardExpiry.trim()) errors.cardExpiry = 'Expiry date is required';
      if (!data.cardCvv.trim()) errors.cardCvv = 'CVV is required';
    }
    
    return errors;
  };

  return (
    <>
      <Head>
        <title>Checkout | ElectroShop</title>
        <meta name="description" content="Complete your purchase" />
      </Head>
      
      <Header />
      
      <main className={styles.checkoutPage}>
        <div className="container">
          <div className={styles.pageHeader}>
            <h1>Checkout</h1>
            <p>Complete your purchase</p>
          </div>
          
          <form onSubmit={handleSubmit} className={styles.checkoutForm}>
            <div className={styles.formLayout}>
              <div className={styles.billingDetails}>
                <h2>Billing Details</h2>
                
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={errors.firstName ? styles.error : ''}
                    />
                    {errors.firstName && <span className={styles.errorMessage}>{errors.firstName}</span>}
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={errors.lastName ? styles.error : ''}
                    />
                    {errors.lastName && <span className={styles.errorMessage}>{errors.lastName}</span>}
                  </div>
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? styles.error : ''}
                  />
                  {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="address">Street Address *</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={errors.address ? styles.error : ''}
                  />
                  {errors.address && <span className={styles.errorMessage}>{errors.address}</span>}
                </div>
                
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="city">Town / City *</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={errors.city ? styles.error : ''}
                    />
                    {errors.city && <span className={styles.errorMessage}>{errors.city}</span>}
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="country">Country *</label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className={errors.country ? styles.error : ''}
                    >
                      <option value="">Select Country</option>
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="CA">Canada</option>
                      <option value="AU">Australia</option>
                    </select>
                    {errors.country && <span className={styles.errorMessage}>{errors.country}</span>}
                  </div>
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="zipCode">ZIP / Postal Code *</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className={errors.zipCode ? styles.error : ''}
                  />
                  {errors.zipCode && <span className={styles.errorMessage}>{errors.zipCode}</span>}
                </div>
              </div>
              
              <div className={styles.orderSummary}>
                <h2>Your Order</h2>
                
                <div className={styles.summaryTable}>
                  <div className={styles.summaryRow}>
                    <span>Product</span>
                    <span>Total</span>
                  </div>
                  
                  <div className={styles.summaryRow}>
                    <span>Smart Refrigerator × 1</span>
                    <span>$1299.99</span>
                  </div>
                  
                  <div className={styles.summaryRow}>
                    <span>Air Fryer Pro × 2</span>
                    <span>$179.98</span>
                  </div>
                  
                  <div className={styles.summaryRow}>
                    <span>Subtotal</span>
                    <span>$1479.97</span>
                  </div>
                  
                  <div className={styles.summaryRow}>
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  
                  <div className={styles.summaryRow}>
                    <span>Tax</span>
                    <span>$147.99</span>
                  </div>
                  
                  <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                    <span>Total</span>
                    <span>$1627.96</span>
                  </div>
                </div>
                
                <div className={styles.paymentMethod}>
                  <h3>Payment Method</h3>
                  
                  <div className={styles.paymentOptions}>
                    <label className={styles.paymentOption}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="credit-card"
                        checked={formData.paymentMethod === 'credit-card'}
                        onChange={handleChange}
                      />
                      <span>Credit Card</span>
                    </label>
                    
                    <label className={styles.paymentOption}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={formData.paymentMethod === 'paypal'}
                        onChange={handleChange}
                      />
                      <span>PayPal</span>
                    </label>
                    
                    <label className={styles.paymentOption}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank-transfer"
                        checked={formData.paymentMethod === 'bank-transfer'}
                        onChange={handleChange}
                      />
                      <span>Bank Transfer</span>
                    </label>
                  </div>
                  
                  {formData.paymentMethod === 'credit-card' && (
                    <div className={styles.cardDetails}>
                      <div className={styles.formGroup}>
                        <label htmlFor="cardNumber">Card Number *</label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          className={errors.cardNumber ? styles.error : ''}
                        />
                        {errors.cardNumber && <span className={styles.errorMessage}>{errors.cardNumber}</span>}
                      </div>
                      
                      <div className={styles.formGroup}>
                        <label htmlFor="cardName">Name on Card *</label>
                        <input
                          type="text"
                          id="cardName"
                          name="cardName"
                          placeholder="John Doe"
                          value={formData.cardName}
                          onChange={handleChange}
                          className={errors.cardName ? styles.error : ''}
                        />
                        {errors.cardName && <span className={styles.errorMessage}>{errors.cardName}</span>}
                      </div>
                      
                      <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                          <label htmlFor="cardExpiry">Expiry Date *</label>
                          <input
                            type="text"
                            id="cardExpiry"
                            name="cardExpiry"
                            placeholder="MM/YY"
                            value={formData.cardExpiry}
                            onChange={handleChange}
                            className={errors.cardExpiry ? styles.error : ''}
                          />
                          {errors.cardExpiry && <span className={styles.errorMessage}>{errors.cardExpiry}</span>}
                        </div>
                        
                        <div className={styles.formGroup}>
                          <label htmlFor="cardCvv">CVV *</label>
                          <input
                            type="text"
                            id="cardCvv"
                            name="cardCvv"
                            placeholder="123"
                            value={formData.cardCvv}
                            onChange={handleChange}
                            className={errors.cardCvv ? styles.error : ''}
                          />
                          {errors.cardCvv && <span className={styles.errorMessage}>{errors.cardCvv}</span>}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {formData.paymentMethod === 'paypal' && (
                    <div className={styles.paymentNote}>
                      <p>You will be redirected to PayPal website to complete your payment securely.</p>
                    </div>
                  )}
                  
                  {formData.paymentMethod === 'bank-transfer' && (
                    <div className={styles.paymentNote}>
                      <p>Make your payment directly into our bank account. Please use your Order ID as the payment reference.</p>
                      <p><strong>Bank Name:</strong> ElectroShop Bank<br />
                      <strong>Account Number:</strong> 123456789<br />
                      <strong>Routing Number:</strong> 987654321</p>
                    </div>
                  )}
                </div>
                
                <div className={styles.terms}>
                  <label className={styles.termsCheckbox}>
                    <input type="checkbox" required />
                    <span>I have read and agree to the website <a href="#">terms and conditions</a> *</span>
                  </label>
                </div>
                
                <button type="submit" className="btn btn-primary">Place Order</button>
              </div>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </>
  );
}