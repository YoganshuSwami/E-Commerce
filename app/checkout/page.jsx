"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Lock, ShieldCheck, ChevronRight, CheckCircle2, CreditCard, Smartphone, Banknote } from "lucide-react";
import { useStore } from "../../context/StoreContext";
import { C } from "../../lib/data";
import { motion, AnimatePresence } from "framer-motion";

export default function CheckoutPage() {
  const { cart, setCart } = useStore();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
  const [paymentMethod, setPaymentMethod] = useState("card"); // card, upi, cod
  const [isProcessing, setIsProcessing] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
    }, 1500);
  };

  // Success State
  if (step === 3) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4" style={{ fontFamily: "Inter, sans-serif" }}>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="bg-white p-10 rounded-2xl shadow-xl max-w-lg w-full text-center border border-gray-100"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
            className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 size={48} strokeWidth={1.5} />
          </motion.div>
          
          <h1 className="text-3xl mb-4 text-gray-900" style={{ fontFamily: "Fraunces, serif" }}>Order Placed!</h1>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Thank you for shopping with Aavaran. Your order <span className="font-medium text-black">#AAV-{Math.floor(100000 + Math.random() * 900000)}</span> has been confirmed. We'll send you a shipping confirmation email shortly.
          </p>

          <Link 
            href="/products" 
            onClick={() => setCart && setCart([])} // Clear cart on exit
            className="block w-full py-4 bg-black text-white text-xs tracking-widest uppercase hover:bg-black/90 transition-all rounded-sm"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFFFF]" style={{ fontFamily: "Inter, sans-serif" }}>
        <h2 className="text-2xl font-light mb-6">Your bag is empty</h2>
        <Link 
          href="/products" 
          className="px-8 py-4 text-xs tracking-widest uppercase bg-black text-white hover:bg-black/90 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Distraction-free Header */}
      <header className="py-8 border-b border-gray-100 flex justify-center sticky top-0 bg-white z-10">
        <Link href="/" className="text-3xl tracking-widest uppercase hover:opacity-80 transition-opacity" style={{ fontFamily: "Fraunces, serif", color: C.ink }}>
          AAVARAN
        </Link>
      </header>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12 flex flex-col-reverse lg:flex-row gap-12 lg:gap-24">
        
        {/* Left: Forms */}
        <div className="flex-1">
          {/* Steps */}
          <div className="flex items-center gap-3 text-[10px] md:text-xs uppercase tracking-widest text-gray-400 mb-10">
            <Link href="/cart" className="hover:text-black transition-colors">Cart</Link>
            <ChevronRight size={14} />
            <span className={step === 1 ? "text-black font-semibold" : "cursor-pointer hover:text-black transition-colors"} onClick={() => setStep(1)}>Information</span>
            <ChevronRight size={14} />
            <span className={step === 2 ? "text-black font-semibold" : ""}>Payment</span>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-xl"
              >
                <div className="mb-10">
                  <h2 className="text-xl md:text-2xl mb-6 text-gray-900" style={{ fontFamily: "Fraunces, serif" }}>Contact Information</h2>
                  <input type="email" placeholder="Email address or mobile phone number" className="w-full border border-gray-300 rounded-sm p-4 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all" />
                </div>

                <div className="mb-10">
                  <h2 className="text-xl md:text-2xl mb-6 text-gray-900" style={{ fontFamily: "Fraunces, serif" }}>Shipping Address</h2>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <input type="text" placeholder="First name" className="w-full border border-gray-300 rounded-sm p-4 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all" />
                    <input type="text" placeholder="Last name" className="w-full border border-gray-300 rounded-sm p-4 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all" />
                  </div>
                  <input type="text" placeholder="Address" className="w-full border border-gray-300 rounded-sm p-4 mb-4 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all" />
                  <input type="text" placeholder="Apartment, suite, etc. (optional)" className="w-full border border-gray-300 rounded-sm p-4 mb-4 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all" />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <input type="text" placeholder="City" className="w-full border border-gray-300 rounded-sm p-4 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all" />
                    <input type="text" placeholder="State" className="w-full border border-gray-300 rounded-sm p-4 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all" />
                    <input type="text" placeholder="PIN Code" className="w-full border border-gray-300 rounded-sm p-4 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all" />
                  </div>
                </div>

                <button 
                  onClick={() => setStep(2)}
                  className="w-full md:w-auto md:px-12 py-4 md:py-5 bg-black text-white text-xs tracking-widest uppercase hover:bg-gray-900 transition-all rounded-sm shadow-md hover:shadow-lg"
                >
                  Continue to Payment
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-xl"
              >
                {/* Summary Box */}
                <div className="border border-gray-200 rounded-lg p-5 mb-10 text-sm bg-gray-50/50">
                  <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
                    <span className="text-gray-500 w-20">Contact</span>
                    <span className="flex-1 text-gray-900 font-medium">demo@example.com</span>
                    <button onClick={() => setStep(1)} className="text-[10px] tracking-widest uppercase text-gray-500 hover:text-black transition-colors font-semibold">Change</button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 w-20">Ship to</span>
                    <span className="flex-1 text-gray-900 font-medium truncate">123 Main St, Jaipur, Rajasthan</span>
                    <button onClick={() => setStep(1)} className="text-[10px] tracking-widest uppercase text-gray-500 hover:text-black transition-colors font-semibold">Change</button>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl md:text-2xl text-gray-900" style={{ fontFamily: "Fraunces, serif" }}>Payment</h2>
                  <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    <Lock size={12} /> Secure
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-6">All transactions are secure and encrypted.</p>

                {/* Payment Options */}
                <div className="border border-gray-300 rounded-lg overflow-hidden mb-8">
                  
                  {/* Card Option */}
                  <label className={`block cursor-pointer border-b border-gray-200 transition-colors ${paymentMethod === "card" ? "bg-gray-50/80" : "hover:bg-gray-50/50"}`}>
                    <div className="p-5 flex items-center gap-4">
                      <input 
                        type="radio" 
                        name="payment" 
                        value="card" 
                        checked={paymentMethod === "card"} 
                        onChange={() => setPaymentMethod("card")}
                        className="accent-black w-4 h-4"
                      />
                      <CreditCard size={20} className={paymentMethod === "card" ? "text-black" : "text-gray-400"} />
                      <span className={`font-medium ${paymentMethod === "card" ? "text-black" : "text-gray-600"}`}>Credit / Debit Card</span>
                    </div>
                    {/* Card Form */}
                    <AnimatePresence>
                      {paymentMethod === "card" && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-5 pb-5 overflow-hidden"
                        >
                          <input type="text" placeholder="Card number" className="w-full border border-gray-300 rounded-sm p-3.5 mb-3 text-sm focus:outline-none focus:border-black bg-white transition-colors" />
                          <div className="grid grid-cols-2 gap-3 mb-3">
                            <input type="text" placeholder="Expiration (MM/YY)" className="w-full border border-gray-300 rounded-sm p-3.5 text-sm focus:outline-none focus:border-black bg-white transition-colors" />
                            <input type="text" placeholder="CVV" className="w-full border border-gray-300 rounded-sm p-3.5 text-sm focus:outline-none focus:border-black bg-white transition-colors" />
                          </div>
                          <input type="text" placeholder="Name on card" className="w-full border border-gray-300 rounded-sm p-3.5 text-sm focus:outline-none focus:border-black bg-white transition-colors" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </label>

                  {/* UPI Option */}
                  <label className={`block cursor-pointer border-b border-gray-200 transition-colors ${paymentMethod === "upi" ? "bg-gray-50/80" : "hover:bg-gray-50/50"}`}>
                    <div className="p-5 flex items-center gap-4">
                      <input 
                        type="radio" 
                        name="payment" 
                        value="upi" 
                        checked={paymentMethod === "upi"} 
                        onChange={() => setPaymentMethod("upi")}
                        className="accent-black w-4 h-4"
                      />
                      <Smartphone size={20} className={paymentMethod === "upi" ? "text-black" : "text-gray-400"} />
                      <span className={`font-medium ${paymentMethod === "upi" ? "text-black" : "text-gray-600"}`}>UPI / QR</span>
                    </div>
                    {/* UPI Form */}
                    <AnimatePresence>
                      {paymentMethod === "upi" && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-5 pb-5 overflow-hidden"
                        >
                          <p className="text-xs text-gray-500 mb-3">Enter your VPA (Virtual Payment Address)</p>
                          <input type="text" placeholder="e.g. 9876543210@ybl" className="w-full border border-gray-300 rounded-sm p-3.5 text-sm focus:outline-none focus:border-black bg-white transition-colors" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </label>

                  {/* COD Option */}
                  <label className={`block cursor-pointer transition-colors ${paymentMethod === "cod" ? "bg-gray-50/80" : "hover:bg-gray-50/50"}`}>
                    <div className="p-5 flex items-center gap-4">
                      <input 
                        type="radio" 
                        name="payment" 
                        value="cod" 
                        checked={paymentMethod === "cod"} 
                        onChange={() => setPaymentMethod("cod")}
                        className="accent-black w-4 h-4"
                      />
                      <Banknote size={20} className={paymentMethod === "cod" ? "text-black" : "text-gray-400"} />
                      <span className={`font-medium ${paymentMethod === "cod" ? "text-black" : "text-gray-600"}`}>Cash on Delivery (COD)</span>
                    </div>
                    {/* COD Info */}
                    <AnimatePresence>
                      {paymentMethod === "cod" && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-5 pb-5 overflow-hidden"
                        >
                          <p className="text-sm text-gray-600 bg-white p-4 border border-gray-200 rounded-sm">
                            Pay with cash or UPI upon delivery. Please ensure you have the exact amount.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </label>

                </div>

                <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-6 md:gap-0 mt-8">
                  <button onClick={() => setStep(1)} className="text-[10px] md:text-xs tracking-widest uppercase hover:underline text-gray-500 hover:text-black font-medium transition-colors">
                    Return to Information
                  </button>
                  <button 
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="w-full md:w-auto px-10 py-5 bg-black text-white text-xs tracking-[0.15em] uppercase hover:bg-gray-900 transition-all rounded-sm shadow-md hover:shadow-lg flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Processing...
                      </span>
                    ) : (
                      <>
                        <ShieldCheck size={16} /> Pay ₹{total.toLocaleString("en-IN")}
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Order Summary (Sticky) */}
        <div className="w-full lg:w-[420px]">
          <div className="bg-gray-50/80 border border-gray-100 p-6 md:p-8 rounded-xl sticky top-32">
            <h3 className="text-sm font-semibold tracking-widest uppercase mb-6 pb-4 border-b border-gray-200 text-gray-900">Order Summary</h3>
            
            <div className="flex flex-col gap-5 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
              {cart.map((item, idx) => (
                <div key={`${item.id}-${item.size}-${idx}`} className="flex gap-4 items-center group">
                  <div className="relative w-16 h-20 bg-white border border-gray-200 rounded-md overflow-hidden shrink-0">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <span className="absolute -top-2 -right-2 bg-gray-900 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium shadow-sm z-10">
                      {item.qty}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-gray-900 leading-snug">{item.name}</p>
                    <p className="text-[11px] uppercase tracking-wider text-gray-500 mt-1">Size: {item.size}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900 shrink-0">₹{(item.price * item.qty).toLocaleString("en-IN")}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-6 space-y-4 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">₹{total.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-medium tracking-wide text-xs uppercase">Free</span>
              </div>
            </div>

            <div className="border-t border-gray-200 mt-6 pt-6 flex justify-between items-center">
              <span className="text-sm font-semibold tracking-widest uppercase text-gray-900">Total</span>
              <span className="text-3xl font-medium text-gray-900" style={{ fontFamily: "Fraunces, serif" }}>
                <span className="text-sm align-top mr-1 font-sans text-gray-500 font-normal tracking-wide">INR</span>
                ₹{total.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scrollbar styling for summary box */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 4px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background: #d1d5db;
        }
      `}</style>
    </div>
  );
}
