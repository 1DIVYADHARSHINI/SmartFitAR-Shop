import axios from "axios";
import API_URL from "@/config/api";

{/*const API = "http://localhost:5000/api/sellers"; */}

const API = `${API_URL}/api/sellers`;


export const fetchSellers = () => axios.get(API);
export const createSeller = (data) => axios.post(`${API}/create`, data);
export const updateSeller = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteSeller = (id) => axios.delete(`${API}/${id}`);
