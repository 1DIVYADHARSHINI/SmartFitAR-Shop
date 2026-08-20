import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Dashboard from "@/pages/Dashboard";
import Products from "@/pages/Products";
import Sellers from "@/pages/Sellers";
import CustomerProductPage from "./pages/CustomerProductPage";
import Home from "@/pages/Home";
import AdminLogin from "./pages/AdminLogin";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import AuthPage from "./pages/AuthPage";
import CustomerDetails from "./pages/CustomerDetails";
import Notifications from "./pages/Notifications";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/login" element={<AuthPage />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/customerdetails" element={<CustomerDetails />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/products" element={<Products />} />
          <Route path="/sellers" element={<Sellers />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/productcard" element={<CustomerProductPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
