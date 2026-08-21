"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { C } from "../lib/data";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginModal({ isOpen, onClose }) {
  const { setUser } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ email, name: email.split("@")[0], phone: "+91 98765 43210" });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-md bg-white shadow-2xl"
        >
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black transition-colors z-10"
          >
            <X size={20} strokeWidth={1.5} />
          </button>

          <div className="p-10 md:p-12">
            <h2 className="text-3xl text-center mb-2" style={{ fontFamily: "Fraunces, serif", color: C.ink }}>
              Sign In
            </h2>
            <p className="text-center text-gray-500 text-xs tracking-widest uppercase mb-10" style={{ fontFamily: "Inter, sans-serif" }}>
              Access your Aavaran account
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6" style={{ fontFamily: "Inter, sans-serif" }}>
              <div className="relative">
                <input 
                  type="email" 
                  id="email"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  className="peer w-full border-b border-gray-300 py-2 placeholder-transparent focus:outline-none focus:border-black transition-colors bg-transparent text-sm"
                  placeholder="Email"
                />
                <label 
                  htmlFor="email"
                  className="absolute left-0 -top-3.5 text-xs text-gray-500 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-black"
                >
                  Email address
                </label>
              </div>
              
              <div className="relative">
                <input 
                  type="password" 
                  id="password"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  className="peer w-full border-b border-gray-300 py-2 placeholder-transparent focus:outline-none focus:border-black transition-colors bg-transparent text-sm"
                  placeholder="Password"
                />
                <label 
                  htmlFor="password"
                  className="absolute left-0 -top-3.5 text-xs text-gray-500 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-black"
                >
                  Password
                </label>
              </div>
              
              <div className="flex justify-between items-center mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="accent-black w-3.5 h-3.5" />
                  <span className="text-xs text-gray-500">Remember me</span>
                </label>
                <a href="#" className="text-xs text-gray-500 hover:text-black transition-colors border-b border-transparent hover:border-black pb-0.5">
                  Forgot password?
                </a>
              </div>

              <button 
                type="submit" 
                className="w-full mt-4 py-4 text-xs tracking-[0.2em] uppercase font-medium transition-all hover:bg-black/90"
                style={{ background: C.ink, color: C.cream }}
              >
                Sign In
              </button>

              <div className="text-center mt-6">
                <span className="text-xs text-gray-500">New to Aavaran? </span>
                <a href="/signup" onClick={onClose} className="text-xs text-black border-b border-black pb-0.5 hover:opacity-70 transition-opacity">
                  Create an account
                </a>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
