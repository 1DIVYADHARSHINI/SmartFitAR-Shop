import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Send,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center">
                <span className="text-xl font-bold">C</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                CONTEXTFIT
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Revolutionizing product visualization with cutting-edge AR
              technology. See products in your space before you buy.
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href="#"
                className="p-2 rounded-full bg-gray-800 hover:bg-blue-600 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-gray-800 hover:bg-cyan-500 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-gray-800 hover:bg-pink-600 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-gray-800 hover:bg-blue-700 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-cyan-300 transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-cyan-500"></span>
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-gray-400 hover:text-cyan-300 transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-cyan-500"></span>
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="text-gray-400 hover:text-cyan-300 transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-cyan-500"></span>
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="text-gray-400 hover:text-cyan-300 transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-cyan-500"></span>
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-gray-400 hover:text-cyan-300 transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-cyan-500"></span>
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  123 Tech Street, Innovation District
                  <br />
                  San Francisco, CA 94107
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-cyan-400" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-cyan-400" />
                <span className="text-gray-400">hello@contextfit.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates and AR tech
              insights.
            </p>
            <div className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-cyan-500 focus:outline-none text-white placeholder-gray-500"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg hover:opacity-90 transition-opacity">
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-gray-500">
                By subscribing, you agree to our Privacy Policy
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} ContextFit. All rights reserved.
          </div>

          <div className="flex gap-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              Cookie Policy
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              Sitemap
            </a>
          </div>
        </div>

        {/* Tech Badges */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <div className="px-3 py-1 rounded-full bg-gray-800/50 text-gray-400 text-xs border border-gray-700">
            AR Technology
          </div>
          <div className="px-3 py-1 rounded-full bg-gray-800/50 text-gray-400 text-xs border border-gray-700">
            3D Visualization
          </div>
          <div className="px-3 py-1 rounded-full bg-gray-800/50 text-gray-400 text-xs border border-gray-700">
            Real-time Rendering
          </div>
          <div className="px-3 py-1 rounded-full bg-gray-800/50 text-gray-400 text-xs border border-gray-700">
            WebAR Compatible
          </div>
          <div className="px-3 py-1 rounded-full bg-gray-800/50 text-gray-400 text-xs border border-gray-700">
            Mobile Optimized
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
