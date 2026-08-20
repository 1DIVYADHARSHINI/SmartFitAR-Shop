import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotificationBell from "@/components/NotificationBell";
import CartBadge from "@/components/common/CartBadge";
import {
  Menu,
  X,
  Eye,
  Layers,
  Boxes,
  Flame,
  Bell,
  Heart,
  Home,
} from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = (id) => {
    setIsMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollToId: id } });
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    {
      label: "Home",
      icon: Home,
      action: () => {
        navigate("/");
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
    },
    { label: "Products", icon: Boxes, path: "/productcard" },
    {
      label: "Categories",
      icon: Layers,
      action: () => handleScroll("categories"),
    },
    { label: "3D Viewer", icon: Eye, action: () => handleScroll("viewer") },
    { label: "FAQ", icon: Flame, action: () => handleScroll("fqs") },
    {
      label: "About Us",
      icon: Bell,
      action: () => handleScroll("about"),
    },
    { label: "Wishlist", icon: Heart, path: "/wishlist" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-cyan-50 via-blue-50 to-indigo-50 border-b border-blue-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-[#1A5FB4] to-[#00C2B4] rounded-xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#FFB020] rounded-full border-2 border-white"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-[#1A5FB4] to-[#00C2B4] bg-clip-text text-transparent">
                  FitScope
                </span>
                <span className="text-xs text-gray-500 -mt-1">
                  by ContextFit
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item, index) => {
                const Icon = item.icon;

                return item.path ? (
                  <Link
                    key={index}
                    to={item.path}
                    className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:text-[#1A5FB4] hover:bg-blue-50 font-medium transition-colors"
                  >
                    {Icon && <Icon className="w-4 h-4 mr-2" />}
                    {item.label}
                  </Link>
                ) : (
                  <button
                    key={index}
                    onClick={item.action}
                    className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:text-[#1A5FB4] hover:bg-blue-50 font-medium transition-colors"
                  >
                    {Icon && <Icon className="w-4 h-4 mr-2" />}
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Right Section (Desktop) */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/cart"
                className="relative p-2 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <CartBadge />
              </Link>

              <NotificationBell />

              <Link
                to="user/login"
                className="px-4 py-2 bg-gradient-to-r from-[#1A5FB4] to-[#00C2B4] text-white rounded-lg font-medium hover:shadow-lg transition-shadow"
              >
                Login
              </Link>
            </div>

            {/* Mobile Controls */}
            <div className="md:hidden flex items-center space-x-3">
              <Link to="/cart" className="relative p-2">
                <CartBadge />
              </Link>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 pt-2 pb-4 space-y-1">
              {navItems.map((item, index) => {
                const Icon = item.icon;

                return item.path ? (
                  <Link
                    key={index}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-[#1A5FB4] font-medium"
                  >
                    {Icon && <Icon className="w-5 h-5 mr-3 text-gray-500" />}
                    {item.label}
                  </Link>
                ) : (
                  <button
                    key={index}
                    onClick={() => {
                      item.action();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-[#1A5FB4] font-medium"
                  >
                    {Icon && <Icon className="w-5 h-5 mr-3 text-gray-500" />}
                    {item.label}
                  </button>
                );
              })}

              <div className="pt-4 border-t border-gray-100">
                <div className="px-4 py-2">
                  <NotificationBell />
                </div>

                <Link
                  to="/user/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block mx-4 mt-3 px-4 py-3 bg-gradient-to-r from-[#1A5FB4] to-[#00C2B4] text-white rounded-lg font-medium text-center"
                >
                  Login / Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
