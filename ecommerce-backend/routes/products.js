// const { Category } = require("../models/category.js");
// const { Product } = require("../models/product.js");
// const { Supplier } = require("../models/supplier.js");
// const express = require("express");
// const router = express.Router();
// const pLimit = require("p-limit");
// const cloudinary = require("cloudinary").v2;
// const { verifyToken, isAdmin } = require("../middleware/auth"); // ✅ Import middleware


// router.post("/create", verifyToken, isAdmin, async (req, res) => {
//   try {
//     const category = await Category.findById(req.body.category);
//     if (!category) return res.status(404).send("Invalid Category!");

//     const supplier = await Supplier.findById(req.body.supplier);
//     if (!supplier) return res.status(404).send("Invalid Supplier!");

//     const limit = pLimit(2);
//     const imagesToUpload = req.body.images.map((image) =>
//       limit(() => cloudinary.uploader.upload(image))
//     );
//     const uploadStatus = await Promise.all(imagesToUpload);

//     const imageurl = uploadStatus.map((item) => item.secure_url);

//     const product = new Product({
//       name: req.body.name,
//       description: req.body.description,
//       images: imageurl,
//       brand: req.body.brand,
//       price: req.body.price,
//       category: req.body.category,
//       countInStock: req.body.countInStock,
//       rating: req.body.rating,
//       numReviews: req.body.numReviews,
//       isFeatured: req.body.isFeatured,
//       priceRanges: req.body.priceRanges,
//       negotiablePrice: req.body.negotiablePrice,
//       availabilityStatus: req.body.availabilityStatus,
//       condition: req.body.condition,
//       features: req.body.features,
//       orders: req.body.orders,
//       material: req.body.material,
//       design: req.body.design,
//       customization: {
//         logo: req.body.customization?.logo,
//         packaging: req.body.customization?.packaging,
//       },
//       protection: {
//         refundPolicy: req.body.protection?.refundPolicy,
//       },
//       warranty: req.body.warranty,
//       supplier: req.body.supplier,
//       verified: req.body.verified,
//       isRecommended: req.body.isRecommended,
//       tags: req.body.tags,
//       relatedProducts: req.body.relatedProducts,
//       model: req.body.model,
//       style: req.body.style,
//       certificate: req.body.certificate,
//       size: req.body.size,
//       memory: req.body.memory,
//     });

//     const savedProduct = await product.save();
//     res.status(201).json(savedProduct);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Product creation failed", details: err.message });
//   }
// });
// //get method
// router.get("/", async (req, res) => {
//   const productList = await Product.find()
//   .populate("relatedProducts")
//   .populate("category")
//    .populate("supplier");
//   if (!productList) {
//     res.status(500).json({ success: false });
//   }
//   res.send(productList);
// });
// //get by id


// // GET featured products by category name
// router.get("/featured/:categoryName", async (req, res) => {
//   try {
//     // 1. Find the category by name
//     const category = await Category.findOne({ name: req.params.categoryName });
//     if (!category) {
//       return res.status(404).json({
//         message: "Category not found",
//         success: false,
//       });
//     }

//     // 2. Find featured products for that category's _id
//     const products = await Product.find({
//       category: category._id,
//       isFeatured: true,
//     }).populate("category");

//     if (!products || products.length === 0) {
//       return res.status(404).json({
//         message: "No featured products found in this category",
//         success: false,
//       });
//     }

//     // 3. Send response
//     res.status(200).json(products);
//   } catch (err) {
//     res.status(500).json({
//       message: "Server error",
//       error: err.message,
//     });
//   }
// });
// router.get("/:id", async (req, res) => {
//   const product = await Product.findById(req.params.id)
//    .populate("relatedProducts") // <--- This fetches full product objects
//       .populate("category")
//        .populate("supplier");
//   if (!product) {
//     res
//       .status(500)
//       .json({ message: "product with the given ID was not found." });
//   }
//   return res.status(200).send(product);
// });
// //create method
// // router.post("/create", async (req, res) => {
// //   const category = await Category.findById(req.body.category);
// //   if (!category) {
// //     return res.status(404).send("Invalid Category!");
// //   }

// //   // ✅ Check if supplier is valid
// //     const supplier = await Supplier.findById(req.body.supplier);
// //     if (!supplier) {
// //       return res.status(404).send("Invalid Supplier!");
// //     }
// //   const limit = pLimit(2);

