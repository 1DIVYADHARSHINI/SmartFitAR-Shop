import { useEffect, useState } from "react";
import { fetchSellers, deleteSeller } from "@/api/seller.api";

export const useSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [editSeller, setEditSeller] = useState(null);

  const loadSellers = async () => {
    const res = await fetchSellers();
    setSellers(res.data);
  };

  const removeSeller = async (id) => {
    await deleteSeller(id);
    loadSellers();
  };

  useEffect(() => {
    loadSellers();
  }, []);

  return {
    sellers,
    editSeller,
    setEditSeller,
    removeSeller,
    reload: loadSellers,
  };
};
