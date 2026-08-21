"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Search } from "lucide-react";
import { PRODUCTS, C } from "../lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      setQuery("");
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length > 1) {
      const q = query.toLowerCase();
      const filtered = PRODUCTS.filter(
        (p) => p.name.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q) || p.type.toLowerCase().includes(q)
      );
      setResults(filtered.slice(0, 6)); // max 6 results
    } else {
      setResults([]);
    }
  }, [query]);

  const handleResultClick = (id) => {
    onClose();
    router.push(`/products/${id}`);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex flex-col bg-white/95 backdrop-blur-md">
        
        {/* Header / Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-[1600px] mx-auto px-4 md:px-8 pt-8 md:pt-16 pb-8 border-b border-gray-200 flex items-center justify-between gap-4"
        >
          <div className="flex-1 flex items-center gap-4">
            <Search size={28} className="text-gray-400 shrink-0" strokeWidth={1.5} />
            <input 
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for kurtis, sets, pants..."
              className="w-full text-2xl md:text-5xl bg-transparent focus:outline-none placeholder-gray-300 text-black"
              style={{ fontFamily: "Fraunces, serif" }}
            />
          </div>
          <button 
            onClick={onClose}
            className="p-4 text-gray-500 hover:text-black transition-colors shrink-0"
          >
            <X size={32} strokeWidth={1} />
          </button>
        </motion.div>

        {/* Results Area */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex-1 overflow-y-auto px-4 md:px-8 py-12 max-w-[1600px] mx-auto w-full"
        >
          {query.trim().length <= 1 ? (
            <div className="flex flex-col md:flex-row gap-16 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
              <div>
                <h3 className="text-gray-400 tracking-widest uppercase mb-6 font-semibold text-xs">Trending Searches</h3>
                <ul className="flex flex-col gap-4 text-gray-800">
                  <li><button onClick={() => setQuery("Sets")} className="hover:text-gray-400 transition-colors">Co-ord Sets</button></li>
                  <li><button onClick={() => setQuery("Bell")} className="hover:text-gray-400 transition-colors">Bell Sleeve Kurtis</button></li>
                  <li><button onClick={() => setQuery("Pants")} className="hover:text-gray-400 transition-colors">Linen Pants</button></li>
                </ul>
              </div>
              <div>
                <h3 className="text-gray-400 tracking-widest uppercase mb-6 font-semibold text-xs">Categories</h3>
                <ul className="flex flex-col gap-4 text-gray-800">
                  <li><Link href="/products?cat=kurti" onClick={onClose} className="hover:text-gray-400 transition-colors">All Kurtis</Link></li>
                  <li><Link href="/products?cat=set" onClick={onClose} className="hover:text-gray-400 transition-colors">All Sets</Link></li>
                </ul>
              </div>
            </div>
          ) : results.length > 0 ? (
            <div>
              <h3 className="text-gray-400 tracking-widest uppercase mb-8 font-semibold text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
                Products
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-12">
                {results.map(product => (
                  <div key={product.id} className="cursor-pointer group" onClick={() => handleResultClick(product.id)}>
                    <div className="relative aspect-[3/4] mb-4 bg-gray-50 overflow-hidden">
                      <Image 
                        src={product.images[0]} 
                        alt={product.name} 
                        fill 
                        sizes="200px" 
                        style={{ objectFit: "cover" }} 
                        className="group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <h4 className="text-sm font-medium mb-1 leading-snug" style={{ fontFamily: "Fraunces, serif" }}>{product.name}</h4>
                    <p className="text-xs text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>₹{product.price.toLocaleString("en-IN")}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-24 text-gray-500 text-lg" style={{ fontFamily: "Fraunces, serif" }}>
              No results found for "{query}"
            </div>
          )}
        </motion.div>

      </div>
    </AnimatePresence>
  );
}
