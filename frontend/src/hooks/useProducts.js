import { useEffect, useState } from "react";
import { fetchProducts } from "@/api/product.api";

const useProducts = () => {
  const [products, setProducts] = useState([]); // ✅ DEFAULT EMPTY ARRAY
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    try {
      const res = await fetchProducts();
      setProducts(res.data.products || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return { products, loading };
};

export default useProducts;
