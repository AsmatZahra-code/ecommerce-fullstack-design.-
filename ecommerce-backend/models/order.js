const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  orderItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: Number,
      seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier',
      },
      selectedColor: String,
      selectedSize: String,
      price: Number,
    }
  ],
  shippingAddress: {
    street: String,
    city: String,
    country: String,
    zip: String,
  },
  paymentMethod: String,
  paymentStatus: {
    type: String,
    default: 'Pending',
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  paidAt: Date,
  orderStatus: {
    type: String,
    default: 'Processing',
  },
  totalPrice: Number,
  tax: Number,
  discount: Number,
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);