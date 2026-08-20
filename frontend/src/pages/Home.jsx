import React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import GallerySection from "@/components/GallerySection";
import Footer from "@/components/home/Footer";
import {
  Sparkles,
  Eye,
  Bell,
  Users,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Zap,
  Target,
  Shield,
  Grid3x3,
  Rotate3d,
  Maximize2,
  MousePointer,
  CheckCircle2,
  MessageCircle,
  Star,
  HelpCircle,
  Info,
  Heart,
  TrendingUp,
  Pause,
  Plus,
  Minus,
  RefreshCw,
  ChevronDown,
  UsersIcon,
  Video,
  CreditCard,
  CheckCircle,
} from "lucide-react";

// Import data
import bannersData from "@/data/banners.json";
import categoriesData from "@/data/categories.json";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const videoRef = React.useRef(null);

  // Handle video play/pause
  const handleVideoControl = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  // FAQ Data
  const faqs = [
    {
      question: "How does the AR visualization work?",
      answer:
        "Use your phone camera or upload room photos to place products in your space. No special equipment needed.",
    },
    {
      question: "Can I try clothes virtually?",
      answer:
        "Yes! Our virtual try-on uses your measurements or a standard avatar to show how clothes fit.",
    },
    {
      question: "How accurate are the size previews?",
      answer:
        "We use precise product dimensions and scale them to your room's measurements for 98% accuracy.",
    },
    {
      question: "Is my payment information secure?",
      answer:
        "Absolutely. We use bank-level encryption and never store your credit card details on our servers.",
    },
  ];

  return (
    <div className="min-h-screen from-white to-gray-50/30">
      <Navbar />

      {/* 🔥 ENHANCED BANNER SLIDER WITH VIDEO BACKGROUND - FULLY RESPONSIVE */}
      <section className="relative isolate h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[85vh] min-h-[400px] sm:min-h-[500px] md:min-h-[600px] overflow-hidden">
        {/* Video Background */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover scale-110"
        >
          <source src="/Banner2_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Gradient Overlay - Responsive */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/75 to-gray-900/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent"></div>

        {/* Animated Particles - Hidden on mobile for performance */}
        <div className="hidden sm:block absolute inset-0 opacity-30">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Main Content - Responsive */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mx-auto lg:mx-0">
              {/* Premium Badge - Responsive */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/15 backdrop-blur-sm text-white text-xs sm:text-sm font-semibold mb-4 sm:mb-6 border border-white/30 shadow-lg">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">PREMIUM AR SHOPPING EXPERIENCE</span>
                <span className="xs:hidden">AR SHOPPING</span>
              </div>

              {/* Main Heading - Responsive */}
              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                See Before You{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  Buy
                </span>
              </h1>

              {/* Subtitle - Responsive */}
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 mb-4 sm:mb-8 font-light max-w-xl">
                Experience products in your space with cutting-edge Augmented
                Reality technology. Shop with confidence, visualize with
                precision.
              </p>

              {/* Tagline - Responsive */}
              <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-10">
                <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-cyan-400 to-blue-400"></div>
                <p className="text-sm sm:text-base md:text-lg text-cyan-100 font-medium">
                  See it. Fit it. Love it.
                </p>
                <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-cyan-400 to-blue-400"></div>
              </div>

              {/* CTA Buttons - Responsive */}
              <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12">
                <Link
                  to="/productcard"
                  className="group inline-flex items-center justify-center px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl shadow-lg hover:scale-105"
                >
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                  <span className="text-xs sm:text-sm md:text-base">Start AR Shopping</span>
                  <ArrowRight className="ml-2 sm:ml-3 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
                <button
                  onClick={handleVideoControl}
                  className="group inline-flex items-center justify-center px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold rounded-xl bg-white/15 backdrop-blur-sm hover:bg-white/25 text-white border border-white/30 transition-all duration-300 hover:scale-105"
                >
                  {isVideoPlaying ? (
                    <Pause className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                  ) : (
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                  )}
                  <span className="text-xs sm:text-sm md:text-base">
                    {isVideoPlaying ? "Pause" : "Play"}
                  </span>
                </button>
              </div>

              {/* Stats Bar - Responsive Grid */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-500/30 flex items-center justify-center backdrop-blur-sm border border-white/20">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-lg md:text-2xl font-bold text-white">10K+</div>
                    <div className="text-[10px] sm:text-xs md:text-sm text-cyan-100 hidden xs:block">Happy Customers</div>
                    <div className="text-[10px] xs:hidden text-cyan-100">Customers</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-green-500/30 to-emerald-500/30 flex items-center justify-center backdrop-blur-sm border border-white/20">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-lg md:text-2xl font-bold text-white">98%</div>
                    <div className="text-[10px] sm:text-xs md:text-sm text-emerald-100 hidden xs:block">Satisfaction</div>
                    <div className="text-[10px] xs:hidden text-emerald-100">Rating</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 flex items-center justify-center backdrop-blur-sm border border-white/20">
                    <Video className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-lg md:text-2xl font-bold text-white">5K+</div>
                    <div className="text-[10px] sm:text-xs md:text-sm text-purple-100 hidden xs:block">AR Previews</div>
                    <div className="text-[10px] xs:hidden text-purple-100">Previews</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Hidden on mobile */}
        <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="flex flex-col items-center">
            <span className="text-xs text-white/70 mb-2 animate-pulse">
              Scroll to explore
            </span>
            <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center p-1">
              <div className="w-1 h-2 bg-white/80 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 🎯 WHY CHOOSE CONTEXTFIT - FULLY RESPONSIVE */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-blue-50/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <span className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-400/10 text-blue-600 text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              WHY WE'RE DIFFERENT
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6">
              Shop With{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                100% Confidence
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              We're not just another marketplace. We're your personal shopping
              assistant powered by immersive tech.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Feature Cards - Responsive */}
            {[
              {
                icon: Eye,
                color: "from-blue-500 to-cyan-400",
                title: "See It First",
                desc: "Preview products in your actual space with millimeter-accurate AR placement.",
                link: "Try AR Demo",
                textColor: "text-blue-600",
              },
              {
                icon: Target,
                color: "from-green-500 to-emerald-400",
                title: "Smart Price Alerts",
                desc: "Set your target price and get instant notifications when it drops. Never overpay again.",
                link: "Set Alert",
                textColor: "text-green-600",
              },
              {
                icon: Users,
                color: "from-purple-500 to-pink-400",
                title: "Follow Sellers",
                desc: "Get updates from trusted brands. Be the first to know about launches and exclusive deals.",
                link: "Explore Brands",
                textColor: "text-purple-600",
              },
              {
                icon: Shield,
                color: "from-amber-500 to-orange-400",
                title: "Verified Reviews",
                desc: "Real photos from verified buyers. See how products actually look in homes like yours.",
                link: "Read Reviews",
                textColor: "text-amber-600",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative p-6 sm:p-8 bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-100 hover:-translate-y-2"
              >
                <div className={`absolute -top-4 left-6 sm:left-8 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg`}>
                  <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mt-6 sm:mt-8 mb-2 sm:mb-4">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                  {feature.desc}
                </p>
                <div className="pt-4 sm:pt-6 border-t border-gray-100">
                  <span className={`${feature.textColor} font-semibold inline-flex items-center group-hover:gap-2 transition-all text-sm sm:text-base`}>
                    {feature.link}
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-2 transition-transform" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🛍️ SHOP BY CATEGORY - FULLY RESPONSIVE */}
      <section id="categories" className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <span className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-400/10 text-blue-600 text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
              <Grid3x3 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              BROWSE COLLECTIONS
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">
              Shop By{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                Experience
              </span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Each category is enhanced with unique visualization features
            </p>
          </div>

          {/* Category Grid - Responsive */}
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {categoriesData.categories.map((category) => (
              <div
                key={category.id}
                onClick={() =>
                  navigate(`/productcard?category=${category.title}`)
                }
                className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100"
              >
                {/* Category Image with Overlay */}
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />
                  <img
                    src={category.img}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Icon Badge */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-xl sm:text-2xl">
                    {category.icon}
                  </div>

                  {/* AR Badge */}
                  {category.arSupported && (
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-[10px] sm:text-xs font-bold rounded-full backdrop-blur-sm shadow-lg">
                      <Sparkles className="w-2 h-2 sm:w-3 sm:h-3 inline mr-0.5 sm:mr-1" />
                      3D/AR
                    </div>
                  )}
                </div>

                {/* Category Info */}
                <div className="p-4 sm:p-5 md:p-6">
                  <div className="flex items-start justify-between mb-1 sm:mb-2">
                    <div>
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">
                        {category.subtitle}
                      </p>
                    </div>
                    {category.badge && (
                      <span className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold rounded-full bg-blue-50 text-blue-600">
                        {category.badge}
                      </span>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 sm:gap-4">
                      <span className="text-xs sm:text-sm text-gray-600">
                        {category.productCount} items
                      </span>
                      {category.arSupported && (
                        <span className="inline-flex items-center text-[10px] sm:text-xs text-blue-600 font-semibold">
                          <CheckCircle2 className="w-2 h-2 sm:w-3 sm:h-3 mr-0.5 sm:mr-1" />
                          AR Ready
                        </span>
                      )}
                    </div>
                    <span className="text-blue-600 font-semibold text-xs sm:text-sm inline-flex items-center">
                      Explore
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 group-hover:translate-x-2 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* VIEW ALL CATEGORIES */}
          <div className="text-center mt-8 sm:mt-10 md:mt-12">
            <Link
              to="/categories"
              className="group inline-flex items-center px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
            >
              View All Categories
              <ArrowRight className="ml-2 sm:ml-3 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 🎮 3D VIEW SECTION - FULLY RESPONSIVE */}
      <section id="viewer" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-10 md:gap-12">
            {/* Left Content */}
            <div className="lg:w-1/2 w-full">
              <span className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
                <Rotate3d className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                IMMERSIVE TECHNOLOGY
              </span>
              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
                Experience Products in{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  3D Reality
                </span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8">
                Our advanced 3D viewer lets you inspect products from every
                angle, zoom in on details, and even see how materials look in
                different lighting.
              </p>

              <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                    <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base">360° Rotation</h4>
                    <p className="text-xs sm:text-sm text-gray-400">
                      Spin products to see all sides
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <MousePointer className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base">Interactive</h4>
                    <p className="text-xs sm:text-sm text-gray-400">
                      Click to explore features
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base">AR Placement</h4>
                    <p className="text-xs sm:text-sm text-gray-400">View in your room</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base">Real-time</h4>
                    <p className="text-xs sm:text-sm text-gray-400">Instant loading</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col xs:flex-row gap-3 sm:gap-4">
                <button className="group px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl flex items-center justify-center text-sm sm:text-base">
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                  Watch 3D Demo
                </button>
                <button className="px-6 sm:px-8 py-2.5 sm:py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl font-semibold transition-all duration-300 border border-white/20 text-sm sm:text-base">
                  Try in Browser
                </button>
              </div>
            </div>

            {/* Right - 3D Product */}
            <div className="lg:w-1/2 w-full relative mt-6 lg:mt-0">
              <div className="relative group">
                <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-2xl sm:rounded-3xl blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10">
                  <div className="aspect-square relative bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-2 sm:p-4">
                    <div className="relative w-full h-full flex items-center justify-center">
                      <div className="relative w-48 h-48 xs:w-56 xs:h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 flex items-center justify-center animate-spin-medium group-hover:pause-animation">
                        <img
                          src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&fit=max"
                          alt="Modern Luxury Armchair 3D View"
                          className="w-full h-full object-contain rounded-2xl shadow-2xl transform scale-110 hover:scale-125 transition-transform duration-500"
                        />
                      </div>

                      {/* Center Control - Smaller on mobile */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-400/40 flex items-center justify-center backdrop-blur-md shadow-lg">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-400 flex items-center justify-center animate-pulse shadow-lg">
                            <Rotate3d className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                          </div>
                        </div>
                      </div>

                      {/* Controls - Responsive */}
                      <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-3 z-10">
                        <button className="px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20 flex items-center gap-1 sm:gap-2 hover:scale-105">
                          <Pause className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="hidden xs:inline">Pause</span>
                        </button>
                        <button className="px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold hover:opacity-90 transition-all duration-300 flex items-center gap-1 sm:gap-2 hover:scale-105 shadow-lg">
                          <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="hidden xs:inline">AR View</span>
                        </button>
                      </div>

                      {/* Product Info Badge - Responsive */}
                      <div className="absolute top-3 sm:top-4 md:top-6 left-3 sm:left-4 md:left-6 z-10">
                        <div className="px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 bg-black/50 backdrop-blur-sm rounded-lg sm:rounded-xl border border-white/20 shadow-lg">
                          <div className="text-xs sm:text-sm font-semibold mb-0.5">Elysium Armchair</div>
                          <div className="text-[10px] sm:text-xs text-gray-300">Premium Leather • $1,299</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating AR Badge - Responsive */}
                <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 md:-top-5 md:-right-5 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl animate-bounce-slow z-20">
                  <div className="text-center">
                    <div className="text-white font-bold text-lg sm:text-xl">AR</div>
                    <div className="text-[8px] sm:text-[10px] text-white/80">View in Room</div>
                  </div>
                </div>

                {/* 3D Badge - Responsive */}
                <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 md:-bottom-5 md:-left-5 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-2xl z-20">
                  <div className="text-center">
                    <div className="text-white font-bold text-base sm:text-lg">3D</div>
                    <div className="text-[8px] text-white/80">HD View</div>
                  </div>
                </div>
              </div>

              {/* Product Stats - Responsive */}
              <div className="mt-6 sm:mt-8 flex justify-center gap-6 sm:gap-8 md:gap-10">
                <div className="text-center">
                  <div className="text-base sm:text-lg md:text-2xl font-bold text-cyan-400 flex items-center justify-center gap-1 sm:gap-2">
                    <span>15s</span>
                    <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400">Rotation</div>
                </div>
                <div className="text-center">
                  <div className="text-base sm:text-lg md:text-2xl font-bold text-purple-400 flex items-center justify-center gap-1 sm:gap-2">
                    <span>4K</span>
                    <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400">Resolution</div>
                </div>
                <div className="text-center">
                  <div className="text-base sm:text-lg md:text-2xl font-bold text-amber-400 flex items-center justify-center gap-1 sm:gap-2">
                    <span>72</span>
                    <Zap className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400">FPS</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ❓ FAQ SECTION - FULLY RESPONSIVE */}
      <section id="fqs" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-amber-50/50 to-orange-50/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <span className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-amber-200/60 to-orange-200/40 text-amber-800 text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
              <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              GOT QUESTIONS?
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-2 sm:mb-3 md:mb-4">
              Frequently Asked{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">
                Questions
              </span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-2xl mx-auto px-4">
              Everything you need to know about ContextFit Commerce
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="group mb-3 sm:mb-4 last:mb-0 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-white/70 to-white/50 hover:from-amber-50/80 hover:to-orange-50/60 border border-amber-100/50 hover:border-amber-200 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-amber-400/20 to-orange-400/20 flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600" />
                      </div>
                      <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 group-hover:text-amber-700">
                        {faq.question}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm md:text-base text-gray-700 pl-8 sm:pl-11">{faq.answer}</p>
                  </div>
                  <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 group-hover:text-amber-600 transition-colors mt-0.5 sm:mt-1 flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-10 md:mt-12">
            <Link
              to="/faq"
              className="inline-flex items-center px-6 sm:px-8 py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base font-semibold rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 group"
            >
              <span className="flex items-center gap-2 sm:gap-3">
                View All FAQs
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-600 flex flex-wrap items-center justify-center gap-3 sm:gap-6">
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-400"></div>
                <span>Quick Answers</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-orange-400"></div>
                <span>Updated Daily</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-300"></div>
                <span>Expert Verified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMAGE GALLERY */}
      <GallerySection />

      {/* 🏢 ABOUT US SECTION - FULLY RESPONSIVE */}
      <section id="about" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white text-blue-600 text-xs sm:text-sm font-medium mb-4 sm:mb-6 shadow-sm">
                <UsersIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Our Story
              </div>
              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6">
                Redefining{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                  Online Shopping
                </span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4 sm:mb-6">
                ContextFit Commerce was born from a simple idea: online shopping
                should be as confident and enjoyable as in-store shopping.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8">
                We combine cutting-edge 3D visualization, AR technology, and
                intelligent features to create a shopping experience that
                eliminates uncertainty and builds trust between buyers and
                sellers.
              </p>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
                <div className="bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-sm">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 mb-1">10K+</div>
                  <div className="text-xs sm:text-sm md:text-base text-gray-600">Happy Customers</div>
                </div>
                <div className="bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-sm">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-600 mb-1">500+</div>
                  <div className="text-xs sm:text-sm md:text-base text-gray-600">Verified Sellers</div>
                </div>
                <div className="bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-sm">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-600 mb-1">25K+</div>
                  <div className="text-xs sm:text-sm md:text-base text-gray-600">Products in 3D</div>
                </div>
                <div className="bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-sm">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-emerald-600 mb-1">98%</div>
                  <div className="text-xs sm:text-sm md:text-base text-gray-600">Satisfaction Rate</div>
                </div>
              </div>

              <Link
                to="/about"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Learn More About Us
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Link>
            </div>

            <div className="relative mt-6 sm:mt-8 lg:mt-0">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-3 sm:space-y-4">
                  <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg transform hover:scale-[1.03] transition-transform duration-300">
                    <img
                      src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600"
                      alt="Team Collaboration"
                      className="w-full h-32 sm:h-40 md:h-48 object-cover"
                    />
                  </div>
                  <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg transform hover:scale-[1.03] transition-transform duration-300">
                    <img
                      src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=600"
                      alt="Technology Development"
                      className="w-full h-40 sm:h-52 md:h-64 object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-3 sm:space-y-4 mt-4 sm:mt-6 md:mt-8">
                  <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg transform hover:scale-[1.03] transition-transform duration-300">
                    <img
                      src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600"
                      alt="Customer Support"
                      className="w-full h-40 sm:h-52 md:h-64 object-cover"
                    />
                  </div>
                  <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg transform hover:scale-[1.03] transition-transform duration-300">
                    <img
                      src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600"
                      alt="Office Environment"
                      className="w-full h-32 sm:h-40 md:h-48 object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Floating Badge - Responsive */}
              <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 md:-bottom-6 md:-right-6 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-2xl">
                <div className="flex items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 flex items-center justify-center mr-2 sm:mr-3 md:mr-4">
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">4.9/5</div>
                    <div className="text-[10px] sm:text-xs md:text-sm text-gray-600">Customer Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 📱 FINAL CTA - FULLY RESPONSIVE */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500">
        <div className="container mx-auto px-4 sm:px-6 text-center text-white">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 md:mb-6">
            Ready to Shop With Confidence?
          </h2>
          <p className="text-sm sm:text-base md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto text-blue-100 px-4">
            Join thousands who've transformed their online shopping experience
            with ContextFit.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              to="/signup"
              className="group px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl inline-flex items-center justify-center text-sm sm:text-base"
            >
              Start Free Trial
              <TrendingUp className="ml-2 sm:ml-3 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link
              to="/demo"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-bold rounded-xl border border-white/30 transition-all duration-300 text-sm sm:text-base"
            >
              Schedule Demo
            </Link>
          </div>
          <p className="mt-6 sm:mt-8 text-blue-200 text-xs sm:text-sm">
            No credit card required • 30-day money back • Cancel anytime
          </p>
        </div>
      </section>

      <Footer />

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes spin-medium {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-spin-medium {
          animation: spin-medium 20s linear infinite;
        }
        
        .pause-animation {
          animation-play-state: paused;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        /* Hide scrollbar for cleaner look */
        ::-webkit-scrollbar {
          width: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        
        /* Video optimization */
        video {
          filter: brightness(0.9);
          object-fit: cover;
        }
        
        @media (max-width: 640px) {
          video {
            object-position: center;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;