import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../components/layout/DashboardLayout";
import {
  Package,
  Users,
  Tag,
  TrendingUp,
  Eye,
  ShoppingCart,
  RefreshCw,
} from "lucide-react";

const Dashboard = () => {
  const [counts, setCounts] = useState({
    totalProducts: 0,
    totalSellers: 0,
    totalCategories: 0,
    totalCustomers: 0,
    totalOrders: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 30000); // Refresh every 30 seconds

    // Set last updated time
    const now = new Date();
    setLastUpdated(
      now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );

    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = () => {
    axios
      .get("http://localhost:5000/api/dashboard/counts")
      .then((res) => {
        setCounts({
          ...res.data,
          totalCustomers: res.data.totalCustomers || 0,
          totalOrders: res.data.totalOrders || 0,
          revenue: res.data.revenue || 0,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const statsCards = [
    {
      title: "Total Products",
      value: counts.totalProducts,
      icon: <Package className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-400",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
      change: "+12%",
      trend: "up",
    },
    {
      title: "Active Sellers",
      value: counts.totalSellers,
      icon: <Users className="w-6 h-6" />,
      color: "from-emerald-500 to-green-400",
      bgColor: "bg-gradient-to-br from-emerald-50 to-green-50",
      change: "+8%",
      trend: "up",
    },
    {
      title: "Categories",
      value: counts.totalCategories,
      icon: <Tag className="w-6 h-6" />,
      color: "from-purple-500 to-pink-400",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
      change: "+3%",
      trend: "up",
    },
  ];

  const recentActivities = [
    {
      user: "John Doe",
      action: "added new product",
      time: "5 min ago",
      type: "product",
    },
    {
      user: "Sarah Smith",
      action: "updated profile",
      time: "12 min ago",
      type: "user",
    },
    {
      user: "Mike Johnson",
      action: "placed new order",
      time: "25 min ago",
      type: "order",
    },
    {
      user: "Emma Wilson",
      action: "became a seller",
      time: "1 hour ago",
      type: "seller",
    },
  ];

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Dashboard Overview
            </h1>
            <p className="text-gray-600 mt-2">
              Welcome to your ContextFit admin panel
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">
              Last updated: {lastUpdated}
            </span>
            <button
              onClick={fetchDashboardData}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              title="Refresh data"
            >
              <RefreshCw
                className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((stat, index) => (
          <div
            key={index}
            className={`${stat.bgColor} rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300`}
          >
            <div className="flex justify-between items-start mb-4">
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
              >
                <div className="text-white">{stat.icon}</div>
              </div>
              <div
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  stat.trend === "up"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {stat.change}
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">
              {loading ? (
                <div className="h-8 w-16 bg-gray-200 animate-pulse rounded"></div>
              ) : (
                stat.value.toLocaleString()
              )}
            </h3>
            <p className="text-gray-600 text-sm">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-100 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Platform Status
            </h3>
            <p className="text-gray-600">
              All systems operational • 99.8% uptime
            </p>
          </div>
          <div className="flex gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">24/7</div>
              <div className="text-sm text-gray-600">Support</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">99.9%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">4.8</div>
              <div className="text-sm text-gray-600">Avg. Rating</div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
