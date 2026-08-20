import Product from "../models/Product.model.js";

/* ---------------- CREATE ---------------- */
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      rating,
      review,
      discount,
      category,
      dimensions,
      description,
      warranty,
      stockStatus,
      seller, // 🔑 IMPORTANT
    } = req.body;

    // ❗ validate seller
    if (!seller) {
      return res.status(400).json({
        success: false,
        message: "Seller is required",
      });
    }

    const images = req.files?.images?.map((f) => f.path) || [];
    const model3D = req.files?.model3D?.[0]?.path || "";

    const product = await Product.create({
      name,
      price,
      rating,
      review,
      discount,
      category,
      dimensions,
      description,
      warranty,
      stockStatus,
      seller, // 🔗 LINKED
      images,
      model3D,
    });

    res.status(201).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ---------------- GET ALL ---------------- */
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate(
        "seller",
        "sellerName storeName email location rating review category phone"
      )
      .sort({ createdAt: -1 });

    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ---------------- UPDATE ---------------- */
export const updateProduct = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.files?.images) {
      updateData.images = req.files.images.map((f) => f.path);
    }

    if (req.files?.model3D) {
      updateData.model3D = req.files.model3D[0].path;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ---------------- DELETE ---------------- */
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
