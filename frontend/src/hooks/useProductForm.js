import { useState } from "react";
import { createProduct, updateProduct } from "@/api/product.api";
import API_URL from "@/config/api";
const initialState = {
  productId: null,

  name: "",
  price: "",
  rate: "",
  category: "",
  review: "",
  discount: "",
  dimensions: "",
  description: "",
  warranty: "",
  stock: "inStock",
  sellerId: "",

  images: [],
  imagePreviews: [],
  modelFile: null,
};

export const useProductForm = (onSuccess) => {
  const [state, setState] = useState(initialState);
  const [isEdit, setIsEdit] = useState(false); // ✅ ADD

  const setField = (key, value) =>
    setState((prev) => ({ ...prev, [key]: value }));

  /* ---------- IMAGE HANDLER (MULTIPLE + GALLERY) ---------- */
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setField("images", files);
    setField(
      "imagePreviews",
      files.map((file) => URL.createObjectURL(file))
    );
  };

  /* ---------- 3D MODEL HANDLER ---------- */
  const handleModelChange = (e) => {
    setField("modelFile", e.target.files[0]);
  };

  /* ---------- SUBMIT ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", state.name);
    formData.append("price", state.price);
    formData.append("rating", state.rate);
    formData.append("category", state.category);
    formData.append("review", state.review);
    formData.append("discount", state.discount);
    formData.append("dimensions", state.dimensions);
    formData.append("description", state.description);
    formData.append("warranty", state.warranty);
    formData.append("stockStatus", state.stock);
    formData.append("seller", state.sellerId);

    state.images.forEach((img) => formData.append("images", img));
    if (state.modelFile) formData.append("model3D", state.modelFile);

    state.productId
      ? await updateProduct(state.productId, formData)
      : await createProduct(formData);

    setState(initialState);
    setIsEdit(false); // ✅ ADD
    onSuccess();
  };

  /* ---------- EDIT MODE ---------- */
  const fillFormForEdit = (product) => {
    setIsEdit(true); // ✅ ADD
    setState({
      ...initialState,
      productId: product._id,
      name: product.name,
      price: product.price,
      rate: product.rating,
      category: product.category,
      review: product.review,
      discount: product.discount,
      dimensions: product.dimensions,
      description: product.description,
      warranty: product.warranty,
      stock: product.stockStatus,
      sellerId: product.seller?._id || "",
      imagePreviews: product.images.map(
        (img) => `${API_URL}/${img}`
      ),
    });
  };

  return {
    state,
    setField,
    handleImageChange,
    handleModelChange,
    handleSubmit,
    fillFormForEdit,
    isEdit, // ✅ ADD
  };
};
export default useProductForm;
