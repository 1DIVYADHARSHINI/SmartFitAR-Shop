import axios from "axios";
import API_URL from "@/config/api";
// ✅ Use proxy-based relative URL
const BASE_URL = `${API_URL}/api/products`;

export const getProducts = () => axios.get(BASE_URL);

export const createProduct = (data) => axios.post(`${BASE_URL}/create`, data);

export const updateProduct = (id, data) =>axios.put(`${API_URL}/api/products/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteProduct = (id) => axios.delete(`${BASE_URL}/${id}`);

// Additional fetch functions (kept as-is)
export const fetchProducts = () => axios.get(BASE_URL);

export const fetchProductById = (id) => axios.get(`${BASE_URL}/${id}`);
