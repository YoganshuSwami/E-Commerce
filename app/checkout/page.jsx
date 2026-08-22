"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Lock, ShieldCheck, ChevronRight } from "lucide-react";
import { useStore } from "../../context/StoreContext";
import { C } from "../../lib/data";
import { toast } from "sonner";

export default function CheckoutPage() {
  const { cart } = useStore();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment

  const total = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);

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
      <header className="py-8 border-b border-gray-100 flex justify-center">
        <Link href="/" className="text-3xl tracking-widest uppercase" style={{ fontFamily: "Fraunces, serif", color: C.ink }}>
          AAVARAN
        </Link>
      </header>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 flex flex-col-reverse lg:flex-row gap-16 lg:gap-24">
        
        {/* Left: Forms */}
        <div className="flex-1">
          {/* Breadcrumbs / Steps */}
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 mb-12">
            <Link href="/cart" className="hover:text-black">Cart</Link>
            <ChevronRight size={14} />
            <span className={step === 1 ? "text-black font-semibold" : "cursor-pointer hover:text-black"} onClick={() => setStep(1)}>Information</span>
            <ChevronRight size={14} />
            <span className={step === 2 ? "text-black font-semibold" : ""}>Payment</span>
          </div>

          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-xl mb-8" style={{ fontFamily: "Fraunces, serif" }}>Contact Information</h2>
              <input type="email" placeholder="Email address" className="w-full border border-gray-300 rounded-sm p-3.5 mb-10 text-sm focus:outline-none focus:border-black transition-colors" />

              <h2 className="text-xl mb-8" style={{ fontFamily: "Fraunces, serif" }}>Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input type="text" placeholder="First name" className="w-full border border-gray-300 rounded-sm p-3.5 text-sm focus:outline-none focus:border-black transition-colors" />
                <input type="text" placeholder="Last name" className="w-full border border-gray-300 rounded-sm p-3.5 text-sm focus:outline-none focus:border-black transition-colors" />
              </div>
              <input type="text" placeholder="Address" className="w-full border border-gray-300 rounded-sm p-3.5 mb-4 text-sm focus:outline-none focus:border-black transition-colors" />
              <input type="text" placeholder="Apartment, suite, etc. (optional)" className="w-full border border-gray-300 rounded-sm p-3.5 mb-4 text-sm focus:outline-none focus:border-black transition-colors" />
              <div className="grid grid-cols-3 gap-4 mb-10">
                <input type="text" placeholder="City" className="col-span-1 w-full border border-gray-300 rounded-sm p-3.5 text-sm focus:outline-none focus:border-black transition-colors" />
                <input type="text" placeholder="State" className="col-span-1 w-full border border-gray-300 rounded-sm p-3.5 text-sm focus:outline-none focus:border-black transition-colors" />
                <input type="text" placeholder="PIN Code" className="col-span-1 w-full border border-gray-300 rounded-sm p-3.5 text-sm focus:outline-none focus:border-black transition-colors" />
              </div>

              <div className="flex justify-end">
                <button 
                  onClick={() => setStep(2)}
                  className="px-8 py-4 bg-black text-white text-xs tracking-widest uppercase hover:bg-black/90 transition-colors"
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="border border-gray-200 rounded-sm p-4 mb-10 text-sm">
                <div className="flex justify-between border-b border-gray-100 pb-4 mb-4">
                  <span className="text-gray-500">Contact</span>
                  <span>demo@example.com</span>
                  <button onClick={() => setStep(1)} className="text-xs tracking-widest uppercase underline text-gray-500 hover:text-black">Change</button>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Ship to</span>
                  <span>123 Main St, Jaipur, Rajasthan 302001</span>
                  <button onClick={() => setStep(1)} className="text-xs tracking-widest uppercase underline text-gray-500 hover:text-black">Change</button>
                </div>
              </div>

              <h2 className="text-xl mb-6" style={{ fontFamily: "Fraunces, serif" }}>Payment</h2>
              <p className="text-sm text-gray-500 mb-6">All transactions are secure and encrypted.</p>

              <div className="border border-black rounded-sm p-6 mb-10 bg-gray-50 relative">
                <div className="absolute top-4 right-4 flex gap-2">
                  <ShieldCheck size={20} className="text-green-600" />
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <input type="radio" checked readOnly className="accent-black w-4 h-4" />
                  <span className="font-medium">Credit / Debit Card</span>
                </div>
                <input type="text" placeholder="Card number" className="w-full border border-gray-300 rounded-sm p-3.5 mb-4 text-sm focus:outline-none focus:border-black bg-white" />
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input type="text" placeholder="Expiration date (MM/YY)" className="w-full border border-gray-300 rounded-sm p-3.5 text-sm focus:outline-none focus:border-black bg-white" />
                  <input type="text" placeholder="Security code" className="w-full border border-gray-300 rounded-sm p-3.5 text-sm focus:outline-none focus:border-black bg-white" />
                </div>
                <input type="text" placeholder="Name on card" className="w-full border border-gray-300 rounded-sm p-3.5 text-sm focus:outline-none focus:border-black bg-white" />
              </div>

              <div className="flex justify-between items-center">
                <button onClick={() => setStep(1)} className="text-xs tracking-widest uppercase hover:underline text-gray-500 hover:text-black">
                  Return to Information
                </button>
                <button 
                  onClick={() => toast.success("Order Placed Successfully! (Demo)")}
                  className="px-10 py-4 bg-black text-white text-xs tracking-widest uppercase hover:bg-black/90 transition-colors flex items-center gap-2"
                >
                  <Lock size={14} /> Pay ₹{total.toLocaleString("en-IN")}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Order Summary */}
        <div className="w-full lg:w-[400px]">
          <div className="bg-gray-50 border border-gray-100 p-8 sticky top-12">
            <h3 className="text-sm tracking-widest uppercase mb-8 pb-4 border-b border-gray-200">Order Summary</h3>
            
            <div className="flex flex-col gap-6 mb-8">
              {cart.map((item, idx) => (
                <div key={`${item.id}-${item.size}-${idx}`} className="flex gap-4 items-center">
                  <div className="relative w-16 h-20 bg-white border border-gray-200 rounded-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                    <span className="absolute -top-2 -right-2 bg-black text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">
                      {item.qty}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm leading-snug">{item.product.name}</p>
                    <p className="text-xs text-gray-500 mt-1">Size: {item.size}</p>
                  </div>
                  <p className="text-sm">₹{(item.product.price * item.qty).toLocaleString("en-IN")}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-6 space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>Free</span>
              </div>
            </div>

            <div className="border-t border-gray-200 mt-6 pt-6 flex justify-between items-baseline">
              <span className="text-sm tracking-widest uppercase">Total</span>
              <span className="text-2xl font-medium" style={{ fontFamily: "Fraunces, serif" }}>
                <span className="text-xs align-top mr-1 font-sans text-gray-500">INR</span>
                ₹{total.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
