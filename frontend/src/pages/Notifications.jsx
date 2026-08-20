import React, { useEffect, useState } from "react";
import {
  Bell,
  Trash2,
  CheckCircle,
  Tag,
  TrendingDown,
  Star,
  Clock,
  ShoppingBag,
  User,
  Sparkles,
  Filter,
  EyeOff,
  CheckCheck,
  BellOff,
  AlertCircle,
} from "lucide-react";
import { toast } from "react-toastify";

const Notifications = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all"); // all, unread, deals, price
  const [isClearing, setIsClearing] = useState(false);

  useEffect(() => {
    const allNotifications =
      JSON.parse(localStorage.getItem("notifications")) || [];

    setNotifications(allNotifications);

    // Listen for localStorage changes (cross-tab)
    const handleStorageChange = (e) => {
      if (e.key === "notifications") {
        const updated = JSON.parse(e.newValue) || [];
        setNotifications(updated);
      }
    };

    // Listen for same-tab updates
    const handleNotificationsUpdate = () => {
      const updated = JSON.parse(localStorage.getItem("notifications")) || [];
      setNotifications(updated);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("notificationsUpdated", handleNotificationsUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(
        "notificationsUpdated",
        handleNotificationsUpdate
      );
    };
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
            <AlertCircle className="w-10 h-10 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Please Login
          </h2>
          <p className="text-gray-600 mb-8">
            Sign in to view your notifications and stay updated with price drops
            and deals.
          </p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all transform hover:-translate-y-1 shadow-md"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const userNotifications = notifications.filter(
    (n) => n.userEmail === user.email
  );

  // Filter notifications based on selected filter
  const filteredNotifications = userNotifications.filter((notification) => {
    if (filter === "all") return true;
    if (filter === "unread") return !notification.read;
    if (filter === "deals")
      return notification.type === "deal" || notification.type === "price_drop";
    if (filter === "price") return notification.type === "price_drop";
    return true;
  });

  // Remove notification
  const handleRemove = (id) => {
    const updatedNotifications = notifications.filter((n) => n.id !== id);
    setNotifications(updatedNotifications);
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));

    toast.success("Notification removed", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  // Mark as read
  const handleMarkAsRead = (id) => {
    const updatedNotifications = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updatedNotifications);
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));

    toast.info("Marked as read", {
      position: "top-right",
      autoClose: 1500,
    });
  };

  // Mark all as read
  const handleMarkAllAsRead = () => {
    const updatedNotifications = notifications.map((n) =>
      n.userEmail === user.email ? { ...n, read: true } : n
    );
    setNotifications(updatedNotifications);
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));

    toast.success("All notifications marked as read", {
      position: "top-center",
      autoClose: 2500,
    });
  };

  // Clear all notifications
  const handleClearAll = () => {
    setIsClearing(true);

    setTimeout(() => {
      const remaining = notifications.filter((n) => n.userEmail !== user.email);

      localStorage.setItem("notifications", JSON.stringify(remaining));
      setNotifications(remaining);

      // 🔥 IMPORTANT: notify app that storage changed
      window.dispatchEvent(new CustomEvent("notificationsUpdated"));

      toast.warning("All notifications cleared", {
        position: "top-center",
        autoClose: 3000,
      });

      setIsClearing(false);
    }, 300);
  };

  // Get notification icon
  const getNotificationIcon = (type, icon) => {
    switch (icon || type) {
      case "trending":
      case "price_drop":
        return <TrendingDown className="w-5 h-5" />;
      case "deal":
        return <Tag className="w-5 h-5" />;
      case "new":
      case "new_product":
        return <Sparkles className="w-5 h-5" />;
      case "stock":
        return <ShoppingBag className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  // Get notification color
  const getNotificationColor = (type) => {
    switch (type) {
      case "price_drop":
        return "from-green-500 to-emerald-400";
      case "deal":
        return "from-amber-500 to-orange-400";
      case "new_product":
        return "from-purple-500 to-pink-400";
      case "stock":
        return "from-blue-500 to-cyan-400";
      default:
        return "from-gray-500 to-gray-400";
    }
  };

  // Get time ago
  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diff = now - past;

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  // Get unread count
  const unreadCount = userNotifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-500 text-white">
        <div className="container mx-auto px-4 py-8 md:py-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Bell className="w-7 h-7" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold">
                    Notifications
                  </h1>
                  <div className="flex items-center gap-3 text-white/90 mt-2">
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      {userNotifications.length} total
                    </span>
                    {unreadCount > 0 && (
                      <>
                        <span className="text-white/50">•</span>
                        <span className="px-2 py-1 bg-white/20 rounded-full text-sm">
                          {unreadCount} unread
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleMarkAllAsRead}
                  className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all flex items-center gap-2"
                  disabled={unreadCount === 0}
                >
                  <CheckCheck className="w-4 h-4" />
                  <span className="text-sm font-medium">Mark All Read</span>
                </button>
                <button
                  onClick={handleClearAll}
                  className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all flex items-center gap-2"
                  disabled={userNotifications.length === 0}
                >
                  <BellOff className="w-4 h-4" />
                  <span className="text-sm font-medium">Clear All</span>
                </button>
              </div>
            </div>

            {/* Filter tabs */}
            <div className="mt-8 flex flex-wrap gap-2">
              {[
                { id: "all", label: "All", icon: Bell },
                { id: "unread", label: "Unread", icon: EyeOff },
                { id: "deals", label: "Deals", icon: Tag },
                { id: "price", label: "Price Drops", icon: TrendingDown },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all ${
                    filter === tab.id
                      ? "bg-white text-indigo-600 shadow-lg"
                      : "bg-white/20 hover:bg-white/30"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Notifications Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Empty State */}
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <Bell className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {filter === "all"
                  ? "No notifications yet"
                  : `No ${filter} notifications`}
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                {filter === "all"
                  ? "When you receive notifications about price drops, new products, or deals, they'll appear here."
                  : `No ${filter} notifications at the moment. Check back later!`}
              </p>
              {filter !== "all" && (
                <button
                  onClick={() => setFilter("all")}
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  View All Notifications
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`bg-white rounded-xl shadow-sm border transition-all duration-300 hover:shadow-md ${
                    notification.read
                      ? "border-gray-200 opacity-90"
                      : "border-indigo-100 bg-gradient-to-r from-indigo-50/50 to-white"
                  }`}
                >
                  <div className="p-5">
                    <div className="flex gap-4">
                      {/* Notification Icon */}
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getNotificationColor(
                          notification.type
                        )} flex items-center justify-center flex-shrink-0`}
                      >
                        <div className="text-white">
                          {getNotificationIcon(
                            notification.type,
                            notification.icon
                          )}
                        </div>
                      </div>

                      {/* Notification Content */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <p
                              className={`font-medium ${
                                notification.read
                                  ? "text-gray-700"
                                  : "text-gray-900"
                              }`}
                            >
                              {notification.message}
                            </p>

                            {/* Extra info */}
                            {notification.discount && (
                              <div className="inline-flex items-center gap-1 mt-2 px-2 py-1 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 text-xs font-medium rounded border border-green-100">
                                <TrendingDown className="w-3 h-3" />
                                {notification.discount}% OFF
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-2 ml-4">
                            {/* Time */}
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Clock className="w-3 h-3" />
                              {getTimeAgo(notification.timestamp)}
                            </div>

                            {/* Unread dot */}
                            {!notification.read && (
                              <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                          {!notification.read && (
                            <button
                              onClick={() => handleMarkAsRead(notification.id)}
                              className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 transition-colors"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Mark as read
                            </button>
                          )}

                          <button
                            onClick={() => handleRemove(notification.id)}
                            className="text-sm text-red-600 hover:text-red-800 font-medium flex items-center gap-1 transition-colors ml-auto"
                          >
                            <Trash2 className="w-4 h-4" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Stats */}
          {userNotifications.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-gradient-to-br from-indigo-50 to-violet-50 rounded-xl border border-indigo-100">
                  <div className="text-2xl font-bold text-indigo-600">
                    {userNotifications.length}
                  </div>
                  <div className="text-sm text-gray-600">Total</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
                  <div className="text-2xl font-bold text-green-600">
                    {
                      userNotifications.filter((n) => n.type === "price_drop")
                        .length
                    }
                  </div>
                  <div className="text-sm text-gray-600">Price Drops</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100">
                  <div className="text-2xl font-bold text-amber-600">
                    {userNotifications.filter((n) => n.type === "deal").length}
                  </div>
                  <div className="text-sm text-gray-600">Deals</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                  <div className="text-2xl font-bold text-blue-600">
                    {unreadCount}
                  </div>
                  <div className="text-sm text-gray-600">Unread</div>
                </div>
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
            <button
              onClick={() => (window.location.href = "/products")}
              className="px-6 py-3 border-2 border-indigo-600 text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-colors"
            >
              Browse Products
            </button>
            <button
              onClick={() => (window.location.href = "/wishlist")}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-500 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-violet-600 transition-all transform hover:-translate-y-0.5 shadow-md"
            >
              Manage Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
