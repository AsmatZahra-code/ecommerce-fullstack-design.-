// const User = require("../models/userModel");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const router = express.Router();
// // Helper: Generate JWT
// const generateToken = (user) => {
//   return jwt.sign(
//     {
//       id: user._id,
//       isAdmin: user.isAdmin,
//       role: user.role,
//     },
//     process.env.JWT_SECRET,
//     { expiresIn: "7d" }
//   );
// };

// // @desc Register user
// exports.registerUser = async (req, res) => {
//   try {
//     const { name, email, password, phone } = req.body;

//     const userExists = await User.findOne({ email });
//     if (userExists) return res.status(400).json({ message: "User already exists" });

//     const salt = await bcrypt.genSalt(10);
//     const passwordHash = await bcrypt.hash(password, salt);

//     const user = await User.create({ name, email, passwordHash, phone });

//     res.status(201).json({
//       message: "User registered",
//       token: generateToken(user),
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         isAdmin: user.isAdmin,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc Login user
// exports.loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(401).json({ message: "Invalid email or password" });

//     const isMatch = await bcrypt.compare(password, user.passwordHash);
//     if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

//     res.status(200).json({
//       message: "Login successful",
//       token: generateToken(user),
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         isAdmin: user.isAdmin,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc Get profile of logged-in user
// exports.getUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select("-passwordHash");
//     if (!user) return res.status(404).json({ message: "User not found" });

//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc Update user profile (user or admin)
// exports.updateUser = async (req, res) => {
//   try {
//     const { name, phone, shippingAddress } = req.body;

//     const updated = await User.findByIdAndUpdate(
//       req.params.id,
//       { name, phone, shippingAddress },
//       { new: true }
//     ).select("-passwordHash");

//     if (!updated) return res.status(404).json({ message: "User not found" });

//     res.status(200).json({ message: "User updated", user: updated });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc Admin: Delete user
// exports.deleteUser = async (req, res) => {
//   try {
//     const deleted = await User.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ message: "User not found" });

//     res.status(200).json({ message: "User deleted" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc Admin: Get all users
// exports.getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find().select("-passwordHash");
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// module.exports = router;
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

module.exports = router;
