import express from "express";
import Product from "../models/Product.model.js";
import Seller from "../models/Seller.model.js";

const router = express.Router();

router.get("/counts", async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalSellers = await Seller.countDocuments();
    const totalCategories = await Product.distinct("category");

    res.json({
      success: true,
      totalProducts,
      totalSellers,
      totalCategories: totalCategories.length,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
