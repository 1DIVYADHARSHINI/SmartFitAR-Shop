import { useState, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

export const useCustomerProductList = (products = []) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // 🔍 FILTER STATES
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  // ✅ READ CATEGORY FROM URL
  const categoryFromURL = searchParams.get("category");

  useEffect(() => {
    if (categoryFromURL) {
      setSelectedCategory(categoryFromURL);
    }
  }, [categoryFromURL]);

  // ✅ UNIQUE CATEGORIES
  const categories = useMemo(() => {
    return ["ALL", ...new Set(products.map((p) => p.category).filter(Boolean))];
  }, [products]);

  // ✅ FILTER PRODUCTS
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchCategory =
        selectedCategory === "ALL" || product.category === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  // Toast configuration functions
  const showSuccessToast = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      className: "border border-green-200 shadow-lg",
    });
  };

  const showErrorToast = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      className: "border border-red-200 shadow-lg",
    });
  };

  const showInfoToast = (message) => {
    toast.info(message, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      className: "border border-blue-200 shadow-lg",
    });
  };

  const showWishlistToast = (message) => {
    toast(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      icon: "❤️",
      className: "border border-pink-200 shadow-lg bg-pink-50",
    });
  };

  const showFollowToast = (message) => {
    toast(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      icon: "⭐",
      className: "border border-purple-200 shadow-lg bg-purple-50",
    });
  };

  // 🛒 CART
  const handleAddToCart = (product) => {
    showSuccessToast(`${product.name} added to cart!`);
    setTimeout(() => {
      navigate("/cart", { state: { product } });
    }, 1500);
  };

  // ❤️ WISHLIST
  const handleAddToWishlist = (product) => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (!wishlist.find((p) => p._id === product._id)) {
      wishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      showWishlistToast(`❤️ ${product.name} added to wishlist!`);
      setTimeout(() => {
        navigate("/wishlist");
      }, 1500);
    } else {
      showInfoToast(` ${product.name} is already in your wishlist`);
    }
  };

  // ⭐ FOLLOW SELLER
  const handleFollowSeller = (seller) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      showErrorToast("Please login to follow sellers");
      return;
    }

    const followed = JSON.parse(localStorage.getItem("followedSellers")) || [];
    const exists = followed.some(
      (f) => f.sellerId === seller._id || f.sellerStore === seller?.storeName
    );

    if (!exists) {
      followed.push({
        sellerId: seller._id,
        sellerStore: seller?.storeName,
        userName: user?.name,
        userEmail: user?.email,
      });
      localStorage.setItem("followedSellers", JSON.stringify(followed));
      const globalFollowed =
        JSON.parse(localStorage.getItem("globalFollowed")) || {};
      if (!globalFollowed[seller._id]) {
        globalFollowed[seller._id] = [];
      }
      if (!globalFollowed[seller._id].includes(user.email)) {
        globalFollowed[seller._id].push(user.email);
      }
      localStorage.setItem("globalFollowed", JSON.stringify(globalFollowed));
      showFollowToast(
        `⭐ Now following ${seller?.storeName || "this seller"}!`
      );
    } else {
      showInfoToast(
        `ℹ️ You're already following ${seller?.storeName || "this seller"}`
      );
    }
  };

  // 💰 FORMAT PRICE
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  // Return the toast functions as well for external use
  return {
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
    showSuccessToast,
    showErrorToast,
    showInfoToast,
  };
};
