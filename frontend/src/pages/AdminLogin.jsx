import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import useAdminAuth from "@/hooks/useAdminAuth";
import {
  Shield,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  Users,
  BarChart3,
  Settings,
  Sparkles,
} from "lucide-react";

const AdminLogin = () => {
  const { login, loading } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warning("Please enter both email and password", {
        position: "top-center",
        autoClose: 3000,
        icon: "⚠️",
      });
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      toast.error("Please enter a valid email address", {
        position: "top-center",
        autoClose: 3000,
        icon: "✉️",
      });
      return;
    }

    login(email, password).catch((error) => {
      toast.error(
        error.message || "Login failed. Please check your credentials",
        {
          position: "top-center",
          autoClose: 4000,
          icon: "🔒",
        }
      );
    });
  };

  // Demo admin features for left panel
  const adminFeatures = [
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: "Sales Dashboard",
      description: "Real-time revenue tracking",
      color: "from-amber-500 to-orange-400",
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "User Management",
      description: "Monitor customer activity",
      color: "from-emerald-500 to-green-400",
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "Analytics",
      description: "Advanced business insights",
      color: "from-purple-500 to-pink-400",
    },
    {
      icon: <Settings className="w-5 h-5" />,
      title: "Platform Control",
      description: "System configuration",
      color: "from-blue-500 to-cyan-400",
    },
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-amber-50 via-white to-emerald-50">
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* Left Panel - UPDATED with Isometric Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-emerald-500/5 to-purple-500/5" />

        {/* Isometric Illustration Container */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-12">
          {/* Logo/Header */}
          <div className="mb-12 w-full max-w-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-400 flex items-center justify-center shadow-lg">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
                  ContextFit
                </h1>
                <p className="text-gray-600 mt-1">Admin Portal</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Secure Admin Access
            </h2>
            <p className="text-gray-600 text-lg">
              Manage your e-commerce platform with powerful tools for
              visualization analytics, customer insights, and real-time sales
              tracking.
            </p>
          </div>

          {/* Isometric Illustration with Animations */}
          <div className="relative w-full max-w-2xl h-96 mb-12">
            {/* Background Shapes */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96">
              {/* Large floating shape */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-amber-400/10 to-orange-400/10 rounded-3xl animate-float-slow rotate-45" />

              {/* Medium floating shape */}
              <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-gradient-to-br from-emerald-400/10 to-green-400/10 rounded-2xl animate-float-medium -rotate-12" />

              {/* Small floating shape */}
              <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-xl animate-float-fast rotate-12" />
            </div>

            {/* Isometric People Illustration */}
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              {/* Main isometric building/platform */}
              <div className="relative w-64 h-48 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg transform rotate-x-45 rotate-z-45 shadow-2xl">
                {/* Building details */}
                <div className="absolute -top-4 left-4 w-56 h-4 bg-gradient-to-r from-amber-500 to-orange-400 rounded-t-lg" />
                <div className="absolute -top-2 left-8 w-48 h-2 bg-gradient-to-r from-emerald-500 to-green-400 rounded-t-sm" />

                {/* Windows */}
                <div className="grid grid-cols-4 gap-2 p-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div
                      key={i}
                      className={`h-6 rounded bg-gradient-to-br from-amber-400/20 to-orange-400/20 animate-pulse`}
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>

                {/* Admin characters */}
                <div className="absolute -bottom-8 left-1/4 transform -translate-x-1/2">
                  {/* Character 1 */}
                  <div className="relative">
                    <div
                      className="w-8 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-t-lg transform rotate-z-45 animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-4 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full" />
                  </div>
                </div>

                <div className="absolute -bottom-8 right-1/4 transform -translate-x-1/2">
                  {/* Character 2 */}
                  <div className="relative">
                    <div
                      className="w-8 h-12 bg-gradient-to-br from-purple-500 to-pink-400 rounded-t-lg transform -rotate-z-45 animate-bounce"
                      style={{ animationDelay: "0.3s" }}
                    />
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-4 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Floating UI elements */}
              <div className="absolute top-8 left-16 animate-float-medium">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-400/20 backdrop-blur-sm border border-amber-200/30 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-400 flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              <div className="absolute bottom-16 right-20 animate-float-slow">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-400/20 backdrop-blur-sm border border-emerald-200/30 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-green-400 flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              <div className="absolute top-24 right-12 animate-float-fast">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-400/20 backdrop-blur-sm border border-purple-200/30 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-md bg-gradient-to-br from-purple-500 to-pink-400 flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Admin Features Grid */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
            {adminFeatures.map((feature, index) => (
              <div
                key={index}
                className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/40 hover:border-amber-200 transition-all duration-300 group hover:shadow-lg"
              >
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}
                >
                  <div className="text-white">{feature.icon}</div>
                </div>
                <h3 className="font-semibold text-gray-800 text-sm">
                  {feature.title}
                </h3>
                <p className="text-xs text-gray-600 mt-1">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form (Unchanged from previous version) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Mobile Header */}
          <div className="lg:hidden mb-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-400 flex items-center justify-center shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
              ContextFit Admin
            </h1>
            <p className="text-gray-600 mt-2">Secure access portal</p>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-400 flex items-center justify-center shadow-lg">
                <Lock className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Admin Portal Access
              </h2>
              <p className="text-gray-600">
                Enter your credentials to access the dashboard
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-amber-500">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  placeholder="Admin email address"
                  autoComplete="off"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password Input */}
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-amber-500">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Admin password"
                  autoComplete="new-password"
                  className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Security Warning */}
              <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-amber-600" />
                  <p className="text-sm text-amber-800">
                    <span className="font-medium">Restricted access:</span> This
                    portal is for authorized administrators only.
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="group w-full py-4 bg-gradient-to-r from-amber-500 to-orange-400 hover:from-amber-600 hover:to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    Access Dashboard
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              {/* Demo Credentials */}
              <div className="text-center">
                <details className="text-sm">
                  <summary className="text-gray-500 cursor-pointer hover:text-amber-600">
                    Need test credentials?
                  </summary>
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg text-left">
                    <p className="text-gray-600 mb-2">
                      Try these demo credentials:
                    </p>
                    <div className="space-y-1">
                      <p className="text-gray-700">
                        <span className="font-medium">Email:</span>{" "}
                        admin@contextfit.com
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Password:</span> admin123
                      </p>
                    </div>
                  </div>
                </details>
              </div>
            </form>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-500">
                Forgot password?{" "}
                <button
                  onClick={() =>
                    toast.info(
                      "Contact your system administrator for password reset",
                      {
                        position: "top-center",
                        autoClose: 4000,
                      }
                    )
                  }
                  className="text-amber-600 hover:text-amber-800 font-medium transition-colors"
                >
                  Contact Support
                </button>
              </p>
              <p className="text-xs text-gray-400 mt-4">
                © 2024 ContextFit Commerce Admin Portal. All rights reserved.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-6 text-center">
            <button
              onClick={() => (window.location.href = "/")}
              className="text-sm text-gray-500 hover:text-amber-600 transition-colors"
            >
              ← Back to main site
            </button>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) rotate(45deg);
          }
          50% {
            transform: translateY(-20px) rotate(45deg);
          }
        }
        @keyframes float-medium {
          0%,
          100% {
            transform: translateY(0px) rotate(-12deg);
          }
          50% {
            transform: translateY(-15px) rotate(-12deg);
          }
        }
        @keyframes float-fast {
          0%,
          100% {
            transform: translateY(0px) rotate(12deg);
          }
          50% {
            transform: translateY(-10px) rotate(12deg);
          }
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 4s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: float-fast 3s ease-in-out infinite;
        }

        /* 3D transform for isometric effect */
        .rotate-x-45 {
          transform-style: preserve-3d;
          transform: rotateX(45deg);
        }
        .rotate-z-45 {
          transform-style: preserve-3d;
          transform: rotateZ(45deg);
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;
