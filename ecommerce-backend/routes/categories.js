const { Category } = require("../models/category");
const express = require("express");
const router = express.Router();
const pLimit = require("p-limit");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key: process.env.cloudinary_Config_api_key,
  api_secret: process.env.cloudinary_Config_api_secret,
});

//get method
router.get("/", async (req, res) => {
  const categoryList = await Category.find();
  if (!categoryList) {
    res.status(500).json({ success: false });
  }
  res.send(categoryList);
});
//get by id
router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res
      .status(500)
      .json({ message: "category with the given ID was not found." });
  }
  return res.status(200).send(category);
});
//update method
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
  const category =await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      images: imageurl,
      color: req.body.color,
       description: req.body.description, // optional
  isFeatured: req.body.isFeatured,   // optional
  parentCategory: req.body.parentCategory 
    },
    { new: true }
  );
  if (!category) {
    res.status(500).json({
      message: "category can not be updated!",

      success: false,
    });
  }
  res.send(category);
});
//delete method
router.delete("/:id", async (req, res) => {
  const deletedCat = await Category.findByIdAndDelete(req.params.id);

  if (!deletedCat) {
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
//create method
router.post("/create", async (req, res) => {
  const limit = pLimit(2);
 if (!Array.isArray(req.body.images)) {
    return res.status(400).json({
      success: false,
      error: "Images must be provided as an array",
    });
  }

  try {
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

    let category = new Category({
      name: req.body.name,
      images: imageurl,
      color: req.body.color,
       description: req.body.description, // optional
  isFeatured: req.body.isFeatured,   // optional
  parentCategory: req.body.parentCategory 
    });

    if (!category) {
      return res.status(500).json({
        error: "Category creation failed",
        success: false,
      });
    }

    try {
      category = await category.save();
      res.status(201).json(category);
    } catch (err) {
      console.error("Saving category failed:", err);
      res.status(500).json({
        error: err.message,
        success: false,
      });
    }
  } catch (err) {
    console.error("POST /create error:", err);
    res.status(500).json({
      error: err.message,
      success: false,
    });
  }
});
// GET /api/categories/:name
router.get("/byname/:name", async (req, res) => {
  const category = await Category.findOne({ name: req.params.name });
  if (!category) {
    return res.status(404).json({ success: false, message: "Category not found" });
  }
  res.status(200).json(category);
});

module.exports = router;
