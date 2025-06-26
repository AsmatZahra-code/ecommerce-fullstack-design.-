
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { verifyToken, isAdmin } = require("../middleware/auth");

// 🔐 JWT Generator
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      isAdmin: user.isAdmin,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// ✅ Register User
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, passwordHash, phone });

    res.status(201).json({
      message: "User registered",
      token: generateToken(user),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Login User
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    res.status(200).json({
      message: "Login successful",
      token: generateToken(user),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get Profile (Protected)
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-passwordHash");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Update User (Self)
router.put("/profile/:id", verifyToken, async (req, res) => {
  try {
    const { name, phone, shippingAddress } = req.body;
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { name, phone, shippingAddress },
      { new: true }
    ).select("-passwordHash");

    if (!updated)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User updated", user: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Admin: Delete User
router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Admin: Get All Users
router.get("/", verifyToken, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-passwordHash");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// GET /api/users/wishlist
// routes/users.js or routes/wishlist.js
router.get("/wishlist", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("wishlist");
    res.status(200).json(user.wishlist);
  } catch (err) {
    res.status(500).json({ message: "Error fetching wishlist." });
  }
});
router.post("/wishlist/add", verifyToken, async (req, res) => {
  const { productId } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
      await user.save();
    }
    res.status(200).json({ message: "Product added to wishlist." });
  } catch (err) {
    res.status(500).json({ message: "Error adding to wishlist." });
  }
});
router.delete("/wishlist/remove/:productId", verifyToken, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { wishlist: req.params.productId },
    });
    res.status(200).json({ message: "Product removed from wishlist." });
  } catch (err) {
    res.status(500).json({ message: "Error removing from wishlist." });
  }
});


module.exports = router;
