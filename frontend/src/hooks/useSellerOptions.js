import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "@/config/api";

const useSellerOptions = () => {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/sellers`)
      .then((res) => setSellers(res.data))
      .catch(console.error);
  }, []);

  return sellers;
};

export default useSellerOptions;
