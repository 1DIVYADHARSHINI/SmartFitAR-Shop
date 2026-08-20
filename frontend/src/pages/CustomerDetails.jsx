import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useCustomerDetails } from "@/hooks/useCustomerDetails";
import {
  ShoppingBag,
  Heart,
  User,
  Mail,
  Phone,
  MapPin,
  Package,
  Tag,
  CreditCard,
  Calendar,
  Store,
  Users,
  Trash2,
  X,
  Truck,
  Shield,
  Award,
  FileText,
  Wallet,
  TrendingUp,
  Star,
  Clock,
  CheckCircle,
  ShoppingCart,
  Sparkles,
  ChevronRight,
  BadgeCheck,
  Layers,
  Globe,
  Zap,
  Target,
  Gem,
  Crown,
  Gift,
  Coins,
  TrendingDown,
  ShoppingBasket,
  Trophy,
  Bell,
  Eye,
  MessageSquare,
  MailOpen,
  StarHalf,
} from "lucide-react";

const CustomerDetails = () => {
  const { orders, followers, handleRemoveOrder, handleRemoveFollower } =
    useCustomerDetails();

  if (orders.length === 0 && followers.length === 0) {
    return (
      <DashboardLayout>
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 bg-gradient-to-br from-emerald-50 via-cyan-50 to-rose-50">
          <div className="relative mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-teal-200 to-cyan-300 rounded-full flex items-center justify-center animate-pulse">
              <ShoppingCart className="w-16 h-16 text-emerald-600" />
            </div>
            <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full flex items-center justify-center animate-bounce">
              <Gem className="w-6 h-6 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">
            Discover Your Shopping World
          </h2>
          <p className="text-gray-700 text-center max-w-md mb-8">
            Your personalized dashboard awaits! Start your journey with amazing
            products and connect with premium sellers.
          </p>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              Start Shopping
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center">
              <Crown className="w-5 h-5 mr-2" />
              Premium Stores
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const totalSpent = orders.reduce(
    (sum, order) => sum + parseInt(order.product.total),
    0
  );
  const averageOrderValue =
    orders.length > 0 ? Math.round(totalSpent / orders.length) : 0;

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-amber-50 to-rose-50 p-4 md:p-6">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  <span className="bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                    My Shopping Hub
                  </span>
                </h1>
                <p className="text-gray-700 max-w-2xl">
                  Your complete shopping ecosystem - Orders, favorites, and
                  premium stores in one place
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold flex items-center shadow-lg">
                  <Layers className="w-5 h-5 mr-2" />
                  {orders.length} Active
                </div>
                <div className="px-5 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-xl font-bold flex items-center shadow-lg">
                  <Trophy className="w-5 h-5 mr-2" />
                  {followers.length} Elite
                </div>
              </div>
            </div>

            {/* Stats Overview - New Color Combo */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-gradient-to-br from-cyan-50 to-blue-100 rounded-2xl p-5 shadow-lg border border-cyan-200 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-cyan-700 font-medium">
                      Total Investment
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      ₹{totalSpent}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                    <Coins className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="mt-3 flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-emerald-500 mr-1" />
                  <span className="text-emerald-600 font-medium">
                    +12% growth
                  </span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-100 rounded-2xl p-5 shadow-lg border border-emerald-200 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-emerald-700 font-medium">
                      Active Orders
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {orders.length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md">
                    <ShoppingBasket className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="mt-3 flex items-center text-sm">
                  <Target className="w-4 h-4 text-blue-500 mr-1" />
                  <span className="text-blue-600 font-medium">On track</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-violet-50 to-purple-100 rounded-2xl p-5 shadow-lg border border-violet-200 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-violet-700 font-medium">
                      Premium Stores
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {followers.length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="mt-3 flex items-center text-sm">
                  <StarHalf className="w-4 h-4 text-amber-500 mr-1" />
                  <span className="text-amber-600 font-medium">Top rated</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl p-5 shadow-lg border border-amber-200 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-amber-700 font-medium">
                      Avg. Order Value
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      ₹{averageOrderValue}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="mt-3 flex items-center text-sm">
                  <Sparkles className="w-4 h-4 text-rose-500 mr-1" />
                  <span className="text-rose-600 font-medium">
                    Premium buyer
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Orders Section - New Color Theme */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 mb-6 shadow-lg border border-blue-200">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                      <Package className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Purchase History
                      </h2>
                      <p className="text-gray-600">
                        Your complete order timeline
                      </p>
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg shadow-sm">
                    <span className="text-sm font-semibold text-blue-700">
                      {orders.length} Active
                    </span>
                  </div>
                </div>

                {orders.map((order, idx) => (
                  <div key={idx} className="mb-6 last:mb-0">
                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200">
                      {/* Order Header */}
                      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 px-6 py-4 relative">
                        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-cyan-400 to-blue-500"></div>
                        <div className="flex justify-between items-center ml-2">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mr-3">
                              <Bell className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-white">
                                Order #{idx + 1}
                              </h3>
                              <p className="text-indigo-200 text-sm flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {order.orderDate}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemoveOrder(idx)}
                            className="p-2 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 rounded-lg transition-colors group"
                            title="Archive Order"
                          >
                            <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                          </button>
                        </div>
                      </div>

                      <div className="p-6 space-y-6">
                        {/* Customer Info */}
                        <div className="bg-gradient-to-r from-gray-50 to-cyan-50 rounded-xl p-4 border border-cyan-100">
                          <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                            <Eye className="w-5 h-5 text-cyan-600 mr-2" />
                            Customer Profile
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <div className="flex items-center">
                                <MailOpen className="w-4 h-4 text-gray-500 mr-2" />
                                <span className="text-gray-700">
                                  {order.customer.email}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <Phone className="w-4 h-4 text-gray-500 mr-2" />
                                <span className="text-gray-700">
                                  {order.customer.phone}
                                </span>
                              </div>
                            </div>
                            <div className="md:col-span-2 flex items-start mt-3">
                              <Globe className="w-4 h-4 text-gray-500 mr-2 mt-1 flex-shrink-0" />
                              <span className="text-gray-700">
                                {order.customer.address}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="border border-gray-200 rounded-xl p-4 bg-gradient-to-br from-white to-amber-50">
                          <div className="flex items-center mb-4">
                            <Gift className="w-5 h-5 text-amber-600 mr-3" />
                            <h4 className="font-semibold text-gray-800">
                              Product Details
                            </h4>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-shrink-0">
                              <div className="relative">
                                <img
                                  src={
                                    order.product.image
                                      ? `http://localhost:5000/${order.product.image}`
                                      : "/placeholder.jpg"
                                  }
                                  alt={order.product.name}
                                  className="w-28 h-28 object-cover rounded-xl border-4 border-white shadow-lg"
                                />
                                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                                  HOT
                                </div>
                              </div>
                            </div>
                            <div className="flex-1">
                              <h5 className="font-bold text-gray-800 text-xl mb-2">
                                {order.product.name}
                              </h5>
                              <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="flex items-center">
                                  <Tag className="w-4 h-4 text-emerald-500 mr-2" />
                                  <div>
                                    <p className="text-xs text-gray-500">
                                      Unit Price
                                    </p>
                                    <p className="font-bold text-gray-800">
                                      ₹{order.product.price}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center">
                                  <Layers className="w-4 h-4 text-blue-500 mr-2" />
                                  <div>
                                    <p className="text-xs text-gray-500">
                                      Quantity
                                    </p>
                                    <p className="font-bold text-gray-800">
                                      {order.product.quantity}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-gradient-to-r from-cyan-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                                <div className="flex justify-between items-center">
                                  <span className="font-bold text-gray-800 text-lg">
                                    Final Amount
                                  </span>
                                  <span className="text-2xl font-bold text-cyan-600">
                                    ₹{order.product.total}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Payment Info */}
                        <div className="bg-gradient-to-r from-emerald-50 to-teal-100 rounded-xl p-4 border border-emerald-200">
                          <div className="flex items-center mb-4">
                            <Zap className="w-5 h-5 text-emerald-600 mr-3" />
                            <h4 className="font-semibold text-gray-800">
                              Payment & Security
                            </h4>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center">
                              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mr-4 shadow-md">
                                <CreditCard className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">
                                  Payment Method
                                </p>
                                <p className="font-bold text-gray-800">
                                  {order.paymentMethod}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center">
                              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4 shadow-md">
                                <Calendar className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">
                                  Transaction Date
                                </p>
                                <p className="font-bold text-gray-800">
                                  {order.orderDate}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-emerald-200">
                            <div className="flex items-center text-sm bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-full shadow-sm">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              <span>Payment Successful</span>
                            </div>
                            <div className="flex items-center text-sm bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full shadow-sm">
                              <Truck className="w-4 h-4 mr-2" />
                              <span>Dispatch Ready</span>
                            </div>
                            <div className="flex items-center text-sm bg-gradient-to-r from-violet-500 to-purple-600 text-white px-4 py-2 rounded-full shadow-sm">
                              <Shield className="w-4 h-4 mr-2" />
                              <span>SSL Protected</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Followed Sellers Sidebar - New Design */}
            <div>
              <div className="sticky top-6">
                <div className="bg-gradient-to-br from-white to-violet-50 rounded-2xl shadow-xl border border-violet-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-violet-600 to-purple-700 px-6 py-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mr-3">
                          <Trophy className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-white">
                            Store Followers
                          </h2>
                          <p className="text-violet-100 text-sm">
                            Your premium sellers
                          </p>
                        </div>
                      </div>
                      <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                        <span className="font-bold text-white">
                          {followers.length}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    {followers.length === 0 ? (
                      <div className="text-center py-8">
                        <div className="w-20 h-20 bg-gradient-to-br from-violet-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Store className="w-10 h-10 text-violet-400" />
                        </div>
                        <p className="text-gray-500 mb-3">
                          No premium stores followed
                        </p>
                        <button className="px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-lg text-sm font-semibold shadow-md">
                          Discover Elite
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                        {followers.map((item, index) => (
                          <div
                            key={index}
                            className="group bg-gradient-to-br from-white to-pink-50 rounded-xl p-4 border border-pink-100 hover:border-purple-300 hover:shadow-lg transition-all"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-3">
                                <div className="relative">
                                  <div className="w-12 h-12 bg-gradient-to-br from-pink-200 to-rose-200 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                                    <Crown className="w-6 h-6 text-rose-600" />
                                  </div>
                                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-sm">
                                    <Star className="w-3 h-3 text-white" />
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-bold text-gray-800 group-hover:text-violet-600 transition-colors">
                                    {item.sellerStore}
                                  </h4>
                                  <div className="space-y-1 mt-2">
                                    <div className="flex items-center text-sm">
                                      <User className="w-3 h-3 text-gray-500 mr-2" />
                                      <span className="text-gray-700">
                                        {item.userName}
                                      </span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                      <MessageSquare className="w-3 h-3 text-gray-500 mr-2" />
                                      <span className="text-gray-700 truncate max-w-[150px]">
                                        {item.userEmail}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={() =>
                                  handleRemoveFollower(item.sellerId)
                                }
                                className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                                title="Remove Store"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </div>
                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-pink-100">
                              <span className="text-xs bg-gradient-to-r from-pink-100 to-rose-100 text-rose-700 px-2 py-1 rounded-full font-medium">
                                Verified Elite
                              </span>
                              <button className="text-xs text-violet-600 hover:text-violet-800 flex items-center">
                                Shop Now{" "}
                                <ChevronRight className="w-3 h-3 ml-1" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Insights */}
                <div className="mt-6 bg-gradient-to-br from-white to-emerald-50 rounded-2xl shadow-lg border border-emerald-200 p-5">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                    <Target className="w-5 h-5 text-emerald-600 mr-2" />
                    Shopping Insights
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Total Purchases</span>
                      <span className="font-bold text-cyan-600">
                        {orders.length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Total Investment</span>
                      <span className="font-bold text-emerald-600">
                        ₹{totalSpent}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Premium Stores</span>
                      <span className="font-bold text-violet-600">
                        {followers.length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Avg. Order Value</span>
                      <span className="font-bold text-amber-600">
                        ₹{averageOrderValue}
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-emerald-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">
                        Shopping Score
                      </span>
                      <span className="text-sm font-bold text-emerald-600">
                        8.5/10
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full w-4/5"></div>
                    </div>
                    <div className="text-center mt-4">
                      <button className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center">
                        <Zap className="w-5 h-5 mr-2" />
                        View Insights Dashboard
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Security Banner */}
          <div className="mt-12 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mr-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">
                    Enterprise-Grade Security
                  </h4>
                  <p className="text-gray-300">
                    All transactions protected with 256-bit encryption
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg">
                  <span className="text-white text-sm">24/7 Monitoring</span>
                </div>
                <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg">
                  <span className="text-white text-sm">PCI DSS Compliant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomerDetails;