// //   const imagesToUpload = req.body.images.map((image) => {
// //     return limit(async () => {
// //       try {
// //         console.log("Uploading image...");
// //         const result = await cloudinary.uploader.upload(image);
// //         return result;
// //       } catch (err) {
// //         console.error("Cloudinary upload failed:", err);
// //         throw err;
// //       }
// //     });
// //   });

// //   // ✅ CORRECT: No need to call fn(), they are already promises
// //   const uploadStatus = await Promise.all(imagesToUpload);

// //   const imageurl = uploadStatus.map((item) => {
// //     return item.secure_url;
// //   });

// //   if (!uploadStatus) {
// //     return res.status(500).json({
// //       error: "Image can not upload..",
// //       status: false,
// //     });
// //   }
// //   let product = new Product({
// //     name: req.body.name,
// //     description: req.body.description,
// //     images: imageurl,
// //     brand: req.body.brand,
// //     price: req.body.price,
// //     category: req.body.category,
// //     countInStock: req.body.countInStock,
// //     rating: req.body.rating,
// //     numReviews: req.body.numReviews,
// //     isFeatured: req.body.isFeatured,
// //     // ✅ Additional fields
// //     priceRanges: req.body.priceRanges, // array of { minQty, maxQty, price }
// //     negotiablePrice: req.body.negotiablePrice,
// //     availabilityStatus: req.body.availabilityStatus, // "In Stock" or "Out of Stock"
// //     condition: req.body.condition, // "New", "Used", "Refurbished"
// //     features: req.body.features, // array of strings like ["Bluetooth", "Waterproof"]
// //     orders: req.body.orders, // optional if you want to preset, otherwise default = 0
// //     material: req.body.material,
// //     design: req.body.design,
// //     customization: {
// //       logo: req.body.customization?.logo,
// //       packaging: req.body.customization?.packaging,
// //     },
// //     protection: {
// //       refundPolicy: req.body.protection?.refundPolicy,
// //     },
// //     warranty: req.body.warranty,
// //     supplier: req.body.supplier,
// //     verified: req.body.verified,
// //     isRecommended: req.body.isRecommended,
// //     tags: req.body.tags, // array of strings
// //     relatedProducts: req.body.relatedProducts, // array of product IDs
// //     model: req.body.model,
// //     style: req.body.style,
// //     certificate: req.body.certificate,
// //     size: req.body.size,
// //     memory: req.body.memory,
// //   });

// //   product = await product.save();

// //   if (!product) {
// //     res.status(500).json({
// //       error: err,
// //       success: false,
// //     });
// //   }

// //   res.status(201).json(product);
// // });
// //delete method
// // router.delete("/:id", async (req, res) => {
// //   const deletedProduct = await Product.findByIdAndDelete(req.params.id);

// //   if (!deletedProduct) {
// //     res.status(404).json({
// //       message: "Product not found",
// //       success: false,
// //     });
// //   }

// //   res.status(200).json({
// //     message: "Product deleted.",
// //     success: true,
// //   });
// // });

// //put method
// // router.put("/:id", async (req, res) => {
// //   const limit = pLimit(2);

// //   const imagesToUpload = req.body.images.map((image) => {
// //     return limit(async () => {
// //       try {
// //         console.log("Uploading image...");
// //         const result = await cloudinary.uploader.upload(image);
// //         return result;
// //       } catch (err) {
// //         console.error("Cloudinary upload failed:", err);
// //         throw err;
// //       }
// //     });
// //   });

// //   // ✅ CORRECT: No need to call fn(), they are already promises
// //   const uploadStatus = await Promise.all(imagesToUpload);

// //   const imageurl = uploadStatus.map((item) => {
// //     return item.secure_url;
// //   });

