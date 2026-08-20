import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Sparkles,
  Home,
  Smartphone,
  Zap,
  Globe,
  Shield,
  ArrowRight,
  Camera,
  Grid3x3,
  Box,
  Facebook,
  Github,
  Twitter,
  Chrome,
  Apple,
  CheckCircle,
  AlertCircle,
  Info,
} from "lucide-react";

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup, login } = useAuth();
  const navigate = useNavigate();

  // Floating animation for 3D elements
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Background images for AR theme
  const backgroundImages = [
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1615874959474-d609969a20ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  ];

  // Custom Toast Components
  const SuccessToast = ({ message }) => (
    <div className="flex items-center gap-3 p-2">
      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
        <CheckCircle className="w-6 h-6 text-green-600" />
      </div>
      <div>
        <p className="font-semibold text-gray-900">Success!</p>
        <p className="text-sm text-gray-600">{message}</p>
      </div>
    </div>
  );

  const ErrorToast = ({ message }) => (
    <div className="flex items-center gap-3 p-2">
      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
        <AlertCircle className="w-6 h-6 text-red-600" />
      </div>
      <div>
        <p className="font-semibold text-gray-900">Error</p>
        <p className="text-sm text-gray-600">{message}</p>
      </div>
    </div>
  );

  const InfoToast = ({ message }) => (
    <div className="flex items-center gap-3 p-2">
      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
        <Info className="w-6 h-6 text-blue-600" />
      </div>
      <div>
        <p className="font-semibold text-gray-900">Info</p>
        <p className="text-sm text-gray-600">{message}</p>
      </div>
    </div>
  );

  // Custom toast functions
  const showSuccessToast = (message) => {
    toast.success(<SuccessToast message={message} />, {
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
    toast.error(<ErrorToast message={message} />, {
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
    toast.info(<InfoToast message={message} />, {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsAnimating(true);

    let response;

    try {
      if (isSignup) {
        response = await signup(name, email, password);

        if (response.message?.toLowerCase().includes("successful")) {
          showSuccessToast("Account created successfully! You can now login.");
          setTimeout(() => {
            setIsSignup(false);
            setIsAnimating(false);
            setName("");
            setEmail("");
            setPassword("");
          }, 1500);
        } else {
          showErrorToast(
            response.message || "Signup failed. Please try again.",
          );
          setIsAnimating(false);
        }
      } else {
        response = await login(email, password);

        if (response.message === "Login successful") {
          showSuccessToast("Login successful! Redirecting to dashboard...");
          setTimeout(() => {
            navigate("/");
          }, 1200);
        } else {
          showErrorToast(
            response.message || "Invalid credentials. Please try again.",
          );
          setIsAnimating(false);
        }
      }
    } catch (error) {
      showErrorToast("An error occurred. Please try again.");
      setIsAnimating(false);
    }
  };

  // Social login handlers
  const handleSocialLogin = (provider) => {
    showInfoToast(`Signing in with ${provider}... (Demo feature)`);
  };

  // Demo login handler
  const handleDemoLogin = () => {
    setEmail("demo@contextfit.com");
    setPassword("demo123");
    showInfoToast("Demo credentials filled. Click Login to continue.");
  };

  return (
    <div className="min-h-screen flex bg-white relative">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />

      {/* Left Side - AR Visualization Showcase - Hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {backgroundImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                activeImage === index ? "opacity-100" : "opacity-0"
              }`}
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ))}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/60 to-transparent" />

        {/* Floating 3D Elements */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-64 h-64">
            {/* Floating Cube */}
            <div className="absolute top-1/4 left-1/4 w-20 h-20 border-2 border-cyan-400/50 rounded-lg animate-float-slow">
              <div className="absolute inset-0 bg-cyan-400/10 backdrop-blur-sm rounded-lg" />
              <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-cyan-300" />
            </div>

            {/* Floating Grid */}
            <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-blue-300/30 rounded-lg animate-float">
              <Grid3x3 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-blue-300/60" />
            </div>

            {/* Floating Camera */}
            <div className="absolute top-1/2 right-1/4 w-16 h-16 border border-purple-300/30 rounded-full animate-float-slower">
              <Camera className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-purple-300/60" />
            </div>
          </div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 p-12 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">C</span>
              </div>
              <span className="text-3xl font-bold text-white">CONTEXTFIT</span>
            </div>

            <h1 className="text-5xl font-bold text-white mb-4">
              Visualize Your <span className="text-cyan-300">Space</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Experience products in your environment with cutting-edge AR
              technology
            </p>
          </div>

          {/* Features List */}
          <div className="space-y-4">
            {[
              {
                icon: <Home className="w-5 h-5" />,
                text: "Room-scale AR visualization",
              },
              {
                icon: <Smartphone className="w-5 h-5" />,
                text: "Mobile & desktop compatible",
              },
              {
                icon: <Zap className="w-5 h-5" />,
                text: "Real-time 3D rendering",
              },
              {
                icon: <Globe className="w-5 h-5" />,
                text: "Web-based AR experience",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 text-gray-200"
              >
                <div className="p-2 rounded-full bg-blue-800/40">
                  {feature.icon}
                </div>
                <span>{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Login/Signup Form - FULLY RESPONSIVE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-white min-h-screen lg:min-h-0">
        <div
          className={`w-full max-w-md transition-all duration-500 ${
            isAnimating ? "scale-95 opacity-90" : "scale-100 opacity-100"
          }`}
        >
          {/* Form Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 text-xs sm:text-sm font-semibold mb-4 sm:mb-6 border border-blue-100">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
              <span className="text-[10px] sm:text-xs">
                {isSignup ? "CREATE YOUR ACCOUNT" : "WELCOME BACK"}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {isSignup ? "Join the AR Revolution" : "Continue Your Journey"}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 px-2">
              {isSignup
                ? "Start visualizing products in your space today"
                : "Access your personalized AR dashboard"}
            </p>
          </div>

          {/* Social Login Buttons - Responsive */}
          <div className="mb-4 sm:mb-6">
            <p className="text-xs sm:text-sm text-gray-500 text-center mb-3 sm:mb-4">
              Sign in with
            </p>
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-3 sm:mb-4">
              {/* Google Button */}
              <button
                type="button"
                onClick={() => handleSocialLogin("Google")}
                className="flex items-center justify-center gap-1 sm:gap-2 p-2 sm:p-3 rounded-lg border border-gray-200 hover:border-red-500 hover:bg-red-50 transition-all group"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-[10px] sm:text-sm text-gray-700 group-hover:text-red-600 font-medium">
                  Google
                </span>
              </button>

              {/* GitHub Button */}
              <button
                type="button"
                onClick={() => handleSocialLogin("Github")}
                className="flex items-center justify-center gap-1 sm:gap-2 p-2 sm:p-3 rounded-lg border border-gray-200 hover:border-gray-900 hover:bg-gray-900 transition-all group"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    className="text-gray-800 group-hover:text-white"
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                  />
                </svg>
                <span className="text-[10px] sm:text-sm text-gray-700 group-hover:text-white font-medium">
                  GitHub
                </span>
              </button>

              {/* Apple Button */}
              <button
                type="button"
                onClick={() => handleSocialLogin("Apple")}
                className="flex items-center justify-center gap-1 sm:gap-2 p-2 sm:p-3 rounded-lg border border-gray-200 hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all group"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    className="text-gray-800 group-hover:text-white"
                    d="M14.94 5.19A4.38 4.38 0 0 0 16 2a4.44 4.44 0 0 0-3 1.52 4.17 4.17 0 0 0-1 3.09 3.69 3.69 0 0 0 2.94-1.42zm2.52 7.44a4.51 4.51 0 0 1 2.16-3.81 4.66 4.66 0 0 0-3.66-2c-1.56-.16-3 .91-3.83.91s-2-.89-3.3-.87a4.92 4.92 0 0 0-4.14 2.53C2.93 12.45 4.24 17 6 19.47c.8 1.21 1.8 2.58 3.12 2.53s1.75-.76 3.28-.76 2 .76 3.3.73 2.22-1.24 3.06-2.45a11 11 0 0 0 1.38-2.85 4.41 4.41 0 0 1-2.68-4.04z"
                  />
                </svg>
                <span className="text-[10px] sm:text-sm text-gray-700 group-hover:text-white font-medium">
                  Apple
                </span>
              </button>
            </div>
          </div>

          {/* Divider with "or" */}
          <div className="flex items-center my-4 sm:my-6">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-3 sm:px-4 text-xs sm:text-sm text-gray-500">
              or continue with
            </span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Form Container - Removed extra padding for mobile */}
          <div className="rounded-2xl">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Name Field - Only in Signup */}
              {isSignup && (
                <div className="group">
                  <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    <User className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pl-10 sm:pl-12 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:outline-none text-gray-900 placeholder-gray-500 transition-all group-hover:border-blue-300 text-sm sm:text-base"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      autoComplete="off"
                    />
                    <User className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-focus-within:text-blue-500" />
                  </div>
                </div>
              )}

              {/* Email Field */}
              <div className="group">
                <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pl-10 sm:pl-12 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:outline-none text-gray-900 placeholder-gray-500 transition-all group-hover:border-blue-300 text-sm sm:text-base"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Mail className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-focus-within:text-blue-500" />
                </div>
              </div>

              {/* Password Field */}
              <div className="group">
                <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  <Lock className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    autoComplete={
                      isSignup ? "new-password" : "current-password"
                    }
                    placeholder="Enter your password"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pl-10 sm:pl-12 pr-10 sm:pr-12 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:outline-none text-gray-900 placeholder-gray-500 transition-all group-hover:border-blue-300 text-sm sm:text-base"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Lock className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-focus-within:text-blue-500" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password - Only in Login */}
              {!isSignup && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-xs sm:text-sm text-gray-600">
                      Remember me
                    </span>
                  </label>
                  <button
                    type="button"
                    className="text-xs sm:text-sm text-blue-600 hover:text-blue-700"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Security Info */}
              <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-500">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Your data is encrypted and secure</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isAnimating}
                className="w-full py-2.5 sm:py-3 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {isAnimating ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  <>
                    {isSignup ? "Create Account" : "Sign In"}
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Switch Between Login/Signup */}
            <div className="text-center mt-4 sm:mt-6">
              <p className="text-xs sm:text-sm text-gray-600">
                {isSignup
                  ? "Already have an account?"
                  : "Don't have an account?"}
                <button
                  type="button"
                  onClick={() => {
                    setIsAnimating(true);
                    setTimeout(() => {
                      setIsSignup(!isSignup);
                      setIsAnimating(false);
                      showInfoToast(
                        `Switched to ${!isSignup ? "Sign Up" : "Login"} mode`,
                      );
                    }, 300);
                  }}
                  className="ml-1 sm:ml-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                >
                  {isSignup ? "Sign in here" : "Sign up now"}
                </button>
              </p>
            </div>

            {/* Demo Login Button - New for mobile */}
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full mt-3 sm:mt-4 py-2 sm:py-2.5 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
              Use Demo Credentials
            </button>

            {/* Additional Social Icons - Responsive */}
            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
              <p className="text-center text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                Connect with us
              </p>
              <div className="flex justify-center gap-3 sm:gap-4">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    showInfoToast("Facebook page (Demo feature)");
                  }}
                  className="p-1.5 sm:p-2 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    showInfoToast("Twitter page (Demo feature)");
                  }}
                  className="p-1.5 sm:p-2 rounded-full bg-gray-100 hover:bg-cyan-100 text-gray-600 hover:text-cyan-600 transition-colors"
                >
                  <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    showInfoToast("GitHub repository (Demo feature)");
                  }}
                  className="p-1.5 sm:p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center mt-4 sm:mt-6">
            <p className="text-[10px] sm:text-xs text-gray-500">
              By continuing, you agree to our{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  showInfoToast("Terms of Service (Demo feature)");
                }}
                className="text-blue-600 hover:text-blue-700"
              >
                Terms
              </a>{" "}
              and{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  showInfoToast("Privacy Policy (Demo feature)");
                }}
                className="text-blue-600 hover:text-blue-700"
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Background Pattern - Light version */}
      <div className="lg:hidden absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(59, 130, 246, 0.1) 2%, transparent 0%),
                          radial-gradient(circle at 75px 75px, rgba(34, 211, 238, 0.1) 2%, transparent 0%)`,
            backgroundSize: "100px 100px",
          }}
        />
      </div>
    </div>
  );
};

export default AuthPage;
