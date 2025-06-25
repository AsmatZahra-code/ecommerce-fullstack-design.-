const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  passwordHash: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    default: "",
  },

  isAdmin: {
    type: Boolean,
    default: false,  //differentiate admin and regular user
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  shippingAddress: {
    street: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
    },
    zip: {
      type: String,
      default: "",
    },
  },

  savedAddresses: [
    {
      label: {
        type: String,
        default: "",
      },
      street: {
        type: String,
        default: "",
      },
      city: {
        type: String,
        default: "",
      },
      country: {
        type: String,
        default: "",
      },
      zip: {
        type: String,
        default: "",
      },
    },
  ],

  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],

  dateJoined: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