// //   if (!uploadStatus) {
// //     return res.status(500).json({
// //       error: "Image can not upload..",
// //       status: false,
// //     });
// //   }
// //   const product = await Product.findByIdAndUpdate(
// //     req.params.id,
// //     {
// //       name: req.body.name,
// //       description: req.body.description,
// //       images: imageurl,
// //       brand: req.body.brand,
// //       price: req.body.price,
// //       category: req.body.category,
// //       countInStock: req.body.countInStock,
// //       rating: req.body.rating,
// //       numReviews: req.body.numReviews,
// //       isFeatured: req.body.isFeatured,
// //       // ✅ Additional fields
// //       priceRanges: req.body.priceRanges, // array of { minQty, maxQty, price }
// //       negotiablePrice: req.body.negotiablePrice,
// //       availabilityStatus: req.body.availabilityStatus, // "In Stock" or "Out of Stock"
// //       condition: req.body.condition, // "New", "Used", "Refurbished"
// //       features: req.body.features, // array of strings like ["Bluetooth", "Waterproof"]
// //       orders: req.body.orders, // optional if you want to preset, otherwise default = 0
// //       material: req.body.material,
// //       design: req.body.design,
// //       customization: {
// //         logo: req.body.customization?.logo,
// //         packaging: req.body.customization?.packaging,
// //       },
// //       protection: {
// //         refundPolicy: req.body.protection?.refundPolicy,
// //       },
// //       warranty: req.body.warranty,
// //       supplier: req.body.supplier,
// //       verified: req.body.verified,
// //       isRecommended: req.body.isRecommended,
// //       tags: req.body.tags, // array of strings
// //       relatedProducts: req.body.relatedProducts, // array of product IDs
// //       model: req.body.model,
// //       style: req.body.style,
// //       certificate: req.body.certificate,
// //       size: req.body.size,
// //       memory: req.body.memory,
// //     },
// //     { new: true }
// //   );
// //   if (!product) {
// //     res.status(500).json({
// //       message: "product can not be updated!",

// //       success: false,
// //     });
// //   }
// //   res.status(200).json({
// //     message: "Product is updated.",
// //     success: true,
// //   });
// //   res.send(product);
// // });
// //delete method


// // POST create product (Admin only)


// // PUT update product (Admin only)
// router.put("/:id", verifyToken, isAdmin, async (req, res) => {
//   try {
//     const limit = pLimit(2);
//     const imagesToUpload = req.body.images.map((image) =>
//       limit(() => cloudinary.uploader.upload(image))
//     );
//     const uploadStatus = await Promise.all(imagesToUpload);
//     const imageurl = uploadStatus.map((item) => item.secure_url);

//     const updatedProduct = await Product.findByIdAndUpdate(
//       req.params.id,
//       {
//         name: req.body.name,
//       description: req.body.description,
//       images: imageurl,
//       brand: req.body.brand,
//       price: req.body.price,
//       category: req.body.category,
//       countInStock: req.body.countInStock,
//       rating: req.body.rating,
//       numReviews: req.body.numReviews,
//       isFeatured: req.body.isFeatured,
//       priceRanges: req.body.priceRanges,
//       negotiablePrice: req.body.negotiablePrice,
//       availabilityStatus: req.body.availabilityStatus,
//       condition: req.body.condition,
//       features: req.body.features,
//       orders: req.body.orders,
//       material: req.body.material,
//       design: req.body.design,
//       customization: {
//         logo: req.body.customization?.logo,
//         packaging: req.body.customization?.packaging,
//       },
//       protection: {
//         refundPolicy: req.body.protection?.refundPolicy,
//       },
//       warranty: req.body.warranty,
//       supplier: req.body.supplier,
//       verified: req.body.verified,
//       isRecommended: req.body.isRecommended,
//       tags: req.body.tags,
//       relatedProducts: req.body.relatedProducts,
//       model: req.body.model,
//       style: req.body.style,
//       certificate: req.body.certificate,
//       size: req.body.size,
//       memory: req.body.memory,
//       },
//       { new: true }
//     );

//     if (!updatedProduct)
//       return res.status(404).json({ message: "Product not found", success: false });

//     res.status(200).json({ message: "Product updated", product: updatedProduct });
//   } catch (err) {
//     res.status(500).json({ message: "Update failed", error: err.message });
//   }
// });

// // DELETE product (Admin only)
// router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
//   try {
//     const deleted = await Product.findByIdAndDelete(req.params.id);
//     if (!deleted)
//       return res.status(404).json({ message: "Product not found", success: false });

//     res.status(200).json({ message: "Product deleted", success: true });
//   } catch (err) {
//     res.status(500).json({ message: "Delete failed", error: err.message });
//   }
// });

// //6853d5c0f714f7a19dfe254e _Home and Outdoor  68543f91c87093b265028f1e   home and electronics
// module.exports = router;
const { Category } = require("../models/category.js");
const { Product } = require("../models/product.js");
const  Supplier  = require("../models/supplier.js");
const express = require("express");
const router = express.Router();
const pLimit = require("p-limit");
const cloudinary = require("cloudinary").v2;
const { verifyToken, isAdmin } = require("../middleware/auth");

