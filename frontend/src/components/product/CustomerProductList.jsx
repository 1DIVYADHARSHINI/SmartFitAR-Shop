import { useCustomerProductList } from "@/hooks/useCustomerProductList";
import { useNavigate } from "react-router-dom";
import API_URL from "@/config/api";
import React, { useState, useRef } from "react";
import "@google/model-viewer";
import {
  Eye,
  Heart,
  ShoppingCart,
  Star,
  ChevronLeft,
  ChevronRight,
  X,
  Package,
  Shield,
  MapPin,
  Store,
  User,
  Mail,
  Phone,
  MessageSquare,
  Camera,
  Award,
  Crown,
  ThumbsUp,
  Grid3x3,
  Maximize2,
  Zap,
  Grid,
  List,
  Filter,
  Search,
  CheckCircle,
  ExternalLink,
  Calendar,
  CreditCard,
  RefreshCw,
  ShieldCheck,
  StarHalf,
  PhoneCall,
  Star as StarIcon,
  Box,
  Box as Cube,
} from "lucide-react";

const CustomerProductList = ({ products }) => {
  const [show3DMap, setShow3DMap] = React.useState({});
  const viewerRefs = React.useRef({});
  const [expandedProduct, setExpandedProduct] = useState(null);
  // Track selected image index PER PRODUCT
  const [selectedImageIndex, setSelectedImageIndex] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [showSellerPopup, setShowSellerPopup] = useState(null);
  const [viewMode3D, setViewMode3D] = useState({}); // Track 3D view mode per product

  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    categories,
    filteredProducts,
    handleAddToCart,
    handleAddToWishlist,
    handleFollowSeller,
    formatPrice,
  } = useCustomerProductList(products);

  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            No Products Available
          </h2>
          <p className="text-gray-600 mb-6">
            Check back soon for new arrivals or try different search terms.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const navigate = useNavigate();

  // Get the selected image index for a specific product
  const getSelectedImageIndex = (productId) => {
    return selectedImageIndex[productId] || 0;
  };

  // Set the selected image index for a specific product
  const setSelectedImageForProduct = (productId, index) => {
    setSelectedImageIndex((prev) => ({
      ...prev,
      [productId]: index,
    }));
  };

  const handleImageClick = (productId, index, is3D = false) => {
    if (is3D) {
      setViewMode3D((prev) => ({ ...prev, [productId]: true }));
      setSelectedImageForProduct(productId, 0); // Reset to first image if switching to 3D
    } else {
      setViewMode3D((prev) => ({ ...prev, [productId]: false }));
      setSelectedImageForProduct(productId, index);
    }
  };

  const nextImage = (productId, productImages) => {
    const currentIndex = getSelectedImageIndex(productId);
    if (viewMode3D[productId]) {
      // If in 3D mode, switch back to image mode
      setViewMode3D((prev) => ({ ...prev, [productId]: false }));
      setSelectedImageForProduct(productId, 0);
    } else {
      const nextIndex = (currentIndex + 1) % productImages.length;
      setSelectedImageForProduct(productId, nextIndex);
    }
  };

  const prevImage = (productId, productImages) => {
    const currentIndex = getSelectedImageIndex(productId);
    if (viewMode3D[productId]) {
      // If in 3D mode, switch back to image mode
      setViewMode3D((prev) => ({ ...prev, [productId]: false }));
      setSelectedImageForProduct(productId, productImages.length - 1);
    } else {
      const prevIndex =
        (currentIndex - 1 + productImages.length) % productImages.length;
      setSelectedImageForProduct(productId, prevIndex);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />,
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <StarHalf
            key={i}
            className="w-4 h-4 fill-yellow-400 text-yellow-400"
          />,
        );
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    return stars;
  };

  // Function to launch AR
  const launchAR = (productId) => {
    if (viewerRefs.current[productId]) {
      viewerRefs.current[productId].activateAR();
    }
  };

  // Get current product for modal
  const getCurrentProduct = (productId) => {
    return products.find((p) => p._id === productId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Discover Amazing Products</h1>
          <p className="text-blue-100 mb-8">
            Shop from our curated collection of premium products with AR preview
          </p>

          {/* Search and Filter Bar */}
          <div className="bg-white rounded-xl p-4 shadow-xl">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products, brands, or categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-gray-800"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-3 rounded-lg ${
                    viewMode === "grid"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-3 rounded-lg ${
                    viewMode === "list"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Category Filter */}
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-3">
                <Filter className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  Filter by Category:
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory("All")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === "All"
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All Products
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === cat
                        ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {selectedCategory === "All" ? "All Products" : selectedCategory}
            <span className="text-gray-500 font-normal ml-2">
              ({filteredProducts.length} items)
            </span>
          </h2>
          <div className="text-sm text-gray-600">
            Sorted by:{" "}
            <span className="font-medium text-blue-600">Popularity</span>
          </div>
        </div>

        <div
          className={`${
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-6"
          }`}
        >
          {filteredProducts.map((product) => {
            const discountedPrice =
              product.discount > 0
                ? product.price - (product.price * product.discount) / 100
                : product.price;

            const productId = product._id;
            const currentImageIndex = getSelectedImageIndex(productId);
            const is3DView = viewMode3D[productId];
            const has3DModel = !!product.model3D;

            return (
              <div
                key={productId}
                className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 ${
                  viewMode === "list" ? "flex flex-col md:flex-row" : ""
                }`}
              >
                {/* Product Media Gallery */}
                <div
                  className={`relative ${
                    viewMode === "list" ? "md:w-1/3" : ""
                  }`}
                >
                  {/* Main Image or 3D Viewer */}
                  <div className="relative h-64 overflow-hidden group">
                    {is3DView && has3DModel ? (
                      // 3D Model Viewer
                      <div className="w-full h-full bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center relative">
                        <model-viewer
                          ref={(el) => (viewerRefs.current[productId] = el)}
                          src={`${API_URL}/${product.model3D}`}
                          camera-controls
                          auto-rotate
                          ar
                          ar-modes="scene-viewer quick-look webxr"
                          shadow-intensity="1"
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                        ></model-viewer>
                        <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                          <Cube className="w-3 h-3 inline mr-1" />
                          3D View
                        </div>
                      </div>
                    ) : (
                      // Regular Image
                      <img
                        src={
                          product.images?.[currentImageIndex]
                            ? `${API_URL}/${product.images[currentImageIndex]}`
                            : "/placeholder.jpg"
                        }
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    )}

                    {/* Image Navigation */}
                    {(product.images && product.images.length > 1) ||
                    has3DModel ? (
                      <>
                        <button
                          onClick={() =>
                            prevImage(productId, product.images || [])
                          }
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                        >
                          <ChevronLeft className="w-5 h-5 text-gray-800" />
                        </button>
                        <button
                          onClick={() =>
                            nextImage(productId, product.images || [])
                          }
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                        >
                          <ChevronRight className="w-5 h-5 text-gray-800" />
                        </button>
                      </>
                    ) : null}

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.discount > 0 && (
                        <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full shadow-lg">
                          -{product.discount}%
                        </span>
                      )}
                      {product.stockStatus === "inStock" &&
                        product.stockQuantity < 10 && (
                          <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                            Low Stock
                          </span>
                        )}
                      {is3DView && (
                        <span className="px-3 py-1 bg-purple-500 text-white text-xs font-bold rounded-full shadow-lg">
                          3D View
                        </span>
                      )}
                    </div>

                    {/* View More Button */}
                    <button
                      onClick={() => setIsModalOpen(productId)}
                      className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-black transition-all flex items-center gap-2"
                    >
                      <Maximize2 className="w-4 h-4" />
                      {is3DView ? "View 3D" : "View Gallery"}
                    </button>

                    {/* AR Launch Button (for 3D view) */}
                    {is3DView && has3DModel && (
                      <button
                        onClick={() => launchAR(productId)}
                        className="absolute bottom-3 left-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all flex items-center gap-2"
                      >
                        <Box className="w-4 h-4" />
                        Launch AR
                      </button>
                    )}
                  </div>

                  {/* Thumbnail Strip */}
                  <div className="p-3 border-t border-gray-100">
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {/* Regular Image Thumbnails */}
                      {product.images &&
                        product.images.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() =>
                              handleImageClick(productId, idx, false)
                            }
                            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                              !is3DView && currentImageIndex === idx
                                ? "border-blue-500 shadow-lg scale-105"
                                : "border-transparent hover:border-gray-300"
                            }`}
                          >
                            <img
                              src={`${API_URL}/${img}`}
                              alt={`Thumbnail ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}

                      {/* 3D Model Thumbnail */}
                      {has3DModel && (
                        <button
                          onClick={() => handleImageClick(productId, 0, true)}
                          className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all flex items-center justify-center ${
                            is3DView
                              ? "border-purple-500 bg-purple-50 shadow-lg scale-105"
                              : "border-transparent hover:border-purple-400 bg-purple-50/50"
                          }`}
                        >
                          {is3DView ? (
                            <Cube className="w-8 h-8 text-purple-600" />
                          ) : (
                            <Grid3x3 className="w-6 h-6 text-purple-500" />
                          )}
                          <div className="absolute bottom-1 right-1 bg-purple-500 text-white text-[8px] px-1 rounded">
                            3D
                          </div>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className={`p-6 ${viewMode === "list" ? "md:w-2/3" : ""}`}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {product.name}
                        </h3>
                        {product.featured && (
                          <Crown className="w-5 h-5 text-yellow-500 fill-yellow-400" />
                        )}
                        {has3DModel && (
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">
                            3D
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-gray-600 mb-3">
                        <Store className="w-4 h-4 inline mr-1" />
                        Category:{" "}
                        <span className="font-medium">{product.category}</span>
                      </p>
                    </div>

                    {/* Wishlist Button */}
                    <button
                      onClick={() => handleAddToWishlist(product)}
                      className="p-2 rounded-full hover:bg-red-50 transition-colors"
                    >
                      <Heart className="w-6 h-6 text-gray-400 hover:text-red-500" />
                    </button>
                  </div>

                  {/* Price Section */}
                  <div className="mb-4">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-2xl font-bold text-gray-900">
                        {formatPrice(discountedPrice)}
                      </span>
                      {product.discount > 0 && (
                        <>
                          <span className="text-lg text-gray-400 line-through">
                            {formatPrice(product.price)}
                          </span>
                          <span className="px-2 py-1 bg-red-100 text-red-600 text-sm font-bold rounded">
                            Save {formatPrice(product.price - discountedPrice)}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Rating and Reviews */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {renderStars(product.rating || 0)}
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {product.rating || "N/A"}
                      </span>
                    </div>
                    {product.review && (
                      <button
                        onClick={() =>
                          setExpandedProduct({ ...product, tab: "reviews" })
                        }
                        className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                      >
                        <MessageSquare className="w-4 h-4" />
                        View Review
                      </button>
                    )}
                  </div>

                  {/* Quick Features */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Package className="w-4 h-4 text-blue-500" />
                      <span
                        className={
                          product.stockStatus === "inStock"
                            ? "text-green-600 font-medium"
                            : "text-red-600 font-medium"
                        }
                      >
                        {product.stockStatus === "inStock"
                          ? "In Stock"
                          : "Out of Stock"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Shield className="w-4 h-4 text-purple-500" />
                      <span>{product.warranty || "1 Year Warranty"}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() =>
                        navigate("/checkout", {
                          state: { products: [product] },
                        })
                      }
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <Zap className="w-5 h-5" />
                      Buy Now
                    </button>
                  </div>

                  {/* 3D AR Button (only if 3D model exists and not in 3D view) */}
                  {has3DModel && !is3DView && (
                    <div className="mb-6">
                      <button
                        onClick={() => handleImageClick(productId, 0, true)}
                        className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
                      >
                        <Cube className="w-5 h-5" />
                        View in 3D
                      </button>
                    </div>
                  )}

                  {/* Seller Information - Only View Details Button */}
                  {product.seller && (
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center">
                            <Store className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Sold by</p>
                            <p className="font-medium text-gray-900">
                              {product.seller.storeName || "Unknown Store"}
                            </p>
                          </div>
                        </div>

                        {/* View Seller Details Button */}
                        <button
                          onClick={() => setShowSellerPopup(product.seller)}
                          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View Seller Details
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Quick Info Tabs */}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex border-b border-gray-200 mb-4">
                      <button
                        onClick={() =>
                          setExpandedProduct({ ...product, tab: "description" })
                        }
                        className="flex-1 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-500 transition-all"
                      >
                        Description
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Seller Details Popup */}
      {showSellerPopup && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center z-10">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Store className="w-6 h-6 text-blue-600" />
                Seller Details
              </h3>
              <button
                onClick={() => setShowSellerPopup(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="p-6">
              {/* Seller Header with Image */}
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                    {showSellerPopup.image ? (
                      <img
                        src={`${API_URL}/${showSellerPopup.image}`}
                        alt={showSellerPopup.storeName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Store className="w-12 h-12 text-white" />
                    )}
                  </div>
                  {showSellerPopup.verified && (
                    <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1 rounded-full">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                  )}
                </div>

                <div className="text-center sm:text-left">
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    {showSellerPopup.storeName || "Unknown Store"}
                  </h2>
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
                    <div className="flex">
                      {renderStars(showSellerPopup.rating || 0)}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {showSellerPopup.rating || "N/A"} rating
                    </span>
                  </div>
                  <button
                    onClick={() => handleFollowSeller(showSellerPopup)}
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                  >
                    Follow Seller
                  </button>
                </div>
              </div>

              {/* Seller Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Left Column - Basic Information */}
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-xl p-4">
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <User className="w-5 h-5 text-blue-600" />
                      Basic Information
                    </h4>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Store Name</p>
                        <p className="font-medium text-gray-800">
                          {showSellerPopup.storeName || "Not provided"}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600 mb-1">
                          Seller Name
                        </p>
                        <p className="font-medium text-gray-800">
                          {showSellerPopup.sellerName || "Not provided"}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600 mb-1">Location</p>
                        <p className="font-medium text-gray-800 flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-red-500" />
                          {showSellerPopup.location || "Location not specified"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Contact Information */}
                <div className="space-y-4">
                  <div className="bg-green-50 rounded-xl p-4">
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <Mail className="w-5 h-5 text-green-600" />
                      Contact Information
                    </h4>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">
                          Email Address
                        </p>
                        <p className="font-medium text-gray-800 flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-500" />
                          {showSellerPopup.email || "Not provided"}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600 mb-1">
                          Phone Number
                        </p>
                        <p className="font-medium text-gray-800 flex items-center gap-2">
                          <PhoneCall className="w-4 h-4 text-gray-500" />
                          {showSellerPopup.phone || "Not provided"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rating Information */}
              <div className="mb-8">
                <div className="bg-yellow-50 rounded-xl p-4">
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <StarIcon className="w-5 h-5 text-yellow-500" />
                    Rating Information
                  </h4>

                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-900 mb-1">
                        {showSellerPopup.rating || "0.0"}
                      </div>
                      <div className="flex justify-center mb-2">
                        {renderStars(showSellerPopup.rating || 0)}
                      </div>
                      <p className="text-sm text-gray-600">
                        {showSellerPopup.reviewCount || 0} reviews
                      </p>
                    </div>

                    <div className="flex-1">
                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((star) => (
                          <div key={star} className="flex items-center gap-2">
                            <span className="text-sm text-gray-600 w-8">
                              {star}★
                            </span>
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-yellow-400"
                                style={{ width: `${Math.random() * 60 + 20}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Review Section */}
              {showSellerPopup.review && (
                <div className="mb-8">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <ThumbsUp className="w-5 h-5 text-blue-600" />
                      Seller Review
                    </h4>

                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            Customer Review
                          </p>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {renderStars(showSellerPopup.rating || 0)}
                            </div>
                            <span className="text-sm text-gray-600">
                              Verified Purchase
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 italic">
                        "{showSellerPopup.review}"
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowSellerPopup(null)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleFollowSeller(showSellerPopup);
                    setShowSellerPopup(null);
                  }}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  Follow Seller
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Description Modal */}
      {expandedProduct && expandedProduct.tab === "description" && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center z-10">
              <h3 className="text-xl font-bold text-gray-900">
                Product Description
              </h3>
              <button
                onClick={() => setExpandedProduct(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                <div className="prose max-w-none">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {expandedProduct.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {expandedProduct.dimensions && (
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                      <Grid3x3 className="w-6 h-6 text-blue-600" />
                      <div>
                        <div className="font-medium text-gray-900">
                          Dimensions
                        </div>
                        <div className="text-sm text-gray-600">
                          {expandedProduct.dimensions}
                        </div>
                      </div>
                    </div>
                  )}

                  {expandedProduct.warranty && (
                    <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
                      <ShieldCheck className="w-6 h-6 text-green-600" />
                      <div>
                        <div className="font-medium text-gray-900">
                          Warranty
                        </div>
                        <div className="text-sm text-gray-600">
                          {expandedProduct.warranty}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {expandedProduct && expandedProduct.tab === "reviews" && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center z-10">
              <h3 className="text-xl font-bold text-gray-900">
                Product Review
              </h3>
              <button
                onClick={() => setExpandedProduct(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center">
                      <ThumbsUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">
                        Featured Review
                      </h4>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {renderStars(expandedProduct.rating || 0)}
                        </div>
                        <span className="text-sm text-gray-600">
                          Verified Purchase
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 italic text-lg">
                    "{expandedProduct.review}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Gallery Modal with 3D Support */}
      {/* Enhanced Gallery Modal with 3D Support - FULLY RESPONSIVE */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
            <div className="p-3 sm:p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-base sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                <span className="hidden xs:inline">Product Gallery</span>
                <span className="xs:hidden">Gallery</span>
                {viewMode3D[isModalOpen] && (
                  <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">
                    3D
                  </span>
                )}
              </h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setViewMode3D((prev) => ({ ...prev, [isModalOpen]: false }));
                }}
                className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
              </button>
            </div>

            <div className="p-3 sm:p-4 md:p-6">
              <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                {/* Main Preview Area */}
                <div className="lg:w-2/3 w-full">
                  <div className="relative h-64 xs:h-72 sm:h-80 md:h-96 rounded-xl overflow-hidden bg-gray-100">
                    {viewMode3D[isModalOpen] &&
                    getCurrentProduct(isModalOpen)?.model3D ? (
                      <model-viewer
                        ref={(el) => (viewerRefs.current[isModalOpen] = el)}
                        src={`${API_URL}/${
                          getCurrentProduct(isModalOpen).model3D
                        }`}
                        camera-controls
                        auto-rotate
                        ar
                        ar-modes="scene-viewer quick-look webxr"
                        shadow-intensity="1"
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                      ></model-viewer>
                    ) : (
                      <img
                        src={`${API_URL}/${
                          getCurrentProduct(isModalOpen)?.images?.[
                            getSelectedImageIndex(isModalOpen)
                          ] || ""
                        }`}
                        alt="Preview"
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>

                  {/* Navigation Controls - Responsive */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mt-3 sm:mt-4">
                    <button
                      onClick={() =>
                        prevImage(
                          isModalOpen,
                          getCurrentProduct(isModalOpen)?.images || [],
                        )
                      }
                      className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="hidden xs:inline">Previous</span>
                      <span className="xs:hidden">Prev</span>
                    </button>

                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      {/* 3D Toggle Button */}
                      {getCurrentProduct(isModalOpen)?.model3D && (
                        <button
                          onClick={() =>
                            setViewMode3D((prev) => ({
                              ...prev,
                              [isModalOpen]: !prev[isModalOpen],
                            }))
                          }
                          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-all flex items-center gap-1 sm:gap-2 text-xs sm:text-sm ${
                            viewMode3D[isModalOpen]
                              ? "bg-purple-100 text-purple-700"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          <Cube className="w-4 h-4 sm:w-5 sm:h-5" />
                          <span className="hidden xs:inline">
                            {viewMode3D[isModalOpen] ? "2D View" : "3D View"}
                          </span>
                          <span className="xs:hidden">
                            {viewMode3D[isModalOpen] ? "2D" : "3D"}
                          </span>
                        </button>
                      )}

                      {/* AR Launch Button */}
                      {viewMode3D[isModalOpen] &&
                        getCurrentProduct(isModalOpen)?.model3D && (
                          <button
                            onClick={() => launchAR(isModalOpen)}
                            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                          >
                            <Box className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="hidden xs:inline">Launch AR</span>
                            <span className="xs:hidden">AR</span>
                          </button>
                        )}

                      {/* Image Counter */}
                      <span className="text-xs sm:text-sm text-gray-600 px-2">
                        {viewMode3D[isModalOpen] ? (
                          <span className="flex items-center gap-1">
                            <span className="hidden xs:inline">3D View</span>
                            <span className="xs:hidden">3D</span>
                          </span>
                        ) : (
                          `${getSelectedImageIndex(isModalOpen) + 1} / ${
                            getCurrentProduct(isModalOpen)?.images?.length || 1
                          }`
                        )}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        nextImage(
                          isModalOpen,
                          getCurrentProduct(isModalOpen)?.images || [],
                        )
                      }
                      className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                    >
                      <span className="hidden xs:inline">Next</span>
                      <span className="xs:hidden">Next</span>
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>

                {/* Thumbnail Strip - Responsive */}
                <div className="lg:w-1/3 w-full">
                  <h4 className="font-medium text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base flex items-center justify-between">
                    <span>All Media</span>
                    <span className="text-xs text-gray-500 font-normal">
                      {getCurrentProduct(isModalOpen)?.images?.length || 0}{" "}
                      items
                      {getCurrentProduct(isModalOpen)?.model3D && " + 3D"}
                    </span>
                  </h4>
                  <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 max-h-48 xs:max-h-56 sm:max-h-64 md:max-h-96 overflow-y-auto p-1 sm:p-2">
                    {/* Regular Images */}
                    {getCurrentProduct(isModalOpen)?.images?.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setViewMode3D((prev) => ({
                            ...prev,
                            [isModalOpen]: false,
                          }));
                          setSelectedImageForProduct(isModalOpen, idx);
                        }}
                        className={`rounded-lg overflow-hidden border-2 transition-all aspect-square ${
                          !viewMode3D[isModalOpen] &&
                          getSelectedImageIndex(isModalOpen) === idx
                            ? "border-blue-500 shadow-lg scale-105"
                            : "border-transparent hover:border-gray-300"
                        }`}
                      >
                        <img
                          src={`${API_URL}/${img}`}
                          alt={`Image ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}

                    {/* 3D Model Thumbnail */}
                    {getCurrentProduct(isModalOpen)?.model3D && (
                      <button
                        onClick={() => {
                          setViewMode3D((prev) => ({
                            ...prev,
                            [isModalOpen]: true,
                          }));
                          setSelectedImageForProduct(isModalOpen, 0);
                        }}
                        className={`rounded-lg overflow-hidden border-2 transition-all aspect-square flex items-center justify-center ${
                          viewMode3D[isModalOpen]
                            ? "border-purple-500 bg-purple-50 shadow-lg scale-105"
                            : "border-transparent hover:border-purple-400 bg-purple-50/50"
                        }`}
                      >
                        <div className="text-center">
                          <Cube className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 mx-auto mb-0.5 sm:mb-1" />
                          <span className="text-[8px] sm:text-xs text-purple-700 font-medium">
                            3D
                          </span>
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerProductList;
