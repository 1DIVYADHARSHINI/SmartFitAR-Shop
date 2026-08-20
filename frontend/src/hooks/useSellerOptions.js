import { useEffect, useState } from "react";
import axios from "axios";

const useSellerOptions = () => {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/sellers")
      .then((res) => setSellers(res.data))
      .catch(console.error);
  }, []);

  return sellers;
};

export default useSellerOptions;
