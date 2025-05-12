// pages/api/createOrder.js
import Razorpay from 'razorpay';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Initialize Razorpay with test credentials
      const razorpay = new Razorpay({
        key_id: 'rzp_test_KPpMfl2Cc4OX7O'
        // key_secret: process.env.RAZORPAY_KEY_SECRET,
      });

      // Create order
      const options = {
        amount: req.body.amount * 100, // Razorpay expects amount in paise
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
        payment_capture: 1, // Auto-capture payment
      };

      const order = await razorpay.orders.create(options);
      res.status(200).json({ success: true, order });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}