import React from "react";
import {
  Edit,
  Trash2,
  Eye,
  Box,
  DollarSign,
  Percent,
  Star,
  Image,
  Grid3x3,
  ExternalLink,
  Hash,
} from "lucide-react";
import API_URL from "@/config/api";

const ProductList = ({ products, onEdit, onDelete }) => {
  // Truncate long product names
  const truncateName = (name, maxLength = 60) => {
    if (name.length <= maxLength) return name;
    return name.substring(0, maxLength) + "...";
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-5 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
              <Box className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Product Inventory
              </h2>
              <p className="text-sm text-gray-600">
                {products.length}{" "}
                {products.length === 1 ? "product" : "products"} •
                <span className="text-green-600 font-medium ml-1">
                  {products.filter((p) => p.discount > 0).length} on sale
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <div className="px-3 py-1.5 bg-blue-50 text-blue-600 text-sm font-medium rounded-lg flex items-center gap-1">
                <Hash className="w-3 h-3" />
                {products.length}
              </div>
              <div className="px-3 py-1.5 bg-purple-50 text-purple-600 text-sm font-medium rounded-lg flex items-center gap-1">
                <Grid3x3 className="w-3 h-3" />
                {products.filter((p) => p.model3D).length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-3/12">
                Product
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-2/12">
                Price
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-1/12">
                Rating
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-2/12">
                Discount
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-2/12">
                3D Model
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-2/12">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <tr
                key={product._id}
                className="hover:bg-gray-50 transition-colors"
              >
                {/* Product Column - Optimized for long names */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Compact Image */}
                    <div className="flex-shrink-0 relative">
                      {product.images?.[0] ? (
                        <>
                          <img
                            src={`${API_URL}/${product.images[0]}`}
                            alt={product.name}
                            className="w-14 h-14 rounded-md object-cover border border-gray-200"
                          />
                          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                            <Image className="w-2 h-2 text-white" />
                          </div>
                        </>
                      ) : (
                        <div className="w-14 h-14 rounded-md bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <Box className="w-5 h-5 text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Product Name with Truncation */}
                    <div className="min-w-0 flex-1">
                      <div className="group relative">
                        <div className="font-medium text-gray-900 text-sm truncate pr-6 hover:text-blue-600 cursor-pointer transition-colors">
                          {truncateName(product.name, 70)}
                        </div>
                        {/* Full name tooltip on hover */}
                        {product.name.length > 70 && (
                          <div className="absolute left-0 top-full mt-1 hidden group-hover:block z-10">
                            <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 max-w-xs shadow-lg">
                              {product.name}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500 font-mono bg-gray-50 px-1.5 py-0.5 rounded">
                          ID: {product._id?.substring(0, 6)}...
                        </span>
                      </div>
                    </div>
                  </div>
                </td>

                {/* Price Column */}
                <td className="px-4 py-3">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                      <span className="font-semibold text-gray-900 text-sm">
                        ₹{Number(product.price).toLocaleString()}
                      </span>
                    </div>
                    {product.discount > 0 && (
                      <span className="text-xs text-gray-400 line-through">
                        ₹
                        {Math.round(
                          product.price / (1 - product.discount / 100)
                        ).toLocaleString()}
                      </span>
                    )}
                  </div>
                </td>

                {/* Rating Column */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      <span className="font-medium text-gray-900 text-sm">
                        {product.rate || "0.0"}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">/5</span>
                  </div>
                </td>

                {/* Discount Column */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {product.discount > 0 ? (
                      <>
                        <Percent className="w-4 h-4 text-red-500 flex-shrink-0" />
                        <span className="px-2.5 py-1 bg-gradient-to-r from-red-50 to-pink-50 text-red-700 text-xs font-semibold rounded-lg border border-red-100">
                          {product.discount}% OFF
                        </span>
                      </>
                    ) : (
                      <span className="text-gray-400 text-sm">—</span>
                    )}
                  </div>
                </td>

                {/* 3D Model Column */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {product.model3D ? (
                      <>
                        <Grid3x3 className="w-4 h-4 text-purple-600 flex-shrink-0" />
                        <span className="px-2.5 py-1 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 text-xs font-semibold rounded-lg border border-purple-100">
                          3D Ready
                        </span>
                      </>
                    ) : (
                      <>
                        <Grid3x3 className="w-4 h-4 text-gray-300 flex-shrink-0" />
                        <span className="text-gray-400 text-sm">—</span>
                      </>
                    )}
                  </div>
                </td>

                {/* Actions Column */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onEdit(product)}
                      className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit product"
                    >
                      <Edit className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onDelete(product._id)}
                      className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete product"
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
      {products.length === 0 && (
        <div className="py-16 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <Box className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Products Found
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Your product inventory is empty. Add your first product to get
            started.
          </p>
        </div>
      )}

      {/* Footer */}
      {products.length > 0 && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Box className="w-4 h-4" />
                <span>{products.length} total products</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
                <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                <span>
                  {products.filter((p) => p.discount > 0).length} with discount
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
                <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                <span>
                  {products.filter((p) => p.model3D).length} with 3D models
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <ExternalLink className="w-4 h-4" />
              <span>Updated just now</span>
            </div>
          </div>
        </div>
      )}

      {/* Add custom styles for better truncation */}
      <style>{`
        .group:hover .group-hover\:block {
          display: block !important;
        }
      `}</style>
    </div>
  );
};

export default ProductList;
