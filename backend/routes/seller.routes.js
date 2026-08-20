import express from "express";
import upload from "../config/multer.js";
import {
  createSeller,
  getSellers,
  updateSeller,
  deleteSeller,
} from "../controllers/seller.controller.js";

const router = express.Router();

router.post("/create", upload.single("storeImage"), createSeller);
router.get("/", getSellers);
router.put("/:id", upload.single("storeImage"), updateSeller);
router.delete("/:id", deleteSeller);

export default router;
