import CustomerProductList from "@/components/product/CustomerProductList";
import useProducts from "@/hooks/useProducts";

const CustomerProductPage = () => {
  const { products, loading } = useProducts();

  if (loading) {
    return <p className="p-6">Loading products...</p>;
  }

  return <CustomerProductList products={products} />;
};

export default CustomerProductPage;
