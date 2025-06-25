const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  cartItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
      seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier',
      },
      selectedColor: String,
      selectedSize: String,
      priceAtTime: Number,
    }
  ],
  coupon: String,
  discount: Number,
  tax: Number,
  total: Number,
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);