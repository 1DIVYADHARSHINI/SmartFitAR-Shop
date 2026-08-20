import React from "react";
import { useCheckout } from "@/hooks/useCheckout";
import API_URL from "@/config/api";
import { 
  CreditCard, Wallet, Smartphone, Truck, Shield, 
  Package, ShoppingBag, User, Mail, Phone, MapPin,
  Lock, CheckCircle, Tag, ShoppingCart,
  ArrowRight, Sparkles, Gift, Award, Clock,
  IndianRupee, ChevronRight, Star,
  Banknote, Smartphone as UpiIcon,
  SmartphoneCharging, Receipt, Heart
} from "lucide-react";

const CheckoutPage = () => {
  const {
    products,
    customer,
    setCustomer,
    paymentMethod,
    setPaymentMethod,
    quantities,
    handleQuantityChange,
    handlePlaceOrder,
  } = useCheckout();

  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col items-center justify-center p-6">
        <div className="relative mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-16 h-16 text-blue-600" />
          </div>
          <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center animate-bounce">
            <Heart className="w-6 h-6 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Your Shopping Cart is Empty</h2>
        <p className="text-gray-600 text-center max-w-md mb-8">
          Add amazing products to your cart and enjoy our secure checkout with multiple payment options.
        </p>
        <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105">
          Browse Products
        </button>
      </div>
    );
  }

  const subtotal = products.reduce((total, product) => {
    const price = product.discount > 0 
      ? product.price - (product.price * product.discount) / 100 
      : product.price;
    const quantity = quantities[product._id];
    return total + (price * quantity);
  }, 0);

  const shipping = subtotal > 999 ? 0 : 79;
  const grandTotal = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Logo */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                <ShoppingBag className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">FitScope</h1>
                <p className="text-sm text-gray-500">Secure Shopping Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Secure Checkout</span>
              </div>
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                <Shield className="w-4 h-4 text-blue-500" />
                <span>SSL Encrypted</span>
              </div>
            </div>
          </div>
          
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Complete Your <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Purchase</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Review your items, enter your details, and choose your preferred payment method.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <div className="w-24 h-1 bg-blue-600 mx-4"></div>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <div className="w-24 h-1 bg-blue-200 mx-4"></div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-gray-600 font-bold">
                3
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Customer Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Customer Details Card */}
            <div className="bg-white rounded-2xl shadow-2xl border border-blue-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-5">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Shipping Information</h2>
                    <p className="text-blue-100 text-sm">Where should we deliver your order?</p>
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center">
                      <User className="w-4 h-4 mr-2 text-blue-500" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={customer.name}
                      onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                      className="w-full border-2 border-gray-200 rounded-xl p-4 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-blue-500" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={customer.email}
                      onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                      className="w-full border-2 border-gray-200 rounded-xl p-4 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-blue-500" />
                      Phone Number *
                    </label>
                    <input
                      type="text"
                      placeholder="+91 98765 43210"
                      value={customer.phone}
                      onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                      className="w-full border-2 border-gray-200 rounded-xl p-4 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                      Delivery Address *
                    </label>
                    <textarea
                      placeholder="House No., Street, City, State, Pincode"
                      value={customer.address}
                      onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                      rows="3"
                      className="w-full border-2 border-gray-200 rounded-xl p-4 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all resize-none"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Methods Section */}
            <div className="bg-white rounded-2xl shadow-2xl border border-green-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-emerald-700 px-8 py-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4">
                      <CreditCard className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Select Payment Method</h2>
                      <p className="text-green-100 text-sm">Choose how you'd like to pay</p>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center bg-white/20 backdrop-blur-sm px-5 py-2 rounded-xl">
                    <Lock className="w-5 h-5 text-white mr-2" />
                    <span className="font-medium text-white">256-bit SSL Secure</span>
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                {/* Payment Options Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {/* Credit/Debit Card */}
                  <div 
                    onClick={() => setPaymentMethod("CARD")}
                    className={`border-2 rounded-2xl p-5 cursor-pointer transition-all transform hover:-translate-y-1 ${paymentMethod === "CARD" 
                      ? "border-blue-500 bg-blue-50 shadow-lg" 
                      : "border-gray-200 hover:border-blue-300 hover:shadow-md"}`}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${paymentMethod === "CARD" 
                        ? "bg-gradient-to-br from-blue-100 to-indigo-100" 
                        : "bg-gray-100"}`}>
                        <CreditCard className={`w-8 h-8 ${paymentMethod === "CARD" ? "text-blue-600" : "text-gray-500"}`} />
                      </div>
                      <h3 className="font-bold text-gray-800 text-lg mb-2">Credit/Debit Card</h3>
                      <p className="text-sm text-gray-600 mb-3">Pay with Visa, MasterCard, RuPay</p>
                      <div className="flex space-x-2">
                        <div className="w-8 h-5 bg-blue-600 rounded text-[7px] text-white flex items-center justify-center font-bold">VISA</div>
                        <div className="w-8 h-5 bg-red-600 rounded text-[7px] text-white flex items-center justify-center font-bold">MC</div>
                        <div className="w-8 h-5 bg-orange-500 rounded text-[7px] text-white flex items-center justify-center font-bold">RP</div>
                      </div>
                    </div>
                    {paymentMethod === "CARD" && (
                      <div className="mt-4 pt-4 border-t border-blue-200">
                        <div className="space-y-3">
                          <input type="text" placeholder="Card Number" className="w-full border rounded-lg px-3 py-2 text-sm" />
                          <div className="grid grid-cols-2 gap-3">
                            <input type="text" placeholder="MM/YY" className="border rounded-lg px-3 py-2 text-sm" />
                            <input type="text" placeholder="CVV" className="border rounded-lg px-3 py-2 text-sm" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* UPI */}
                  <div 
                    onClick={() => setPaymentMethod("UPI")}
                    className={`border-2 rounded-2xl p-5 cursor-pointer transition-all transform hover:-translate-y-1 ${paymentMethod === "UPI" 
                      ? "border-purple-500 bg-purple-50 shadow-lg" 
                      : "border-gray-200 hover:border-purple-300 hover:shadow-md"}`}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${paymentMethod === "UPI" 
                        ? "bg-gradient-to-br from-purple-100 to-pink-100" 
                        : "bg-gray-100"}`}>
                        <UpiIcon className={`w-8 h-8 ${paymentMethod === "UPI" ? "text-purple-600" : "text-gray-500"}`} />
                      </div>
                      <h3 className="font-bold text-gray-800 text-lg mb-2">UPI</h3>
                      <p className="text-sm text-gray-600 mb-3">Google Pay, PhonePe, Paytm</p>
                      <div className="flex space-x-2">
                        <div className="w-8 h-5 bg-teal-500 rounded text-[7px] text-white flex items-center justify-center font-bold">GPay</div>
                        <div className="w-8 h-5 bg-blue-500 rounded text-[7px] text-white flex items-center justify-center font-bold">PP</div>
                        <div className="w-8 h-5 bg-blue-400 rounded text-[7px] text-white flex items-center justify-center font-bold">PT</div>
                      </div>
                    </div>
                  </div>

                  {/* Cash on Delivery */}
                  <div 
                    onClick={() => setPaymentMethod("COD")}
                    className={`border-2 rounded-2xl p-5 cursor-pointer transition-all transform hover:-translate-y-1 ${paymentMethod === "COD" 
                      ? "border-green-500 bg-green-50 shadow-lg" 
                      : "border-gray-200 hover:border-green-300 hover:shadow-md"}`}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${paymentMethod === "COD" 
                        ? "bg-gradient-to-br from-green-100 to-emerald-100" 
                        : "bg-gray-100"}`}>
                        <Banknote className={`w-8 h-8 ${paymentMethod === "COD" ? "text-green-600" : "text-gray-500"}`} />
                      </div>
                      <h3 className="font-bold text-gray-800 text-lg mb-2">Cash on Delivery</h3>
                      <p className="text-sm text-gray-600 mb-3">Pay when you receive</p>
                      <div className="flex items-center text-green-600 text-sm">
                        <Truck className="w-4 h-4 mr-1" />
                        <span>Contactless Delivery</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Processor Logos */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-4 text-center">Trusted by millions • Secured by</p>
                  <div className="flex flex-wrap justify-center items-center gap-6">
                    <img src="https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/razorpay.svg" alt="Razorpay" className="h-8 w-auto opacity-80 hover:opacity-100 transition-opacity" />
                    <img src="https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/stripe.svg" alt="Stripe" className="h-8 w-auto opacity-80 hover:opacity-100 transition-opacity" />
                    <img src="https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/paypal.svg" alt="PayPal" className="h-8 w-auto opacity-80 hover:opacity-100 transition-opacity" />
                    <img src="https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/visa.svg" alt="Visa" className="h-6 w-auto opacity-80 hover:opacity-100 transition-opacity" />
                    <img src="https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/mastercard.svg" alt="MasterCard" className="h-6 w-auto opacity-80 hover:opacity-100 transition-opacity" />
                    <img src="https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/googlepay.svg" alt="Google Pay" className="h-6 w-auto opacity-80 hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl shadow-2xl border border-purple-100 overflow-hidden">
                {/* Order Summary Header */}
                <div className="bg-gradient-to-r from-purple-600 to-indigo-700 px-6 py-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mr-3">
                        <Receipt className="w-5 h-5 text-white" />
                      </div>
                      <h2 className="text-xl font-bold text-white">Order Summary</h2>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-sm font-medium text-white">{products.length} item{products.length !== 1 ? 's' : ''}</span>
                    </div>
                  </div>
                </div>

                {/* Products List - Larger Images */}
                <div className="p-6">
                  <div className="space-y-5 max-h-[400px] overflow-y-auto pr-2">
                    {products.map((product) => {
                      const price = product.discount > 0
                        ? product.price - (product.price * product.discount) / 100
                        : product.price;
                      const quantity = quantities[product._id];
                      const total = price * quantity;

                      return (
                        <div key={product._id} className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 border border-gray-200">
                          <div className="flex gap-4">
                            {/* Larger Product Image */}
                            <div className="relative flex-shrink-0">
                              <div className="w-28 h-28 rounded-xl overflow-hidden shadow-md">
                                <img
                                  src={
                                    product.images?.[0]
                                      ? `${API_URL}/${product.images[0]}`
                                      : "/placeholder.jpg"
                                  }
                                  alt={product.name}
                                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                />
                              </div>
                              {product.discount > 0 && (
                                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                                  -{product.discount}%
                                </div>
                              )}
                            </div>
                            
                            {/* Product Details */}
                            <div className="flex-1">
                              <h3 className="font-bold text-gray-900 line-clamp-2 mb-2">{product.name}</h3>
                              
                              <div className="flex items-center justify-between mb-3">
                                <div>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-lg font-bold text-gray-900">₹{price}</span>
                                    {product.discount > 0 && (
                                      <span className="text-sm text-gray-500 line-through">₹{product.price}</span>
                                    )}
                                  </div>
                                  <div className="text-sm text-gray-600 mt-1">₹{price} × {quantity}</div>
                                </div>
                              </div>
                              
                              {/* Quantity Controls */}
                              <div className="flex items-center justify-between">
                                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                                  <button 
                                    onClick={() => handleQuantityChange(product._id, Math.max(1, quantity - 1))}
                                    className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-gray-200 rounded-md transition-colors"
                                  >
                                    -
                                  </button>
                                  <input
                                    type="number"
                                    className="w-12 text-center bg-transparent border-none focus:outline-none text-gray-900 font-medium"
                                    value={quantity}
                                    onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                                    min={1}
                                  />
                                  <button 
                                    onClick={() => handleQuantityChange(product._id, quantity + 1)}
                                    className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-gray-200 rounded-md transition-colors"
                                  >
                                    +
                                  </button>
                                </div>
                                <div className="text-right">
                                  <div className="text-lg font-bold text-blue-600">₹{total}</div>
                                  <div className="text-xs text-gray-500">Item total</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Price Breakdown - Simplified */}
                  <div className="mt-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold text-gray-900">₹{subtotal.toFixed(2)}</span>
                    </div>
                    
                    
                    
                    {/* Total Amount */}
                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-gray-900">Total Amount</span>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-blue-600">₹{grandTotal.toFixed(2)}</div>
                          <div className="text-sm text-gray-500">All inclusive</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Simplified Savings Note */}
                  <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center mr-3">
                        <Gift className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">You're saving money!</p>
                        <p className="text-sm text-gray-600">Free shipping on orders over ₹999</p>
                      </div>
                    </div>
                  </div>

                  {/* Place Order Button */}
                  <button
                    onClick={handlePlaceOrder}
                    className="w-full mt-6 py-4 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center group"
                  >
                    <Lock className="w-5 h-5 mr-2" />
                    <span>Pay ₹{grandTotal.toFixed(2)} Securely</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                  </button>

                  {/* Trust Badges */}
                  <div className="mt-6 grid grid-cols-3 gap-4">
                    <div className="flex flex-col items-center p-3 bg-gray-50 rounded-xl">
                      <Shield className="w-6 h-6 text-green-600 mb-2" />
                      <span className="text-xs font-medium text-gray-700 text-center">100% Secure</span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-gray-50 rounded-xl">
                      <Package className="w-6 h-6 text-blue-600 mb-2" />
                      <span className="text-xs font-medium text-gray-700 text-center">Easy Returns</span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-gray-50 rounded-xl">
                      <Clock className="w-6 h-6 text-purple-600 mb-2" />
                      <span className="text-xs font-medium text-gray-700 text-center">24/7 Support</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Guarantee Banner */}
              <div className="mt-4 bg-gradient-to-r from-white to-blue-50 rounded-2xl p-4 shadow-lg border border-blue-200">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mr-3">
                    <Award className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Shop with Confidence</p>
                    <p className="text-sm text-gray-600">30-day return policy • Price match guarantee</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Why Shop With Us?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Millions of happy customers trust our secure platform for their shopping needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Free Shipping</h4>
              <p className="text-sm text-gray-600">On orders over ₹999</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Secure Payment</h4>
              <p className="text-sm text-gray-600">256-bit SSL encryption</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Quality Checked</h4>
              <p className="text-sm text-gray-600">Every product verified</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-amber-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">24/7 Support</h4>
              <p className="text-sm text-gray-600">Always here to help</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;