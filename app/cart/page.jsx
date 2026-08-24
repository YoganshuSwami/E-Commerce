"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { useStore } from "../../context/StoreContext";
import { C } from "../../lib/data";

export default function CartPage() {
  const { cart, removeFromCart, updateQty } = useStore();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Free shipping threshold simulation
  const threshold = 5000;
  const progress = Math.min((subtotal / threshold) * 100, 100);
  const remaining = threshold - subtotal;

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#FFFFFF]" style={{ fontFamily: "Inter, sans-serif" }}>
        <h2 className="text-2xl font-light mb-6">Your shopping bag is empty</h2>
        <Link 
          href="/products" 
          className="px-10 py-4 text-xs tracking-widest uppercase bg-black text-white hover:bg-black/90 transition-colors"
        >
          Discover New Arrivals
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFFFF] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-12 md:py-20">
        
        <h1 className="text-4xl text-center mb-16" style={{ fontFamily: "Fraunces, serif", color: C.ink }}>
          Shopping Bag
        </h1>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Cart Items List */}
          <div className="flex-1">
            <div className="border-b border-gray-200 pb-4 mb-8 hidden md:grid grid-cols-12 text-xs uppercase tracking-widest text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>
              <div className="col-span-6">Product</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-3 text-right">Total</div>
            </div>

            <div className="flex flex-col gap-8">
              {cart.map((item) => (
                <div key={`${item.id}-${item.size}`} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-b border-gray-100 pb-8">
                  {/* Image & Info */}
                  <div className="col-span-1 md:col-span-6 flex gap-6">
                    <div className="w-24 md:w-32 aspect-[3/4] relative bg-gray-50 border border-gray-100 shrink-0">
                      <Image src={item.images[0]} alt={item.name} fill sizes="128px" style={{ objectFit: "cover" }} />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="text-base md:text-lg mb-1 leading-snug" style={{ fontFamily: "Fraunces, serif", color: C.ink }}>
                        <Link href={`/products/${item.id}`} className="hover:underline">{item.name}</Link>
                      </h3>
                      <p className="text-sm text-gray-500 mb-2" style={{ fontFamily: "Inter, sans-serif" }}>Size: {item.size}</p>
                      <p className="text-sm font-medium md:hidden mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
                        ₹{item.price.toLocaleString("en-IN")}
                      </p>
                      <button 
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="text-xs uppercase tracking-widest text-gray-400 hover:text-black flex items-center gap-1 transition-colors w-fit"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        <X size={12} /> Remove
                      </button>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="col-span-1 md:col-span-3 flex justify-start md:justify-center">
                    <div className="flex items-center border border-gray-200 h-10 w-28">
                      <button onClick={() => updateQty(item.id, item.size, item.qty - 1)} className="flex-1 h-full flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-black transition-colors"><Minus size={14} /></button>
                      <span className="w-8 text-center text-sm font-medium" style={{ fontFamily: "Inter, sans-serif" }}>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.size, item.qty + 1)} className="flex-1 h-full flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-black transition-colors"><Plus size={14} /></button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="hidden md:block col-span-3 text-right text-base font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
                    ₹{(item.price * item.qty).toLocaleString("en-IN")}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-[380px] shrink-0">
            <div className="bg-gray-50 border border-gray-100 p-8 sticky top-24" style={{ fontFamily: "Inter, sans-serif" }}>
              <h3 className="text-sm tracking-widest uppercase mb-8 border-b border-gray-200 pb-4">Summary</h3>
              
              <div className="flex flex-col gap-4 text-sm text-gray-600 mb-8 border-b border-gray-200 pb-8">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="flex justify-between items-baseline mb-8">
                <span className="text-sm tracking-widest uppercase font-semibold">Total</span>
                <span className="text-2xl" style={{ fontFamily: "Fraunces, serif", color: C.ink }}>
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>

              <Link 
                href="/checkout"
                className="w-full bg-black text-white h-14 flex items-center justify-center text-xs tracking-[0.2em] uppercase font-semibold hover:bg-black/90 transition-all shadow-lg shadow-black/10"
              >
                Checkout
              </Link>
              
              {/* Shipping Progress */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex justify-between text-xs text-gray-500 mb-3 tracking-wide">
                  {remaining > 0 ? (
                    <span>Add ₹{remaining.toLocaleString("en-IN")} for free shipping</span>
                  ) : (
                    <span className="text-green-600 font-medium">You've unlocked free shipping!</span>
                  )}
                </div>
                <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-black transition-all duration-1000 ease-out rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
