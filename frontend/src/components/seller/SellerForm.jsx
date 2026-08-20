import { useEffect, useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import { createSeller, updateSeller } from "@/api/seller.api";
import { fetchProductCategories } from "@/api/category.api";
import {
  User,
  Store,
  Mail,
  Phone,
  MapPin,
  Star,
  MessageSquare,
  Tag,
  Image,
  Upload,
  CheckCircle,
  Award,
  Building,
  Shield,
} from "lucide-react";

const SellerForm = ({ editSeller, onSuccess }) => {
  const [form, setForm] = useState({
    sellerName: "",
    storeName: "",
    email: "",
    phone: "",
    location: "",
    rating: "",
    review: "",
    category: "",
  });

  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load categories from backend
  useEffect(() => {
    fetchProductCategories()
      .then((res) => setCategories(res.data.categories || []))
      .catch((err) => console.error(err));
  }, []);

  // Load data when editing
  useEffect(() => {
    if (editSeller) {
      setForm({
        sellerName: editSeller.sellerName || "",
        storeName: editSeller.storeName || "",
        email: editSeller.email || "",
        phone: editSeller.phone || "",
        location: editSeller.location || "",
        rating: editSeller.rating || "",
        review: editSeller.review || "",
        category: editSeller.category || "",
      });
    }
  }, [editSeller]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => data.append(key, value));
      if (image) data.append("storeImage", image);

      if (editSeller) {
        await updateSeller(editSeller._id, data);
      } else {
        await createSeller(data);
      }

      onSuccess();

      // Reset form
      setForm({
        sellerName: "",
        storeName: "",
        email: "",
        phone: "",
        location: "",
        rating: "",
        review: "",
        category: "",
      });
      setImage(null);
    } catch (error) {
      console.error("Error saving seller:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
    >
      {/* Form Header */}
      <div className="bg-gradient-to-r from-emerald-50 to-green-50 px-6 py-5 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-green-400 flex items-center justify-center">
            {editSeller ? (
              <Building className="w-5 h-5 text-white" />
            ) : (
              <Store className="w-5 h-5 text-white" />
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {editSeller ? "Edit Seller" : "Add New Seller"}
            </h2>
            <p className="text-sm text-gray-600">
              {editSeller
                ? "Update seller details"
                : "Register a new seller to your platform"}
            </p>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6 space-y-6">
        {/* Seller Details Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <User className="w-5 h-5" />
              Basic Information
            </h3>

            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <User className="w-4 h-4" />
                  Seller Name *
                </label>
                <input
                  type="text"
                  value={form.sellerName}
                  onChange={(e) => handleChange("sellerName", e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                  placeholder="Enter seller full name"
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <Store className="w-4 h-4" />
                  Store Name *
                </label>
                <input
                  type="text"
                  value={form.storeName}
                  onChange={(e) => handleChange("storeName", e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                  placeholder="Enter store/brand name"
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <Mail className="w-4 h-4" />
                  Email Address *
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                  placeholder="seller@example.com"
                  required
                />
              </div>
            </div>
          </div>

          {/* Contact & Rating */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Contact & Rating
            </h3>

            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <Phone className="w-4 h-4" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                  placeholder="+1 234 567 8900"
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <MapPin className="w-4 h-4" />
                  Location
                </label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                  placeholder="City, Country"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <Star className="w-4 h-4" />
                  Rating (0-5)
                </label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={form.rating}
                  onChange={(e) => handleChange("rating", e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                  placeholder="4.5"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Category & Review */}
        <div className="space-y-6">
          {/* Category */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-900">
              <Tag className="w-4 h-4" />
              Product Category *
            </label>
            <select
              value={form.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Review */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-900">
              <MessageSquare className="w-4 h-4" />
              Seller Review
            </label>
            <textarea
              value={form.review}
              onChange={(e) => handleChange("review", e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all min-h-32"
              placeholder="Add a review or description about this seller..."
              rows="4"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="group px-8 py-3 bg-gradient-to-r from-emerald-500 to-green-400 hover:from-emerald-600 hover:to-green-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                {editSeller ? (
                  <>
                    <Award className="w-5 h-5" />
                    Update Seller
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Save Seller
                  </>
                )}
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default SellerForm;
