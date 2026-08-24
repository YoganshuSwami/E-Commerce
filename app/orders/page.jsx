"use client";
import React from "react";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { useStore } from "../../context/StoreContext";
import { C } from "../../lib/data";

export default function OrdersPage() {
  const { user, setUser } = useStore();

  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white" style={{ fontFamily: "Inter, sans-serif" }}>
        <h1 style={{ fontFamily: "Fraunces, serif" }} className="text-3xl text-black mb-4">Account Access</h1>
        <p className="text-gray-500 mb-8">Please log in to view your orders.</p>
        <button 
          onClick={() => window.location.href='/'} 
          className="px-8 py-3 bg-black text-white text-xs tracking-[0.2em] uppercase hover:bg-black/90 transition-colors"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-16 md:py-24">
        
        <h1 className="text-4xl md:text-5xl mb-16" style={{ fontFamily: "Fraunces, serif", color: C.ink }}>
          My Account
        </h1>
        
        <div className="flex flex-col md:flex-row gap-16 lg:gap-24">
          
          {/* Sidebar */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="mb-12 pb-8 border-b border-gray-200">
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-2" style={{ fontFamily: "Inter, sans-serif" }}>Welcome Back,</p>
              <p className="text-2xl" style={{ fontFamily: "Fraunces, serif" }}>{user.name || "Jane"}</p>
            </div>
            
            <nav className="flex flex-col gap-6 text-sm uppercase tracking-widest" style={{ fontFamily: "Inter, sans-serif" }}>
              <Link href="/profile" className="text-gray-500 hover:text-black transition-colors w-fit">
                Profile Details
              </Link>
              <Link href="/orders" className="text-black font-semibold border-b border-black pb-1 w-fit">
                Order History
              </Link>
              <Link href="#" className="text-gray-500 hover:text-black transition-colors w-fit">
                Addresses
              </Link>
              <button 
                onClick={() => { setUser(null); window.location.href = '/'; }} 
                className="text-left text-red-700 hover:text-red-900 transition-colors flex items-center gap-2 mt-8"
              >
                <LogOut size={16} /> Sign Out
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="flex-1 max-w-4xl">
            <h2 className="text-2xl mb-8" style={{ fontFamily: "Fraunces, serif" }}>Order History</h2>
            
            <div className="flex flex-col gap-8" style={{ fontFamily: "Inter, sans-serif" }}>
              {/* Dummy Order 1 */}
              <div className="border border-gray-200 rounded-sm p-6 md:p-8 hover:shadow-lg transition-shadow bg-gray-50">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6 border-b border-gray-200 pb-6">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Order Placed</p>
                    <p className="text-sm font-medium">October 12, 2026</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Total</p>
                    <p className="text-sm font-medium">₹2,898</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Order #</p>
                    <p className="text-sm font-medium">AAV-8472-X91</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs uppercase tracking-widest font-semibold rounded-full">
                      Delivered
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-24 h-32 bg-white shrink-0 relative overflow-hidden border border-gray-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/kurti_red.jpg" alt="Item" className="object-cover w-full h-full" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium mb-1" style={{ fontFamily: "Fraunces, serif" }}>Meera Bell-Sleeve Kurti</h3>
                    <p className="text-sm text-gray-500 mb-4">Size: M | Qty: 1</p>
                    <div className="flex gap-4">
                      <button className="text-xs uppercase tracking-widest border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors">
                        Buy Again
                      </button>
                      <button className="text-xs uppercase tracking-widest border border-gray-300 px-4 py-2 hover:border-black transition-colors">
                        View Item
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dummy Order 2 */}
              <div className="border border-gray-200 rounded-sm p-6 md:p-8 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6 border-b border-gray-200 pb-6">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Order Placed</p>
                    <p className="text-sm font-medium">September 04, 2026</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Total</p>
                    <p className="text-sm font-medium">₹1,899</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Order #</p>
                    <p className="text-sm font-medium">AAV-3912-Y77</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs uppercase tracking-widest font-semibold rounded-full">
                      Returned
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-24 h-32 bg-white shrink-0 relative overflow-hidden border border-gray-200 opacity-60">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/coord_olive.jpg" alt="Item" className="object-cover w-full h-full" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium mb-1" style={{ fontFamily: "Fraunces, serif" }}>Tara Cotton Co-ord Set</h3>
                    <p className="text-sm text-gray-500 mb-4">Size: S | Qty: 1</p>
                    <div className="flex gap-4">
                      <button onClick={() => toast.success("Added to cart!")} className="text-xs uppercase tracking-widest border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors">
                        Buy Again
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
          
        </div>
      </div>
    </div>
  );
}
