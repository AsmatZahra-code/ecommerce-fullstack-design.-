const mongoose = require("mongoose");
// Country name to 2-letter lowercase country code mapping
const countryToCode = {
  USA: "us",
  Germany: "de",
  Pakistan: "pk",
  China: "cn",
  India: "in",
  Canada: "ca",
  France: "fr",
  UK: "gb", // use "gb" for United Kingdom
  // Add more countries as needed
};

const supplierSchema = new mongoose.Schema({

  
  name: {
    type: String,
    required: true,
  },
  company: { 
    type: String, 
    default: "" },
  country: {
     type: String,
      default: "" },
  city: {
     type: String, 
     default: "" },
  isVerified: {
    type: Boolean,
    default: false,
  },
  shipping: {
    worldwide: {
      type: Boolean,
      default: false,
    },
    notes: {
      type: String,
      default: "",
    },
  },
  email: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
});
// ✅ Virtual field to compute country code dynamically
supplierSchema.virtual("countryCode").get(function () {
  return countryToCode[this.country] || "";
});

// ✅ Ensure virtuals are included when converting to JSON
supplierSchema.set("toJSON", { virtuals: true });
supplierSchema.set("toObject", { virtuals: true });
module.exports = mongoose.model("Supplier", supplierSchema);
