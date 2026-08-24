"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { C } from "../lib/data";
import LoginModal from "./LoginModal";
import SearchOverlay from "./SearchOverlay";
import { usePathname } from "next/navigation";

export default function Header() {
  const { cartCount, user } = useStore();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? "py-1 shadow-md" : "py-2"} backdrop-blur-md`}
        style={{ backgroundColor: isScrolled ? "rgba(107, 30, 42, 0.95)" : C.oxblood, color: C.cream }}
      >
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 flex items-center justify-between">
          
          {/* Mobile Menu Icon */}
          <div className="md:hidden flex-1 flex items-center gap-4">
            <button onClick={() => setMenuOpen(!menuOpen)} className="hover:opacity-70 transition-opacity">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <button className="hover:text-white/70 transition-colors" onClick={() => setSearchOpen(true)}>
              <Search size={20} strokeWidth={1.5} />
            </button>
          </div>

          {/* Nav Links (Desktop) */}
          <nav className="hidden md:flex flex-1 items-center gap-10" style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            <div className="group relative py-2">
              <Link href="/products" className="hover:text-white/70 transition-colors">Shop</Link>
              {/* Simple Mega Menu Dropdown */}
              <div className="absolute top-full left-0 mt-0 w-48 bg-white text-black shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-100 flex flex-col py-4 px-6 rounded-sm">
                <Link href="/products?cat=kurti" className="text-xs mb-4 hover:text-gray-500">Kurtis</Link>
                <Link href="/products?cat=set" className="text-xs mb-4 hover:text-gray-500">Co-ord Sets</Link>
                <Link href="/products?cat=pant" className="text-xs hover:text-gray-500">Bottoms</Link>
              </div>
            </div>
            <Link href="/about" className="hover:text-white/70 transition-colors py-2">Our Story</Link>
          </nav>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 text-center flex-1 md:flex-none">
            <div style={{ fontFamily: "Fraunces, serif", fontSize: 26, fontWeight: 500, color: C.cream, letterSpacing: "0.02em" }}>
              Aavaran
            </div>
          </Link>

          {/* Icons */}
          <div className="flex flex-1 justify-end items-center gap-6 md:gap-8">
            <button className="hidden md:block hover:text-white/70 transition-colors" onClick={() => setSearchOpen(true)}>
              <Search size={20} strokeWidth={1.5} />
            </button>
            <button className="hover:text-white/70 transition-colors" onClick={() => user ? window.location.href='/profile' : setLoginOpen(true)}>
              <User size={20} strokeWidth={1.5} fill={user ? C.cream : "none"} />
            </button>
            <Link href="/cart" className="relative hover:text-white/70 transition-colors">
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-white text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 h-screen p-8" style={{ backgroundColor: C.oxblood, color: C.cream }}>
            <nav className="flex flex-col gap-8 text-xl" style={{ fontFamily: "Fraunces, serif" }}>
              <Link href="/products" onClick={() => setMenuOpen(false)}>Shop Collection</Link>
              <Link href="/products?cat=kurti" className="text-base text-white/70" onClick={() => setMenuOpen(false)}>Kurtis</Link>
              <Link href="/products?cat=set" className="text-base text-white/70" onClick={() => setMenuOpen(false)}>Co-ord Sets</Link>
              <Link href="/products?cat=pant" className="text-base text-white/70" onClick={() => setMenuOpen(false)}>Bottoms</Link>
              <div className="h-px bg-white/20 my-4" />
              <Link href="/about" onClick={() => setMenuOpen(false)}>Our Story</Link>
              <button className="text-left flex items-center gap-4" onClick={() => { setMenuOpen(false); setSearchOpen(true); }}>
                Search <Search size={20} />
              </button>
            </nav>
          </div>
        )}
      </header>
      
      {/* Spacer to push content below fixed header */}
      <div className="h-[56px] md:h-[64px]" />
      
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      {loginOpen && <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />}
    </>
  );
}
