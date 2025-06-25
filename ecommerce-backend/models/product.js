const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [{
    type: String,
    required: true
  }],
  brand: {
    type: String,
    default: '',
  },
  price: {
    type: Number,
    default: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  countInStock: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  numReviews: {
    type: Number,
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },

  // ✅ Additional fields to be appended
  priceRanges: [
    {
      minQty: Number,
      maxQty: Number,
      price: Number,
    },
  ],
  negotiablePrice: {
    type: Boolean,
    default: false,
  },
  availabilityStatus: {
    type: String,
    default: 'In Stock', // e.g., “In Stock” / “Out of Stock”
  },
  condition: {
    type: String,
    enum: ['New', 'Refurbished', 'Used'],
    default: 'New',
  },
  features: {
    type: [String],
    default: [],
  },
  orders: {
    type: Number,
    default: 0,
  },
  material: {
    type: String,
     default: '',
  },
  design: {
    type: String,
     default: '',
  },
  customization: {
    logo: { type: Boolean, default: false },
    packaging: { type: Boolean, default: false },
  },
  protection: {
    refundPolicy: { type: Boolean, default: false },
  },
  warranty: {
    type: String,
     default: '',
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
  },
  verified: {
    type: Boolean,
    default: false,
  },
  isRecommended: {
    type: Boolean,
    default: false,
  },
  tags: {
    type: [String],
    default: [],
  },
  relatedProducts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  model: {
    type: String,
    default:'',
  },
  style: {
    type: String,
     default: '',
  },
  certificate: {
    type: String,
  },
  size: {
    type: String,
     default: '',
  },
  memory: {
    type: String,
     default: '',
  }
});
productSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

productSchema.set('toJSON', {
  virtuals: true,
});

exports.Product = mongoose.model('Product', productSchema);
exports.productSchema = productSchema;
