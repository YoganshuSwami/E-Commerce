"use client";
import React from "react";
import Link from "next/link";
import { C } from "../lib/data";
import { Instagram, Facebook, Twitter, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full text-white pt-24 pb-12" style={{ backgroundColor: C.oxblood, fontFamily: "Inter, sans-serif" }}>
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-24 mb-20 border-b border-white/20 pb-20">
          
          {/* Brand & Newsletter */}
          <div className="md:col-span-2">
            <h2 className="text-4xl md:text-5xl mb-6" style={{ fontFamily: "Fraunces, serif", color: C.cream }}>
              Aavaran
            </h2>
            <p className="text-white/80 max-w-sm mb-10 text-sm leading-relaxed">
              Elevating traditional Indian ethnic wear with modern sensibilities. Meticulously crafted kurtis and co-ord sets for the contemporary woman.
            </p>
            
            <div className="max-w-md relative mt-4">
              <span className="block text-xs uppercase tracking-widest text-white/60 mb-4">Subscribe to our newsletter</span>
              <div className="flex border-b border-white/40 pb-2">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="bg-transparent w-full text-sm placeholder-white/40 focus:outline-none text-white"
                />
                <button className="text-white hover:text-white/70 transition-colors">
                  <ArrowRight size={20} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div className="flex flex-col gap-6">
            <h3 className="text-xs uppercase tracking-[0.2em] text-white/60 font-semibold mb-2">Shop</h3>
            <Link href="/products" className="text-sm hover:text-white/70 transition-colors w-fit">All Collections</Link>
            <Link href="/products?cat=kurti" className="text-sm hover:text-white/70 transition-colors w-fit">Kurtis</Link>
            <Link href="/products?cat=set" className="text-sm hover:text-white/70 transition-colors w-fit">Co-ord Sets</Link>
            <Link href="/products?cat=pant" className="text-sm hover:text-white/70 transition-colors w-fit">Bottoms</Link>
            <Link href="/" className="text-sm hover:text-white/70 transition-colors w-fit">New Arrivals</Link>
          </div>

          {/* Support Links */}
          <div className="flex flex-col gap-6">
            <h3 className="text-xs uppercase tracking-[0.2em] text-white/60 font-semibold mb-2">Support</h3>
            <Link href="/contact" className="text-sm hover:text-white/70 transition-colors w-fit">Contact Us</Link>
            <Link href="/faq" className="text-sm hover:text-white/70 transition-colors w-fit">FAQ</Link>
            <Link href="/shipping" className="text-sm hover:text-white/70 transition-colors w-fit">Shipping & Returns</Link>
            <Link href="/terms" className="text-sm hover:text-white/70 transition-colors w-fit">Terms of Service</Link>
            <Link href="/privacy" className="text-sm hover:text-white/70 transition-colors w-fit">Privacy Policy</Link>
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white/70 transition-colors"><Instagram size={20} strokeWidth={1.5} /></a>
            <a href="#" className="hover:text-white/70 transition-colors"><Facebook size={20} strokeWidth={1.5} /></a>
            <a href="#" className="hover:text-white/70 transition-colors"><Twitter size={20} strokeWidth={1.5} /></a>
          </div>
          
          <p className="text-xs text-white/50 tracking-widest">
            © {new Date().getFullYear()} AAVARAN ETHNIC WEAR. ALL RIGHTS RESERVED.
          </p>
          
          <div className="flex gap-4 text-xs text-white/50">
            <span>INR (₹)</span>
            <span>INDIA</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
