import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import API_URL from "@/config/api";
import {
  ArrowLeft,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Home,
  ShoppingCart,
  Heart,
  Share2,
  Tag,
  Sparkles,
  Package,
  ArrowRight,
} from "lucide-react";

const CartPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const addedProduct = location.state?.product;

  const { cart, handleRemove, subtotal, updateQuantity } =
    useCart(addedProduct);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full flex items-center justify-center">
            <ShoppingCart className="w-10 h-10 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Your Cart is Empty
          </h2>
          <p className="text-gray-600 mb-6 text-sm">
            Looks like you haven't added any products to your cart yet. Start
            shopping to discover amazing products!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate("/")}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
            >
              <Home className="w-4 h-4" />
              Go to Home
            </button>
            <button
              onClick={() => navigate("/productcard")}
              className="px-5 py-2.5 bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              Shop Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header - More Compact */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h1 className="text-xl font-bold">Shopping Cart</h1>
                <p className="text-blue-100 text-sm">
                  {itemCount} {itemCount === 1 ? "item" : "items"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/")}
                className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all flex items-center gap-1.5 text-sm"
              >
                <Home className="w-3.5 h-3.5" />
                Home
              </button>
              <button
                onClick={() => navigate("/productcard")}
                className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all flex items-center gap-1.5 text-sm"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                Shop
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Cart Items Section - More Compact */}
        <div className="space-y-4">
          {/* Cart Header - Smaller */}
          <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-gradient-to-r from-blue-100 to-cyan-100">
                  <ShoppingCart className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-gray-900">
                    Your Items
                  </h2>
                  <p className="text-xs text-gray-600">
                    {itemCount} {itemCount === 1 ? "product" : "products"} in
                    cart
                  </p>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                Subtotal:{" "}
                <span className="font-bold text-gray-900">
                  ₹{subtotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Cart Items List - More Compact */}
          <div className="space-y-3">
            {cart.map((product) => {
              const discountedPrice =
                product.discount > 0
                  ? product.price - (product.price * product.discount) / 100
                  : product.price;
              const totalPrice = discountedPrice * product.quantity;

              return (
                <div
                  key={product._id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200"
                >
                  <div className="flex">
                    {/* Product Image - Smaller */}
                    <div className="w-1/4 min-w-[100px] relative group">
                      <div className="relative h-32 overflow-hidden">
                        <img
                          src={
                            product.images?.[0]
                              ? `${API_URL}/${product.images[0]}`
                              : "/placeholder.jpg"
                          }
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {product.discount > 0 && (
                          <div className="absolute top-2 left-2">
                            <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full shadow">
                              -{product.discount}%
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Product Details - More Compact */}
                    <div className="flex-1 p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1 pr-2">
                          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
                            {product.name}
                          </h3>
                          <p className="text-xs text-gray-600 mt-0.5 flex items-center gap-1">
                            <Tag className="w-3 h-3" />
                            {product.category}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemove(product._id)}
                          className="p-1 rounded-full hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                        </button>
                      </div>

                      {/* Pricing - Compact */}
                      <div className="mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-base font-bold text-gray-900">
                            ₹{discountedPrice.toFixed(2)}
                          </span>
                          {product.discount > 0 && (
                            <>
                              <span className="text-sm text-gray-400 line-through">
                                ₹{product.price.toFixed(2)}
                              </span>
                              <span className="px-1.5 py-0.5 bg-green-100 text-green-600 text-xs font-bold rounded">
                                Save ₹
                                {(product.price - discountedPrice).toFixed(2)}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Quantity Controls - Compact */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-gray-700">
                            Qty:
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  product._id,
                                  Math.max(1, product.quantity - 1)
                                )
                              }
                              className="p-1.5 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 py-0.5 bg-gray-50 rounded-md font-bold text-sm min-w-[40px] text-center">
                              {product.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  product._id,
                                  product.quantity + 1
                                )
                              }
                              className="p-1.5 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-600">Total</p>
                          <p className="text-sm font-bold text-gray-900">
                            ₹{totalPrice.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      {/* Additional Actions - Smaller */}
                      <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
                        <button
                          onClick={() =>
                            navigate("/wishlist", { state: { product } })
                          }
                          className="px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors flex items-center gap-1 text-xs"
                        >
                          <Heart className="w-3 h-3" />
                          Save
                        </button>
                        <button className="px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors flex items-center gap-1 text-xs">
                          <Share2 className="w-3 h-3" />
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Total Section - More Compact */}
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-gradient-to-r from-green-100 to-emerald-100">
                  <Package className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-gray-900">
                    Order Summary
                  </h2>
                  <p className="text-xs text-gray-600">
                    Subtotal for {itemCount} items
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">
                  ₹{subtotal.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500">
                  + Taxes & shipping calculated at checkout
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
             
              <button
                onClick={() => navigate("/productcard")}
                className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                Continue Shopping
              </button>
            </div>

            {/* Shipping Note */}
            <div className="mt-4 p-2 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-xs text-blue-700 text-center">
                🚚 Free shipping on orders above ₹999 • 🔄 30-day returns
              </p>
            </div>
          </div>
        </div>

        {/* Continue Shopping Section - Smaller */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 text-xs font-semibold mb-3 border border-blue-100">
            <Sparkles className="w-3 h-3" />
            DISCOVER MORE
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Continue Shopping
          </h3>
          <p className="text-gray-600 text-sm max-w-xl mx-auto mb-6">
            Explore more products that match your style
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate("/")}
              className="px-5 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </button>
            <button
              onClick={() => navigate("/products")}
              className="px-5 py-2 bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              View All Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
