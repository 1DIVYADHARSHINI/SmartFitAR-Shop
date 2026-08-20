import express from "express";
import { getProductCategories } from "../controllers/category.controller.js";

const router = express.Router();

router.get("/product", getProductCategories);

export default router;
