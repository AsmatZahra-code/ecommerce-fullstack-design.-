const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const { verifyToken } = require('../middleware/auth');

// @desc Get user's cart
// router.get('/', verifyToken, async (req, res) => {
//   try {
//     const cart = await Cart.findOne({ user: req.user.id }).populate('cartItems.product');
//     res.json(cart || { cartItems: [] });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });
router.get('/', verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id })
      .populate('cartItems.product')
      .populate('cartItems.seller');

    if (!cart) {
      return res.status(200).json({ cartItems: [] });
    }

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// @desc Add or update product in cart
router.post('/', verifyToken, async (req, res) => {
  const { product, quantity, selectedColor, selectedSize, priceAtTime, seller } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      // Create a new cart for the user
      cart = new Cart({ user: req.user.id, cartItems: [] });
    }

    const existingItemIndex = cart.cartItems.findIndex(
      (item) =>
        item.product.toString() === product &&
        item.selectedColor === selectedColor &&
        item.selectedSize === selectedSize
    );

    if (existingItemIndex >= 0) {
      // If item already exists, update quantity
      cart.cartItems[existingItemIndex].quantity += quantity;
    } else {
      // Otherwise, add as new item
      cart.cartItems.push({ product, quantity, selectedColor, selectedSize, priceAtTime, seller });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @desc Remove an item from cart
router.delete('/remove/:productId', verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.cartItems = cart.cartItems.filter(
      (item) => item.product.toString() !== req.params.productId
    );

    await cart.save();
    res.status(200).json({ message: 'Item removed', cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @desc Clear cart
router.delete('/clear', verifyToken, async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user.id });
    res.status(200).json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
