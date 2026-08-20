import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useProductNotifications } from "@/hooks/useProductNotifications";
import { 
  Upload, 
  Image, 
  Box, 
  Tag, 
  DollarSign, 
  Star, 
  Package, 
  Ruler, 
  Shield, 
  FileText, 
  Percent, 
  User,
  CheckCircle,
  XCircle,
  Plus,
  Grid3x3
} from "lucide-react";

const ProductForm = ({ form, sellers, isEdit }) => {
  const {
    state,
    setField,
    handleImageChange,
    handleModelChange,
    handleSubmit,
  } = form;

  const { handleSubmitWithNotification } = useProductNotifications({
    state,
    sellers,
    handleSubmit,
  });

  return (
    <form
      onSubmit={handleSubmitWithNotification}
      className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
    >
      {/* Form Header */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-5 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
            {isEdit ? (
              <Package className="w-5 h-5 text-white" />
            ) : (
              <Plus className="w-5 h-5 text-white" />
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {isEdit ? "Edit Product" : "Add New Product"}
            </h2>
            <p className="text-sm text-gray-600">Fill all required product details</p>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6 space-y-6">
        {/* File Uploads Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Product Images */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-900">
              <Image className="w-4 h-4" />
              Product Images
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors bg-gray-50">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
              <label className="cursor-pointer">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <div className="text-sm text-gray-600 mb-2">
                  Click to upload product images
                </div>
                <div className="text-xs text-gray-500">PNG, JPG, WEBP up to 5MB</div>
              </label>
            </div>

            {/* Image Previews */}
            {state.imagePreviews.length > 0 && (
              <div className="space-y-3">
                <div className="text-sm font-medium text-gray-700">Uploaded Images:</div>
                <div className="grid grid-cols-4 gap-2">
                  {state.imagePreviews.map((img, i) => (
                    <div key={i} className="relative group">
                      <img
                        src={img}
                        alt={`Preview ${i + 1}`}
                        className="h-20 w-full object-cover rounded-lg border border-gray-200"
                      />
                      {i === 0 && (
                        <div className="absolute top-1 left-1 px-2 py-1 bg-blue-500 text-white text-xs rounded">
                          Main
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 3D Model */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-900">
              <Grid3x3 className="w-4 h-4" />
              3D Model (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-purple-400 transition-colors bg-gray-50">
              <Box className="w-8 h-8 text-gray-400 mx-auto mb-3" />
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept=".glb,.gltf"
                  onChange={handleModelChange}
                  className="hidden"
                />
                <div className="text-sm text-gray-600 mb-2">
                  Upload 3D model for AR preview
                </div>
                <div className="text-xs text-gray-500">GLB, GLTF up to 50MB</div>
              </label>
            </div>
            
            {state.modelFile && (
              <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-gray-900">
                    Selected: {state.modelFile.name}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Product Details Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Package className="w-5 h-5" />
              Basic Information
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <Tag className="w-4 h-4" />
                  Product Name *
                </label>
                <input
                  type="text"
                  value={state.name}
                  onChange={(e) => setField("name", e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <DollarSign className="w-4 h-4" />
                  Price *
                </label>
                <input
                  type="number"
                  value={state.price}
                  onChange={(e) => setField("price", e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                  placeholder="0.00"
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <Tag className="w-4 h-4" />
                  Category *
                </label>
                <input
                  type="text"
                  value={state.category}
                  onChange={(e) => setField("category", e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                  placeholder="e.g., Furniture, Electronics"
                  required
                />
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Ruler className="w-5 h-5" />
              Specifications
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <Ruler className="w-4 h-4" />
                  Dimensions
                </label>
                <input
                  type="text"
                  value={state.dimensions}
                  onChange={(e) => setField("dimensions", e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                  placeholder="e.g., 120x80x60 cm"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <Shield className="w-4 h-4" />
                  Warranty
                </label>
                <input
                  type="text"
                  value={state.warranty}
                  onChange={(e) => setField("warranty", e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                  placeholder="e.g., 1 Year"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <Percent className="w-4 h-4" />
                  Discount (%)
                </label>
                <input
                  type="number"
                  value={state.discount}
                  onChange={(e) => setField("discount", e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                  placeholder="0"
                  min="0"
                  max="100"
                />
              </div>
            </div>
          </div>

          {/* Ratings & Seller */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Star className="w-5 h-5" />
              Additional Details
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <Star className="w-4 h-4" />
                  Rating
                </label>
                <input
                  type="number"
                  value={state.rate}
                  onChange={(e) => setField("rate", e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                  placeholder="0-5"
                  min="0"
                  max="5"
                  step="0.1"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <User className="w-4 h-4" />
                  Select Seller *
                </label>
                <select
                  value={state.sellerId}
                  onChange={(e) => setField("sellerId", e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                  required
                >
                  <option value="">Select a seller</option>
                  {sellers.map((seller) => (
                    <option key={seller._id} value={seller._id}>
                      {seller.storeName} — {seller.sellerName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Text Areas */}
        <div className="space-y-6">
          {/* Description */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-900">
              <FileText className="w-4 h-4" />
              Description
            </label>
            <textarea
              value={state.description}
              onChange={(e) => setField("description", e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all min-h-32"
              placeholder="Describe the product features, materials, and benefits..."
              rows="4"
            />
          </div>

          {/* Review */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-900">
              <Star className="w-4 h-4" />
              Customer Review
            </label>
            <textarea
              value={state.review}
              onChange={(e) => setField("review", e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all min-h-20"
              placeholder="Add a sample customer review..."
              rows="3"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="group px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-3"
          >
            <CheckCircle className="w-5 h-5" />
            {isEdit ? "Update Product" : "Save Product"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;