"use client";
import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS, CATEGORIES, C } from "../../lib/data";
import ProductCard from "../../components/ProductCard";
import { useStore } from "../../context/StoreContext";
import { Filter, X } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

function ShopContent() {
  const searchParams = useSearchParams();
  const initCat = searchParams.get("cat") || "all";
  
  const { addToCart } = useStore();
  const [activeCat, setActiveCat] = useState(initCat);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const displayed = activeCat === "all" ? PRODUCTS : PRODUCTS.filter(p => p.cat === activeCat || p.type === activeCat);

  const FilterSidebar = () => (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-6 font-semibold">Categories</h3>
        <ul className="flex flex-col gap-4 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
          <li>
            <button 
              onClick={() => { setActiveCat("all"); setMobileFilterOpen(false); }} 
              className={`hover:text-black transition-colors ${activeCat === "all" ? "text-black border-b border-black pb-0.5" : "text-gray-500"}`}
            >
              All Products
            </button>
          </li>
          {CATEGORIES.map((cat) => (
            <li key={cat.id}>
              <button 
                onClick={() => { setActiveCat(cat.id); setMobileFilterOpen(false); }} 
                className={`hover:text-black transition-colors text-left ${activeCat === cat.id ? "text-black border-b border-black pb-0.5" : "text-gray-500"}`}
              >
                {cat.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="bg-[#FFFFFF] min-h-screen">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-8 md:py-16">
        
        {/* Page Header */}
        <div className="flex justify-between items-end mb-12 border-b border-gray-200 pb-8">
          <div>
            <h1 className="text-4xl md:text-5xl mb-2" style={{ fontFamily: "Fraunces, serif", color: C.ink }}>
              {activeCat === "all" ? "All Products" : CATEGORIES.find(c => c.id === activeCat)?.label || "Shop"}
            </h1>
            <p className="text-sm text-gray-500">{displayed.length} items</p>
          </div>
          
          <button 
            className="md:hidden flex items-center gap-2 text-xs uppercase tracking-widest border border-gray-300 px-4 py-2"
            onClick={() => setMobileFilterOpen(true)}
          >
            <Filter size={14} /> Filter
          </button>
        </div>

        <div className="flex gap-12">
          
          {/* Desktop Sidebar */}
          <div className="hidden md:block w-48 shrink-0">
            <div className="sticky top-24">
              <FilterSidebar />
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-8 md:gap-y-16">
              <AnimatePresence>
                {displayed.map((product) => (
                  <motion.div 
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4 }}
                  >
                    <ProductCard product={product} onAdd={(p) => { addToCart(p, "M", 1); toast.success(`${p.name} added!`); }} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {displayed.length === 0 && (
              <div className="text-center py-24 text-gray-500">
                No products found in this category.
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-sm"
              onClick={() => setMobileFilterOpen(false)}
            />
            <motion.div 
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 w-[80vw] max-w-sm bg-white z-50 p-6 md:hidden shadow-2xl flex flex-col"
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-lg" style={{ fontFamily: "Fraunces, serif" }}>Filters</h2>
                <button onClick={() => setMobileFilterOpen(false)} className="p-2 -mr-2"><X size={20} /></button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <FilterSidebar />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