// ======================================
// CREATE PRODUCT (Admin only)
// ======================================
router.post("/create", verifyToken, isAdmin, async (req, res) => {
  try {
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(404).send("Invalid Category!");

    const supplier = await Supplier.findById(req.body.supplier);
    if (!supplier) return res.status(404).send("Invalid Supplier!");

    const limit = pLimit(2);
    const imagesToUpload = req.body.images.map((image) =>
      limit(() => cloudinary.uploader.upload(image))
    );
    const uploadStatus = await Promise.all(imagesToUpload);
    const imageurl = uploadStatus.map((item) => item.secure_url);

    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      images: imageurl,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
      priceRanges: req.body.priceRanges,
      negotiablePrice: req.body.negotiablePrice,
      availabilityStatus: req.body.availabilityStatus,
      condition: req.body.condition,
      features: req.body.features,
      orders: req.body.orders,
      material: req.body.material,
      design: req.body.design,
      customization: {
        logo: req.body.customization?.logo,
        packaging: req.body.customization?.packaging,
      },
      protection: {
        refundPolicy: req.body.protection?.refundPolicy,
      },
      warranty: req.body.warranty,
      supplier: req.body.supplier,
      verified: req.body.verified,
      isRecommended: req.body.isRecommended,
      tags: req.body.tags,
      relatedProducts: req.body.relatedProducts,
      model: req.body.model,
      style: req.body.style,
      certificate: req.body.certificate,
      size: req.body.size,
      memory: req.body.memory,
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Product creation failed", details: err.message });
  }
});

// ======================================
// GET ALL PRODUCTS
// ======================================
router.get("/", async (req, res) => {
  try {
    const productList = await Product.find()
      .populate("relatedProducts")
      .populate("category")
      .populate("supplier");

    res.status(200).send(productList);
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch products" });
  }
});

// ======================================
// GET FEATURED PRODUCTS BY CATEGORY NAME
// ======================================
router.get("/featured/:categoryName", async (req, res) => {
  try {
    const category = await Category.findOne({ name: req.params.categoryName });
    if (!category) {
      return res.status(404).json({
        message: "Category not found",
        success: false,
      });
    }

    const products = await Product.find({
      category: category._id,
      isFeatured: true,
    }).populate("category");

    if (!products || products.length === 0) {
      return res.status(404).json({
        message: "No featured products found in this category",
        success: false,
      });
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
});

// ======================================
// UPDATE PRODUCT (Admin only)
// ======================================
router.put("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const limit = pLimit(2);
    const imagesToUpload = req.body.images.map((image) =>
      limit(() => cloudinary.uploader.upload(image))
    );
    const uploadStatus = await Promise.all(imagesToUpload);
    const imageurl = uploadStatus.map((item) => item.secure_url);

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        images: imageurl,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
        priceRanges: req.body.priceRanges,
        negotiablePrice: req.body.negotiablePrice,
        availabilityStatus: req.body.availabilityStatus,
        condition: req.body.condition,
        features: req.body.features,
        orders: req.body.orders,
        material: req.body.material,
        design: req.body.design,
        customization: {
          logo: req.body.customization?.logo,
          packaging: req.body.customization?.packaging,
        },
        protection: {
          refundPolicy: req.body.protection?.refundPolicy,
        },
        warranty: req.body.warranty,
        supplier: req.body.supplier,
        verified: req.body.verified,
        isRecommended: req.body.isRecommended,
        tags: req.body.tags,
        relatedProducts: req.body.relatedProducts,
        model: req.body.model,
        style: req.body.style,
        certificate: req.body.certificate,
        size: req.body.size,
        memory: req.body.memory,
      },
      { new: true }
    );

    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found", success: false });

    res.status(200).json({ message: "Product updated", product: updatedProduct });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
});

// ✅ Get products by category name (not just featured)
router.get("/by-category/:categoryName", async (req, res) => {
  try {
    const category = await Category.findOne({ name: req.params.categoryName });
    if (!category) {
      return res.status(404).json({ message: "Category not found", success: false });
    }

    const products = await Product.find({ category: category._id })
      .populate("category")
      .populate("supplier");

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found in this category", success: false });
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ======================================
// DELETE PRODUCT (Admin only)
// ======================================
router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Product not found", success: false });

    res.status(200).json({ message: "Product deleted", success: true });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
});

// ======================================
// GET PRODUCT BY ID (MUST BE LAST)
// ======================================
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("relatedProducts")
      .populate("category")
      .populate("supplier");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).send(product);
  } catch (err) {
    res.status(400).json({ message: "Invalid product ID", error: err.message });
  }
});

module.exports = router;
