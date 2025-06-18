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

router.get("/", async (req, res) => {
  const categoryList = await Category.find();
  if (!categoryList) {
    res.status(500).json({ success: false });
  }
  res.send(categoryList);
});

router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res
      .status(500)
      .json({ message: "category with the given ID was not found." });
  }
  return res.status(200).send(category);
});

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
// router.post('/create', async (req,res)=>{
//     console.log("asmat");
//     const limit=pLimit(2);
//      console.log("asmat");
//     const imagesToUpload=req.body.images.map((image)=>{
//          console.log("asmat");
//         return limit(async ()=>{
//              console.log("asmat");
//             const result =await cloudinary.uploader.upload(image);
//             return result;

//         })
//     });

//     const uploadStatus=await Promise.all(imagesToUpload);
//      console.log("asmat");
//     const imageurl=uploadStatus.map((item)=>{
//          console.log("asmat");
//        return item.secure_url
//     })

//     if(!uploadStatus){
//         return res.status(500).json({
//             error:"Image can not upload..",
//             status:false
//         })
//     }
//     let category=new Category({
//         name:req.body.name,
//         image:imageurl,
//         color:req.body.color
//     });
//     if(!category){
//         res.status(500).json({
//             error:err,
//             succes:false
//         })
//     }
//      try {
//         category = await category.save();
//         res.status(201).json(category); // Send response
//     } catch (err) {
//         res.status(500).json({
//             error: err.message,
//             success: false
//         });
//     }

// });
router.post("/create", async (req, res) => {
  const limit = pLimit(2);

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

module.exports = router;
