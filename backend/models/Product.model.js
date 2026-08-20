import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    images: [
      {
        type: String, // image file path
      },
    ],

    model3D: {
      type: String, // glb / gltf file path
    },

    price: {
      type: Number,
      required: true,
    },

    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },

    review: {
      type: String,
    },

    discount: {
      type: Number,
      default: 0,
    },

    category: {
      type: String,
      required: true,
    },

    dimensions: {
      type: String, // LxWxH
    },

    description: {
      type: String,
    },

    warranty: {
      type: String,
    },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },

    stockStatus: {
      type: String,
      enum: ["inStock", "outStock"],
      default: "inStock",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
