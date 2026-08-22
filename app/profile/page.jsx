"use client";
import React, { useState } from "react";
import Link from "next/link";
import { User, LogOut, Search } from "lucide-react";
import { useStore } from "../../context/StoreContext";
import { toast } from "sonner";
import { C } from "../../lib/data";

export default function ProfilePage() {
  const { user, setUser } = useStore();
  
  // Dummy local state for the form
  const [firstName, setFirstName] = useState("Jane");
  const [lastName, setLastName] = useState("Doe");
  const [email, setEmail] = useState(user?.email || "jane@example.com");

  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white" style={{ fontFamily: "Inter, sans-serif" }}>
        <h1 style={{ fontFamily: "Fraunces, serif" }} className="text-3xl text-black mb-4">Account Access</h1>
        <p className="text-gray-500 mb-8">Please log in to view your profile.</p>
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
              <Link href="/profile" className="text-black font-semibold border-b border-black pb-1 w-fit">
                Profile Details
              </Link>
              <Link href="/orders" className="text-gray-500 hover:text-black transition-colors w-fit">
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
          <div className="flex-1 max-w-2xl">
            <h2 className="text-2xl mb-8" style={{ fontFamily: "Fraunces, serif" }}>Profile Information</h2>
            <p className="text-sm text-gray-500 mb-10" style={{ fontFamily: "Inter, sans-serif" }}>
              Update your personal details here. These details will be used at checkout to speed up your purchase.
            </p>
            
            <form className="flex flex-col gap-8" style={{ fontFamily: "Inter, sans-serif" }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative">
                  <input 
                    type="text" 
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="peer w-full border-b border-gray-300 py-2 placeholder-transparent focus:outline-none focus:border-black transition-colors bg-transparent text-sm"
                    placeholder="First Name"
                  />
                  <label 
                    htmlFor="firstName"
                    className="absolute left-0 -top-3.5 text-xs text-gray-500 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-black"
                  >
                    First Name
                  </label>
                </div>
                
                <div className="relative">
                  <input 
                    type="text" 
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="peer w-full border-b border-gray-300 py-2 placeholder-transparent focus:outline-none focus:border-black transition-colors bg-transparent text-sm"
                    placeholder="Last Name"
                  />
                  <label 
                    htmlFor="lastName"
                    className="absolute left-0 -top-3.5 text-xs text-gray-500 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-black"
                  >
                    Last Name
                  </label>
                </div>
              </div>
              
              <div className="relative">
                <input 
                  type="email" 
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="peer w-full border-b border-gray-300 py-2 placeholder-transparent focus:outline-none focus:border-black transition-colors bg-transparent text-sm"
                  placeholder="Email"
                />
                <label 
                  htmlFor="email"
                  className="absolute left-0 -top-3.5 text-xs text-gray-500 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-black"
                >
                  Email Address
                </label>
              </div>

              <div className="relative opacity-60">
                <input 
                  type="tel" 
                  id="phone"
                  value={user.phone || "+91 98765 43210"}
                  readOnly
                  className="w-full border-b border-gray-300 py-2 bg-transparent text-sm cursor-not-allowed"
                />
                <label className="absolute left-0 -top-3.5 text-xs text-gray-500">
                  Phone Number (Verified)
                </label>
              </div>

              <div className="mt-8 flex justify-end">
                <button 
                  type="button" 
                  onClick={() => toast.success("Profile updated successfully!")}
                  className="px-10 py-4 bg-black text-white text-xs tracking-widest uppercase hover:bg-black/90 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
          
        </div>
      </div>
    </div>
  );
}
