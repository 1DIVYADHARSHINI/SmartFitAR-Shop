import React from "react";
import { 
  Edit, 
  Trash2, 
  Eye, 
  Store, 
  Mail, 
  Phone, 
  MapPin, 
  Star, 
  Tag,
  User,
  Award,
  TrendingUp,
  CheckCircle,
  ExternalLink
} from "lucide-react";

const SellerList = ({ sellers = [], onEdit, onDelete }) => {
  if (!Array.isArray(sellers)) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-5 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-green-400 flex items-center justify-center">
              <Store className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Seller Directory</h2>
              <p className="text-sm text-gray-600">{sellers.length} registered sellers</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 bg-emerald-50 text-emerald-600 text-sm font-medium rounded-lg">
              {sellers.filter(s => s.rating >= 4).length} top rated
            </div>
            <div className="px-3 py-1.5 bg-amber-50 text-amber-600 text-sm font-medium rounded-lg">
              {sellers.length} active
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Seller</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Store</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Contact</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Location</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Rating</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Category</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller) => (
              <tr key={seller._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                {/* Seller Info */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center">
                      <User className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{seller.sellerName}</div>
                      <div className="text-xs text-gray-500">ID: {seller._id?.substring(0, 8)}...</div>
                    </div>
                  </div>
                </td>

                {/* Store */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Store className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-gray-900">{seller.storeName}</span>
                  </div>
                </td>

                {/* Contact */}
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3 h-3 text-gray-400" />
                      <span className="text-sm text-gray-700 truncate max-w-[150px]">{seller.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3 h-3 text-gray-400" />
                      <span className="text-sm text-gray-700">{seller.phone}</span>
                    </div>
                  </div>
                </td>

                {/* Location */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    <span className="text-gray-700">{seller.location || "Not specified"}</span>
                  </div>
                </td>

                {/* Rating */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Star className="w-4 h-4 text-amber-500" />
                      {parseFloat(seller.rating) >= 4 && (
                        <Award className="w-3 h-3 text-emerald-500 absolute -top-1 -right-1" />
                      )}
                    </div>
                    <span className="font-medium text-gray-900">{seller.rating || "0.0"}</span>
                    <span className="text-xs text-gray-500">/5</span>
                  </div>
                </td>

                {/* Category */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-purple-500" />
                    <span className="px-2 py-1 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-600 text-xs font-medium rounded-lg border border-purple-100">
                      {seller.category || "General"}
                    </span>
                  </div>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(seller)}
                      className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit seller"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => window.open(`/sellers/${seller._id}`, '_blank')}
                      className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
                      title="View details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(seller._id)}
                      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete seller"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {sellers.length === 0 && (
        <div className="py-16 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <Store className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Sellers Found</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Start adding sellers to your platform. Click "Add New Seller" to get started.
          </p>
        </div>
      )}

      {/* Footer */}
      {sellers.length > 0 && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Store className="w-4 h-4" />
                <span>Total: {sellers.length} sellers</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>Top rated: {sellers.filter(s => s.rating >= 4).length}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>Avg. rating: {
                sellers.length > 0 
                  ? (sellers.reduce((sum, s) => sum + (parseFloat(s.rating) || 0), 0) / sellers.length).toFixed(1)
                  : "0.0"
              }</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerList;