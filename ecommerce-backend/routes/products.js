const {Category}=require('../models/category.js');
const {Product}=require('../models/product.js');
const express=require('express');
const router=express.Router();
const pLimit = require("p-limit");
const cloudinary = require("cloudinary").v2;
//get method
router.get("/", async (req, res) => {
  const productList = await Product.find().populate("category");
  if (!productList) {
    res.status(500).json({ success: false });
  }
  res.send(productList);
});
router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res
      .status(500)
      .json({ message: "product with the given ID was not found." });
  }
  return res.status(200).send(product);
});


//create method

router.post('/create',async(req,res)=>{
  const category=await Category.findById(req.body.category);
  if(!category){
    return res.status(404).send("Invalid Category!");
  }
 const limit = pLimit(2);

  const imagesToUpload = req.body.images.map((image) => {
    return limit(async () => {
      try {
        console.log("Uploading image...");
        const result = await cloudinary.uploader.upload(image);
        return result;
      } catch (err) {
        console.error("Cloudinary upload failed:", err);
        throw err;
      }
    });
  });

  // ✅ CORRECT: No need to call fn(), they are already promises
  const uploadStatus = await Promise.all(imagesToUpload);

  const imageurl = uploadStatus.map((item) => {
    return item.secure_url;
  });

  if (!uploadStatus) {
    return res.status(500).json({
      error: "Image can not upload..",
      status: false,
    });
  }
  let product=new Product({
    name:req.body.name,
    description:req.body.description,
    images:imageurl,
    brand:req.body.brand,
    price:req.body.price,
    category:req.body.category,
    countInStock:req.body.countInStock,
    rating:req.body.rating,
    numReviews:req.body.numReviews,
    isFeatured:req.body.isFeatured
  });

  product=await product.save();

  if(!product){
    res.status(500).json({
      error:err,
      success:false,
    })

  }

  res.status(201).json(product);
});
//delete method

router.delete("/:id", async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);

  if (!deletedProduct) {
    res.status(404).json({
      message: "Product not found",
      success: false,
    });
  }

  res.status(200).json({
    message: "Product deleted.",
    success: true,
  });
});

//put method
router.put("/:id", async (req, res) => {
  const limit = pLimit(2);

  const imagesToUpload = req.body.images.map((image) => {
    return limit(async () => {
      try {
        console.log("Uploading image...");
        const result = await cloudinary.uploader.upload(image);
        return result;
      } catch (err) {
        console.error("Cloudinary upload failed:", err);
        throw err;
      }
    });
  });

  // ✅ CORRECT: No need to call fn(), they are already promises
  const uploadStatus = await Promise.all(imagesToUpload);

  const imageurl = uploadStatus.map((item) => {
    return item.secure_url;
  });

  if (!uploadStatus) {
    return res.status(500).json({
      error: "Image can not upload..",
      status: false,
    });
  }
  const product =await Product.findByIdAndUpdate(
    req.params.id,
    {
      name:req.body.name,
    description:req.body.description,
    images:imageurl,
    brand:req.body.brand,
    price:req.body.price,
    category:req.body.category,
    countInStock:req.body.countInStock,
    rating:req.body.rating,
    numReviews:req.body.numReviews,
    isFeatured:req.body.isFeatured
    },
    { new: true }
  );
  if (!product) {
    res.status(500).json({
      message: "product can not be updated!",

      success: false,
    });
  }
  res.status(200).json({
    message: "Product is updated.",
    success: true,
  });
  res.send(product);
});

router.delete("/:id", async (req, res) => {
  const deletedUser = await Category.findByIdAndDelete(req.params.id);

  if (!deletedUser) {
    res.status(404).json({
      message: "category not found",
      success: false,
    });
  }

  res.status(200).json({
    message: "category deleted.",
    success: true,
  });
});
module.exports=router;