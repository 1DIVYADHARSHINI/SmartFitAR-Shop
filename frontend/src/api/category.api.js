import axios from "axios";
import API_URL from "@/config/api";
const BASE_URL = `${API_URL}/api/categories`;

export const fetchProductCategories = () =>
  axios.get(`${BASE_URL}/product`);
