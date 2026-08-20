import DashboardLayout from "../components/layout/DashboardLayout";
import ProductForm from "../components/product/ProductForm";
import ProductList from "../components/product/ProductList";
import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../api/product.api";
import { useProductForm } from "@/hooks/useProductForm";
import useSellerOptions from "@/hooks/useSellerOptions";
import { Package, RefreshCw, Layers, Grid } from "lucide-react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    with3D: 0,
    discounted: 0
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await getProducts();
      const productsData = res.data.products || [];
      setProducts(productsData);
      
      // Calculate stats
      const with3D = productsData.filter(p => p.model3D).length;
      const discounted = productsData.filter(p => p.discount > 0).length;
      
      setStats({
        total: productsData.length,
        with3D,
        discounted
      });
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const form = useProductForm(fetchProducts);
  const sellers = useSellerOptions();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header with Stats */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              Product Management
            </h1>
            <p className="text-gray-600 mt-2">Manage all products in your inventory</p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Stats Cards */}
            <div className="flex gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100 p-4 min-w-28">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                    <Package className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                </div>
                <div className="text-sm text-gray-600">Total Products</div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100 p-4 min-w-28">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-400 flex items-center justify-center">
                    <Grid className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stats.with3D}</div>
                </div>
                <div className="text-sm text-gray-600">3D Models</div>
              </div>
            </div>
            
            <button
              onClick={fetchProducts}
              disabled={loading}
              className="p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 border border-gray-200 hover:border-blue-200 group"
              title="Refresh products"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-500"}`} />
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Product Form */}
          <div className="lg:col-span-2">
            <ProductForm form={form} sellers={sellers} isEdit={form.isEdit} />
          </div>
          
          {/* Right Column - Quick Tips */}
          <div className="space-y-6">
            {/* Tips Card */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-400 flex items-center justify-center">
                  <Layers className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Quick Tips</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-amber-600">1</span>
                  </div>
                  <p className="text-sm text-gray-700">Upload high-quality images for better visualization</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-amber-600">2</span>
                  </div>
                  <p className="text-sm text-gray-700">Add 3D models for AR preview functionality</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-amber-600">3</span>
                  </div>
                  <p className="text-sm text-gray-700">Set accurate dimensions for proper AR placement</p>
                </li>
              </ul>
            </div>
            
            {/* Status Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Active Products</span>
                  <span className="font-bold text-gray-900">{stats.total}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">With Discount</span>
                  <span className="font-bold text-green-600">{stats.discounted}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">3D Ready</span>
                  <span className="font-bold text-purple-600">{stats.with3D}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product List */}
        <div className="mt-8">
          <ProductList
            products={products}
            onEdit={form.fillFormForEdit}
            onDelete={async (id) => {
              await deleteProduct(id);
              fetchProducts();
            }}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Products;