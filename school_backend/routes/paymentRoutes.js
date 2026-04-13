const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

// Protected routes - require authentication
router.post('/create-order', protect, paymentController.createOrder);
router.post('/verify', protect, paymentController.verifyPayment);

module.exports = router;
