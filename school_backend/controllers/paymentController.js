const Razorpay = require('razorpay');
const crypto = require('crypto');

// --- INITIALIZE RAZORPAY ---
const getRazorpayInstance = () => {
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
};

// --- CREATE ORDER ---
exports.createOrder = async (req, res) => {
  try {
    const { amount, receipt } = req.body;

    if (!amount) {
      return res.status(400).json({ message: "Amount is required" });
    }

    const options = {
      amount: Math.round(amount * 100), // Razorpay strictly expects exact integer in paise
      currency: "INR",
      receipt: receipt || `receipt_${Date.now()}`,
    };

    const instance = getRazorpayInstance();
    const order = await instance.orders.create(options);

    if (!order) {
      return res.status(500).json({ message: "Failed to create order" });
    }

    res.status(201).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    console.error("Razorpay Create Order Error:", err);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};

// --- VERIFY PAYMENT ---
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ message: "Missing Razorpay payment details" });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;

    // Create HMAC using sha256 to verify signature
    const shasum = crypto.createHmac('sha256', secret);
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = shasum.digest('hex');

    if (digest !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Transaction not legit!" });
    }

    res.json({
      success: true,
      message: "Payment successfully verified",
      paymentId: razorpay_payment_id
    });
  } catch (err) {
    console.error("Razorpay Verify Error:", err);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};
