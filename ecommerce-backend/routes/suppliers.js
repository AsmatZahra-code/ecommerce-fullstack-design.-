const  Supplier = require("../models/supplier");
const express = require("express");
const router = express.Router();

//get method
router.get("/", async (req, res) => {
  const supplierList = await Supplier.find();
  if (!supplierList) {
    res.status(500).json({ success: false });
  }
  res.send(supplierList);
});

//get by Id
router.get("/:id", async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);
  if (!supplier) {
    res
      .status(500)
      .json({ message: "category with the given ID was not found." });
  }
  return res.status(200).send(supplier);
});

//update method
router.put("/:id", async (req, res) => {
  try {
    const updatedSupplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        company: req.body.company || "",
        country: req.body.country || "",
        city: req.body.city || "",
        isVerified: req.body.isVerified || false,
        shipping: {
          worldwide: req.body.shipping?.worldwide || false,
          notes: req.body.shipping?.notes || "",
        },
        email: req.body.email || "",
        phone: req.body.phone || "",
      },
      { new: true } // returns the updated document
    );

    if (!updatedSupplier) {
      return res.status(500).json({
        message: "Supplier could not be updated!",
        success: false,
      });
    }

    res.status(200).json({
      message: "Supplier updated successfully",
      supplier: updatedSupplier,
    });
  } catch (err) {
    console.error("Error updating supplier:", err);
    res.status(500).json({
      error: err.message,
      success: false,
    });
  }
});
//create method
router.post("/create", async (req, res) => {
  try {
    const supplier = new Supplier({
      name: req.body.name,
      company: req.body.company || "",
      country: req.body.country || "",
      city: req.body.city || "",
      isVerified: req.body.isVerified || false,
      shipping: {
        worldwide: req.body.shipping?.worldwide || false,
        notes: req.body.shipping?.notes || "",
      },
      email: req.body.email || "",
      phone: req.body.phone || "",
    });

    const savedSupplier = await supplier.save();

    res.status(201).json({
      message: "Supplier created successfully",
      supplier: savedSupplier,
    });
  } catch (err) {
    console.error("Error creating supplier:", err);
    res.status(500).json({
      error: err.message,
      success: false,
    });
  }
});
//delete method
router.delete("/:id", async (req, res) => {
  const deletedSup = await Supplier.findByIdAndDelete(req.params.id);

  if (!deletedSup) {
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

//first supplier id 6858e9baf8d27553b89ec706
module.exports = router;