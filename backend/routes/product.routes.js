import express from "express";
import upload from "../config/multer.js";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);

router.post(
  "/create",
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "model3D", maxCount: 1 },
  ]),
  createProduct
);

router.put(
  "/:id",
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "model3D", maxCount: 1 },
  ]),
  updateProduct
);

router.delete("/:id", deleteProduct);

export default router;
