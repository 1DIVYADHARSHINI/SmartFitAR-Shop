import Seller from "../models/Seller.model.js";

/* CREATE */
export const createSeller = async (req, res) => {
  try {
    const seller = await Seller.create({
      ...req.body,
      storeImage: req.file ? req.file.filename : null,
    });
    res.status(201).json(seller);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* READ */
export const getSellers = async (req, res) => {
  const sellers = await Seller.find().sort({ createdAt: -1 });
  res.json(sellers);
};

/* UPDATE */
export const updateSeller = async (req, res) => {
  const updated = await Seller.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      ...(req.file && { storeImage: req.file.filename }),
    },
    { new: true }
  );
  res.json(updated);
};

/* DELETE */
export const deleteSeller = async (req, res) => {
  await Seller.findByIdAndDelete(req.params.id);
  res.json({ message: "Seller deleted" });
};
