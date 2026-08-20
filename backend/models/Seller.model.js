import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema(
  {
    sellerName: String,
    storeName: String,
    email: String,
    phone: String,
    location: String,
    storeImage: String,
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    review: String,
    category: String,
  },
  { timestamps: true }
);

export default mongoose.model("Seller", sellerSchema);
