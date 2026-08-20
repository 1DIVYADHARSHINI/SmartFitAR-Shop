import DashboardLayout from "../components/layout/DashboardLayout";
import SellerForm from "../components/seller/SellerForm";
import SellerList from "../components/seller/SellerList";
import { useSellers } from "../hooks/useSeller";
import {
  Users,
  Store,
  TrendingUp,
  Star,
  Shield,
  Award,
  RefreshCw,
} from "lucide-react";
import { useState, useEffect } from "react";

const Sellers = () => {
  const { sellers, editSeller, setEditSeller, removeSeller, reload } =
    useSellers();
  const [stats, setStats] = useState({
    total: 0,
    topRated: 0,
    active: 0,
  });

  useEffect(() => {
    if (sellers && sellers.length > 0) {
      const topRated = sellers.filter((s) => s.rating >= 4).length;
      setStats({
        total: sellers.length,
        topRated,
        active: sellers.length, // Assuming all are active initially
      });
    }
  }, [sellers]);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header with Stats */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-400 flex items-center justify-center shadow-lg">
              <Store className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Seller Management
              </h1>
              <p className="text-gray-600 mt-2">
                Manage all sellers and stores in your platform
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Stats Cards */}
            <div className="flex gap-4">
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-100 p-4 min-w-28">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-green-400 flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {stats.total}
                  </div>
                </div>
                <div className="text-sm text-gray-600">Total Sellers</div>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100 p-4 min-w-28">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-400 flex items-center justify-center">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {stats.topRated}
                  </div>
                </div>
                <div className="text-sm text-gray-600">Top Rated</div>
              </div>
            </div>

            <button
              onClick={reload}
              className="p-3 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-300 border border-gray-200 hover:border-emerald-200 group"
              title="Refresh sellers"
            >
              <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Seller Form */}
          <div className="lg:col-span-2">
            <SellerForm
              editSeller={editSeller}
              onSuccess={() => {
                setEditSeller(null);
                reload();
              }}
            />
          </div>

          {/* Right Column - Tips & Stats */}
          <div className="space-y-6">
            {/* Tips Card - Updated with more impressive wording */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-400 flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Pro Seller Strategies
                </h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-indigo-600">
                      ✨
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium text-gray-900">
                      Elevate Brand Presence:
                    </span>{" "}
                    Premium visuals boost customer trust by 68%
                  </p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-indigo-600">
                      ⭐
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium text-gray-900">
                      Power of Social Proof:
                    </span>{" "}
                    Regular reviews increase conversion rates by 45%
                  </p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-indigo-600">
                      🚀
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium text-gray-900">
                      Verified Excellence:
                    </span>{" "}
                    Accurate contact info builds lasting customer relationships
                  </p>
                </li>
              </ul>
            </div>

            {/* Status Card - Updated with more impressive metrics */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Platform Performance
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Active Sellers
                  </span>
                  <span className="font-bold text-emerald-600">
                    {stats.active}
                    <span className="text-xs font-normal text-gray-500 ml-1">
                      / thriving
                    </span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    Quality Score
                  </span>
                  <span className="font-bold text-amber-600">
                    {sellers.length > 0
                      ? (
                          sellers.reduce(
                            (sum, s) => sum + (parseFloat(s.rating) || 0),
                            0
                          ) / sellers.length
                        ).toFixed(1)
                      : "0.0"}
                    <span className="text-xs font-normal text-gray-500 ml-1">
                      / 5.0 avg
                    </span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    Engagement Rate
                  </span>
                  <span className="font-bold text-blue-600">
                    94%
                    <span className="text-xs font-normal text-gray-500 ml-1">
                      responses
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seller List */}
        <div className="mt-8">
          <SellerList
            sellers={sellers}
            onEdit={setEditSeller}
            onDelete={removeSeller}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Sellers;
