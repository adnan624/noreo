// components/PaymentButton.js
import { useState } from 'react';
import Script from 'next/script';

export default function PaymentButton({ amount, name, email, phone }) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    
    try {
      // Create order on server
      const response = await fetch('http://localhost:3001/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: "100",
          currency: "INR",
          receipt: "order create"
      })
      });
      
      const data = await response.json();
      console.log('athe fffff', data)
      // if (!data.success) {
      //   throw new Error(data.error || 'Failed to create order');
      // }
      
      // Initialize Razorpay payment
      const options = {
        key: 'rzp_test_6oLnOqJOIMdIwf', // Test key ID
        amount: data.amount,
        currency: data.currency,
        name: "Noreo",
        description: "Test Transaction",
        order_id: data.id,
        handler: function (response) {
          // Handle successful payment
          console.log(response);
          alert("Payment Successful!");
          // You might want to verify this on your server
        },
        prefill: {
          name: name || "Test User",
          email: email || "test@example.com",
          contact: phone || "9999999999"
        },
        notes: {
          address: "Your Company Address"
        },
        theme: {
          color: "#3399cc"
        },
        // Enable this to use the test mode UI
        test: true
      };
      
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      <button
        onClick={handlePayment}
        disabled={loading}
        className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </>
  );
}