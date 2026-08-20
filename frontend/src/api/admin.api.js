import axios from "axios";
import API_URL from "@/config/api";

export const adminLoginApi = (data) => {
  return axios.post(`${API_URL}/api/admin/login`, data);
};
