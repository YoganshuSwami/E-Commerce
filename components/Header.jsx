"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { C } from "../lib/data";
import LoginModal from "./LoginModal";
import SearchOverlay from "./SearchOverlay";

export default function Header() {
  const { cartCount, user } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      {/* Announcement Bar */}
      <div style={{ background: C.oxblood, color: C.cream, textAlign: "center", padding: "8px 0", fontSize: 12.5, letterSpacing: "0.04em", fontFamily: "Inter, sans-serif", fontWeight: 500 }}>
        FREE SHIPPING ON ORDERS OVER ₹1999 | CASH ON DELIVERY AVAILABLE
      </div>

      <header style={{ position: "sticky", top: 0, zIndex: 40, background: C.cream, borderBottom: `1px solid ${C.line}` }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
          
          {/* Mobile Menu Icon */}
          <div className="md:hidden flex-1">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Nav Links (Desktop) */}
          <nav className="hidden md:flex flex-1 items-center gap-8" style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase" }}>
            <Link href="/products" className="hover:text-oxblood transition-colors">Shop</Link>
            <Link href="/about" className="hover:text-oxblood transition-colors">Our Story</Link>
          </nav>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 text-center flex-1 md:flex-none">
            <div style={{ fontFamily: "Fraunces, serif", fontSize: 26, fontWeight: 600, color: C.ink, letterSpacing: "-0.02em" }}>
              Aavaran
            </div>
          </Link>

          {/* Icons */}
          <div className="flex flex-1 justify-end items-center gap-4 md:gap-6">
            <button className="hidden md:block hover:opacity-70 transition-opacity" onClick={() => setSearchOpen(true)}>
              <Search size={20} strokeWidth={1.5} />
            </button>
            <button className="hover:opacity-70 transition-opacity" onClick={() => user ? window.location.href='/profile' : setLoginOpen(true)}>
              <User size={20} strokeWidth={1.5} fill={user ? "black" : "none"} />
            </button>
            <Link href="/cart" style={{ position: "relative" }} className="hover:opacity-70 transition-opacity">
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span style={{
                  position: "absolute", top: -6, right: -8, background: C.oxblood, color: C.cream,
                  fontSize: 10, fontWeight: 600, width: 16, height: 16, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-cream border-b p-4 shadow-lg" style={{ background: C.cream, borderBottom: `1px solid ${C.line}` }}>
            <nav className="flex flex-col gap-4" style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500 }}>
              <Link href="/products" onClick={() => setMenuOpen(false)}>Shop</Link>
              <Link href="/about" onClick={() => setMenuOpen(false)}>Our Story</Link>
            </nav>
          </div>
        )}
      </header>
      
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      {loginOpen && <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />}
    </>
  );
}
