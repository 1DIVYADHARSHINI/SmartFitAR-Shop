import React from "react";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "@/hooks/useWishlist";
import API_URL from "@/config/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ArrowLeft,
  Trash2,
  Bell,
  Heart,
  AlertCircle,
  Sparkles,
  TrendingDown,
  Gift,
  Eye,
  Star,
  Percent,
  Package,
} from "lucide-react";

const WishlistPage = () => {
  const navigate = useNavigate();
  const {
    wishlist,
    selectedAlert,
    setSelectedAlert,
    handleRemove,
    handleAlertChange,
  } = useWishlist();

  // Enhanced remove handler with toast
  const handleRemoveWithToast = async (productId, productName) => {
    try {
      await handleRemove(productId);
      toast.warning(`${productName} removed from wishlist`, {
        position: "top-center",
        autoClose: 3000,
        icon: "🗑️",
      });
    } catch (error) {
      toast.error("Failed to remove product", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  // Enhanced alert handler with toast
  const handleAlertWithToast = async (productId, productName) => {
    if (!selectedAlert[productId]) {
      toast.info("Please select a discount percentage", {
        position: "top-center",
        autoClose: 3000,
        icon: "📋",
      });
      return;
    }

    try {
      await handleAlertChange(productId, selectedAlert[productId]);
      toast.success(
        `Alert set for ${selectedAlert[productId]}% discount on ${productName}`,
        {
          position: "top-right",
          autoClose: 4000,
          icon: "🔔",
        }
      );
    } catch (error) {
      toast.error("Failed to set alert", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <ToastContainer />
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 mb-6 text-gray-600 hover:text-purple-600 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back</span>
          </button>

          <div className="max-w-md mx-auto text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Your Wishlist is Empty
            </h2>
            <p className="text-gray-600 mb-8">
              Start adding products you love to get notified when prices drop!
            </p>
            <button
              onClick={() => navigate("/productcard")}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all transform hover:-translate-y-1 shadow-md hover:shadow-lg"
            >
              Browse Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ===== CHOOSE YOUR PREFERRED COLOR SCHEME =====

  // OPTION 1: Elegant Purple-Pink (Currently Applied)
  const headerGradient = "bg-gradient-to-r from-purple-600 to-pink-500";
  const headerGradientHover = "from-purple-700 to-pink-600";
  const backButtonColor = "text-purple-100 hover:text-white";
  const accentColor = "text-purple-600 hover:text-purple-700";
  const accentBorder = "border-purple-600";
  const accentBgHover = "hover:bg-purple-50";
  const accentButtonGradient = "from-purple-600 to-pink-500";
  const accentButtonHover = "from-purple-700 to-pink-600";

  // OPTION 2: Professional Emerald-Teal (Uncomment to use)
  // const headerGradient = "bg-gradient-to-r from-emerald-600 to-teal-500";
  // const headerGradientHover = "from-emerald-700 to-teal-600";
  // const backButtonColor = "text-emerald-100 hover:text-white";
  // const accentColor = "text-emerald-600 hover:text-emerald-700";
  // const accentBorder = "border-emerald-600";
  // const accentBgHover = "hover:bg-emerald-50";
  // const accentButtonGradient = "from-emerald-600 to-teal-500";
  // const accentButtonHover = "from-emerald-700 to-teal-600";

  // OPTION 3: Warm Amber-Orange (Uncomment to use)
  // const headerGradient = "bg-gradient-to-r from-amber-600 to-orange-500";
  // const headerGradientHover = "from-amber-700 to-orange-600";
  // const backButtonColor = "text-amber-100 hover:text-white";
  // const accentColor = "text-amber-600 hover:text-amber-700";
  // const accentBorder = "border-amber-600";
  // const accentBgHover = "hover:bg-amber-50";
  // const accentButtonGradient = "from-amber-600 to-orange-500";
  // const accentButtonHover = "from-amber-700 to-orange-600";

  // OPTION 4: Sophisticated Indigo-Violet (Uncomment to use)
  // const headerGradient = "bg-gradient-to-r from-indigo-600 to-violet-500";
  // const headerGradientHover = "from-indigo-700 to-violet-600";
  // const backButtonColor = "text-indigo-100 hover:text-white";
  // const accentColor = "text-indigo-600 hover:text-indigo-700";
  // const accentBorder = "border-indigo-600";
  // const accentBgHover = "hover:bg-indigo-50";
  // const accentButtonGradient = "from-indigo-600 to-violet-500";
  // const accentButtonHover = "from-indigo-700 to-violet-600";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* UPDATED HEADING SECTION WITH ALTERNATIVE COLORS */}
      <div className={`${headerGradient} text-white`}>
        <div className="container mx-auto px-4 py-10 md:py-12">
          <div className="max-w-4xl mx-auto">
            {/* Back button */}
            <button
              onClick={() => navigate(-1)}
              className={`flex items-center gap-2 mb-4 ${backButtonColor} transition-colors group`}
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Shopping</span>
            </button>

            {/* Main heading */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Star className="w-7 h-7" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold">
                    My Wishlist ✨
                  </h1>
                  <div className="flex items-center gap-3 text-white/90 mt-2">
                    <Package className="w-4 h-4" />
                    <p>
                      {wishlist.length}{" "}
                      {wishlist.length === 1 ? "item" : "items"} saved
                    </p>
                    <span className="text-white/50">•</span>
                    <Percent className="w-4 h-4" />
                    <p>{Object.keys(selectedAlert).length} alerts set</p>
                  </div>
                </div>
              </div>

              {/* Stats and info */}
              <div className="flex flex-wrap gap-3">
                <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    Smart Alerts Active
                  </span>
                </div>
                <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-medium">Price Watcher</span>
                </div>
              </div>
            </div>

            {/* Subheading message */}
            <div className="mt-6 p-4 bg-white/15 backdrop-blur-sm rounded-xl border border-white/25">
              <div className="flex items-center gap-3">
                <Gift className="w-5 h-5" />
                <p className="text-sm">
                  <span className="font-medium">Never miss a deal!</span> Set
                  discount alerts and we'll notify you instantly when prices
                  drop on your favorite items.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        {/* Wishlist Items */}
        <div className="grid gap-4 -mt-8">
          {wishlist.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow p-6"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Product Image */}
                <div className="md:w-32 md:h-32 w-full h-48 flex-shrink-0 relative">
                  <img
                    src={
                      product.images?.[0]
                        ? `${API_URL}/${product.images[0]}`
                        : "/placeholder.jpg"
                    }
                    alt={product.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  {/* Wishlist badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2
                        className={`text-lg font-semibold text-gray-900 ${accentColor} cursor-pointer transition-colors`}
                        onClick={() => navigate(`/products/${product._id}`)}
                      >
                        {product.name}
                      </h2>

                      {/* Discount Badge */}
                      {product.discount > 0 ? (
                        <div className="flex items-center gap-2 mt-2">
                          <TrendingDown className="w-4 h-4 text-green-500" />
                          <span className="px-3 py-1 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 text-sm font-medium rounded-full border border-green-100">
                            {product.discount}% OFF • Save Big!
                          </span>
                        </div>
                      ) : (
                        <div className="mt-2">
                          <span className="text-sm text-gray-500">
                            No current discount • Set an alert below
                          </span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() =>
                        handleRemoveWithToast(product._id, product.name)
                      }
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Alert Settings */}
                  <div className="mt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Bell className="w-5 h-5 text-pink-500" />
                      <span className="text-sm font-medium text-gray-700">
                        Set Price Drop Alert
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="flex-1">
                        <div className="relative">
                          <select
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all appearance-none"
                            value={selectedAlert[product._id] || ""}
                            onChange={(e) =>
                              setSelectedAlert({
                                ...selectedAlert,
                                [product._id]: Number(e.target.value),
                              })
                            }
                          >
                            <option value="">Select discount threshold</option>
                            <option value="10">Notify at 10% off</option>
                            <option value="20">Notify at 20% off</option>
                            <option value="30">Notify at 30% off</option>
                            <option value="40">Notify at 40% off</option>
                            <option value="50">
                              Notify at 50% off or more
                            </option>
                          </select>
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            <AlertCircle className="w-5 h-5 text-gray-400" />
                          </div>
                        </div>
                      </div>

                      <button
                        className={`px-6 py-3 bg-gradient-to-r ${accentButtonGradient} hover:${accentButtonHover} text-white font-medium rounded-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-lg flex items-center gap-2`}
                        onClick={() =>
                          handleAlertWithToast(product._id, product.name)
                        }
                      >
                        <Bell className="w-4 h-4" />
                        Set Alert
                      </button>
                    </div>

                    {/* Current Alert Status */}
                    {selectedAlert[product._id] && (
                      <div className="mt-3 px-4 py-2 bg-purple-50 border border-purple-100 rounded-lg">
                        <p className="text-sm text-purple-700">
                          <span className="font-medium">🎯 Active alert:</span>{" "}
                          You'll be notified when this product reaches{" "}
                          {selectedAlert[product._id]}% discount
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <button
              onClick={() => navigate("/productcard")}
              className={`px-6 py-3 ${accentBorder} ${accentColor} font-medium rounded-lg ${accentBgHover} transition-colors border-2`}
            >
              Continue Shopping
            </button>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  toast.info(
                    `Shared your wishlist with ${wishlist.length} items`,
                    {
                      position: "top-center",
                      autoClose: 3000,
                    }
                  );
                }}
                className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                Share Wishlist
              </button>

              <button
                onClick={() => {
                  const hasAlerts = Object.keys(selectedAlert).length > 0;
                  toast.info(
                    hasAlerts
                      ? `You have ${
                          Object.keys(selectedAlert).length
                        } active price alerts`
                      : "No active alerts yet",
                    {
                      position: "top-center",
                      autoClose: 3000,
                    }
                  );
                }}
                className={`px-6 py-3 bg-gradient-to-r ${accentButtonGradient} hover:${accentButtonHover} text-white font-medium rounded-lg transition-all transform hover:-translate-y-0.5 shadow-md`}
              >
                View All Alerts
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
