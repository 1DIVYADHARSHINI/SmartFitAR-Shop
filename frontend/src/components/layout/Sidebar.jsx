import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Users,
  UserCircle,
  BarChart3,
  Settings,
  LogOut,
  Sparkles,
  Menu,
  X,
  ChevronLeft,
} from "lucide-react";

const Sidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Check if screen is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close mobile sidebar when route changes
  useEffect(() => {
    if (isMobile) {
      setIsMobileOpen(false);
    }
  }, [location, isMobile]);

  const navItems = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      path: "/products",
      label: "Products",
      icon: <Package className="w-5 h-5" />,
    },
    {
      path: "/sellers",
      label: "Sellers",
      icon: <Users className="w-5 h-5" />,
    },
    {
      path: "/customerdetails",
      label: "Customers",
      icon: <UserCircle className="w-5 h-5" />,
    },
  ];

  const sidebarContent = (
    <>
      {/* Logo/Header */}
      <div className="mb-6 sm:mb-8 md:mb-10">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-400 flex items-center justify-center shadow-lg flex-shrink-0">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent truncate">
              ContextFit
            </h1>
            <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1">
              Admin Panel
            </p>
          </div>
        </div>
        <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg border border-gray-700">
          <p className="text-xs sm:text-sm text-gray-300 truncate">
            Welcome back, Admin
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-0.5 sm:space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-gradient-to-r from-amber-500/20 to-orange-400/20 text-amber-300 border-l-4 border-amber-500"
                  : "hover:bg-gray-800/50 text-gray-300 hover:text-white"
              }`
            }
          >
            <span
              className={`group-hover:scale-110 transition-transform flex-shrink-0 ${
                location.pathname === item.path ? "text-amber-400" : ""
              }`}
            >
              {item.icon}
            </span>
            <span className="font-medium text-sm sm:text-base truncate">
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>

      {/* Footer/Logout */}
      <div className="pt-4 sm:pt-6 border-t border-gray-800">
        <button className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-gray-300 hover:bg-gray-800/50 hover:text-white transition-all group">
          <LogOut className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform flex-shrink-0" />
          <span className="font-medium text-sm sm:text-base">Logout</span>
        </button>
        <div className="mt-3 sm:mt-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg border border-gray-700">
          <p className="text-[10px] sm:text-xs text-gray-400 truncate">
            v2.1.0 • Last login: Today
          </p>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      {isMobile && (
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="fixed top-4 left-4 z-50 p-2 bg-gray-900 rounded-xl text-white shadow-lg border border-gray-700 hover:bg-gray-800 transition-all lg:hidden"
          aria-label="Toggle sidebar"
        >
          {isMobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      )}

      {/* Mobile Overlay */}
      {isMobile && isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar - Desktop */}
      <aside
        className={`
          fixed lg:relative lg:sticky lg:top-0
          w-[280px] sm:w-72 
          min-h-screen 
          bg-gradient-to-b from-gray-900 to-gray-950 
          text-white 
          p-4 sm:p-6 
          flex flex-col 
          border-r border-gray-800
          transition-all duration-300 ease-in-out
          z-50
          ${isMobile ? (isMobileOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"}
          ${isMobile ? "shadow-2xl" : ""}
        `}
      >
        {/* Close button for mobile */}
        {isMobile && (
          <button
            onClick={() => setIsMobileOpen(false)}
            className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-gray-800 transition-colors lg:hidden"
            aria-label="Close sidebar"
          >
            <ChevronLeft className="w-5 h-5 text-gray-400" />
          </button>
        )}

        {sidebarContent}
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gray-900 to-gray-950 border-t border-gray-800 z-40 lg:hidden">
          <div className="flex justify-around items-center px-2 py-1.5">
            {navItems.slice(0, 4).map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg transition-all ${
                    isActive
                      ? "text-amber-400"
                      : "text-gray-400 hover:text-gray-200"
                  }`
                }
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-[10px] font-medium truncate max-w-[50px]">
                  {item.label}
                </span>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
