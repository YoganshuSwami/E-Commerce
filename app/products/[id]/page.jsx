"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useStore } from "../../../context/StoreContext";
import { PRODUCTS, C } from "../../../lib/data";
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "../../../components/ProductCard";
import { toast } from "sonner";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useStore();
  
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState("M");
  const [openAccordion, setOpenAccordion] = useState("details");
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  useEffect(() => {
    if (id) {
      const found = PRODUCTS.find((p) => String(p.id) === id);
      if (found) setProduct(found);
    }
  }, [id]);

  if (!product) return <div className="py-32 text-center text-lg font-['Inter']">Loading...</div>;

  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const recommended = PRODUCTS.filter((p) => p.cat === product.cat && p.id !== product.id).slice(0, 4);
  if (recommended.length < 4) {
    PRODUCTS.filter((p) => p.id !== product.id && !recommended.includes(p)).slice(0, 4 - recommended.length).forEach(p => recommended.push(p));
  }

  const handleAdd = () => {
    addToCart(product, size, 1);
    toast.success(`${product.name} (Size: ${size}) added to cart!`);
  };

  const handleBuyNow = () => {
    addToCart(product, size, 1);
    router.push("/checkout");
  };

  const nextImg = () => {
    setCurrentImageIdx((prev) => (prev + 1) % product.images.length);
  };

  const prevImg = () => {
    setCurrentImageIdx((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  return (
    <div className="bg-[#FFFFFF] min-h-screen pb-24 md:pb-0">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-4 md:py-16">
        
        {/* Breadcrumb (Hidden on Mobile for cleaner UX) */}
        <nav className="hidden md:flex text-[11px] uppercase tracking-widest text-gray-400 mb-12" style={{ fontFamily: "Inter, sans-serif" }}>
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span className="mx-3">/</span>
          <Link href="/products" className="hover:text-black transition-colors">Shop</Link>
          <span className="mx-3">/</span>
          <span className="text-black font-medium">{product.name}</span>
        </nav>

        {/* 2-Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 mb-16 md:mb-32">
          
          {/* LEFT: Image Carousel */}
          <div className="w-full lg:w-3/5 flex flex-col md:flex-row gap-4">
            
            {/* Desktop Thumbnails (Hidden on mobile) */}
            <div className="hidden md:flex flex-col gap-4 w-24 shrink-0">
              {product.images.map((imgUrl, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setCurrentImageIdx(idx)}
                  className={`relative w-full aspect-[3/4] overflow-hidden border-2 transition-all ${currentImageIdx === idx ? 'border-black' : 'border-transparent hover:border-gray-300'}`}
                >
                  <Image src={imgUrl} alt="Thumbnail" fill style={{ objectFit: "cover" }} />
                </button>
              ))}
            </div>

            {/* Main Carousel Viewport */}
            <div className="relative w-full aspect-[3/4] bg-gray-50 overflow-hidden">
              <Image 
                src={product.images[currentImageIdx]} 
                alt={`${product.name} - View ${currentImageIdx + 1}`} 
                fill 
                sizes="(max-width: 1024px) 100vw, 60vw"
                style={{ objectFit: "cover" }}
                priority
              />
              
              {/* Arrows */}
              {product.images.length > 1 && (
                <>
                  <button onClick={prevImg} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 shadow-sm p-1.5 md:p-2 rounded-full hover:bg-white hover:scale-110 transition-all z-10 text-gray-700">
                    <ChevronLeft size={20} />
                  </button>
                  <button onClick={nextImg} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 shadow-sm p-1.5 md:p-2 rounded-full hover:bg-white hover:scale-110 transition-all z-10 text-gray-700">
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {/* Mobile Dots */}
              {product.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex md:hidden gap-2 z-10 bg-black/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                  {product.images.map((_, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => setCurrentImageIdx(idx)}
                      className={`w-2 h-2 rounded-full transition-colors ${currentImageIdx === idx ? 'bg-white' : 'bg-white/50'}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Product Details */}
          <div className="w-full lg:w-2/5">
            <div className="sticky top-[100px]">
              
              <h1 className="text-3xl md:text-5xl mb-2 md:mb-4" style={{ fontFamily: "Fraunces, serif", color: C.ink, lineHeight: 1.1 }}>
                {product.name}
              </h1>
              
              <div className="flex items-baseline gap-3 mb-6 md:mb-8">
                <span className="text-xl md:text-2xl font-medium" style={{ fontFamily: "Inter, sans-serif", color: C.ink }}>
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                <span className="text-base md:text-lg text-gray-400 line-through" style={{ fontFamily: "Inter, sans-serif" }}>
                  ₹{product.mrp.toLocaleString("en-IN")}
                </span>
                {discount > 0 && (
                  <span className="text-[10px] md:text-xs uppercase tracking-widest font-semibold px-2 py-1" style={{ background: C.oxblood, color: C.cream, fontFamily: "Inter, sans-serif" }}>
                    {discount}% Off
                  </span>
                )}
              </div>

              {/* Sizes */}
              <div className="mb-8 md:mb-10">
                <div className="flex justify-between items-end mb-4">
                  <span className="text-xs uppercase tracking-widest text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>Select Size</span>
                  <button className="text-[10px] md:text-[11px] uppercase tracking-widest text-gray-400 hover:text-black underline transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>Size Guide</button>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {sizes.map(s => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`h-10 md:h-12 border flex items-center justify-center text-sm transition-all duration-300 ${size === s ? "border-black bg-black text-white" : "border-gray-200 text-gray-600 hover:border-black"}`}
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sticky Mobile / Standard Desktop Action Buttons */}
              <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 flex gap-2 z-50 md:relative md:border-none md:p-0 md:bg-transparent md:mb-12">
                <button 
                  onClick={handleAdd}
                  className="flex-1 h-12 md:h-14 flex items-center justify-center text-xs md:text-sm uppercase tracking-[0.15em] font-semibold transition-all duration-500 hover:opacity-90 border border-black bg-white text-black"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Add To Bag
                </button>
                <button 
                  onClick={handleBuyNow}
                  className="flex-1 h-12 md:h-14 flex items-center justify-center text-xs md:text-sm uppercase tracking-[0.15em] font-semibold transition-all duration-500 hover:opacity-90"
                  style={{ background: C.oxblood, color: C.cream, fontFamily: "Inter, sans-serif" }}
                >
                  Buy Now
                </button>
              </div>

              {/* Accordions */}
              <div className="border-t border-gray-200 mt-6 md:mt-0" style={{ fontFamily: "Inter, sans-serif" }}>
                {/* Details */}
                <div className="border-b border-gray-200">
                  <button 
                    className="w-full py-5 md:py-6 flex justify-between items-center text-[11px] md:text-sm uppercase tracking-widest hover:text-black text-gray-600 transition-colors" 
                    onClick={() => setOpenAccordion(openAccordion === "details" ? "" : "details")}
                  >
                    <span>Editor's Notes</span>
                    {openAccordion === "details" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  <div className={`overflow-hidden transition-all duration-500 ${openAccordion === "details" ? "max-h-96 pb-5 md:pb-6 opacity-100" : "max-h-0 opacity-0"}`}>
                    <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-4">
                      A modern take on traditional ethnic wear. The {product.name.toLowerCase()} is crafted from premium, breathable fabric, designed for an elegant drape and day-long comfort.
                    </p>
                    <ul className="text-gray-500 text-xs md:text-sm leading-relaxed list-disc pl-4 space-y-1">
                      <li>Model is 5'9" and wears size S</li>
                      <li>True to size fit</li>
                      <li>Intricate artisanal detailing</li>
                    </ul>
                  </div>
                </div>

                {/* Fabric & Care */}
                <div className="border-b border-gray-200">
                  <button 
                    className="w-full py-5 md:py-6 flex justify-between items-center text-[11px] md:text-sm uppercase tracking-widest hover:text-black text-gray-600 transition-colors" 
                    onClick={() => setOpenAccordion(openAccordion === "care" ? "" : "care")}
                  >
                    <span>Fabric & Care</span>
                    {openAccordion === "care" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  <div className={`overflow-hidden transition-all duration-500 ${openAccordion === "care" ? "max-h-96 pb-5 md:pb-6 opacity-100" : "max-h-0 opacity-0"}`}>
                    <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                      Dry clean only. Do not bleach. Iron on reverse. Store in a cool, dry place to maintain the integrity of the fabric and detailing.
                    </p>
                  </div>
                </div>

                {/* Shipping */}
                <div className="border-b border-gray-200">
                  <button 
                    className="w-full py-5 md:py-6 flex justify-between items-center text-[11px] md:text-sm uppercase tracking-widest hover:text-black text-gray-600 transition-colors" 
                    onClick={() => setOpenAccordion(openAccordion === "shipping" ? "" : "shipping")}
                  >
                    <span>Delivery & Returns</span>
                    {openAccordion === "shipping" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  <div className={`overflow-hidden transition-all duration-500 ${openAccordion === "shipping" ? "max-h-96 pb-5 md:pb-6 opacity-100" : "max-h-0 opacity-0"}`}>
                    <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                      Complimentary express shipping on orders over ₹5,000. Returns are accepted within 7 days of delivery, provided the item is unworn with original tags attached.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Recommendations (Horizontal Scroll on Mobile) */}
        <section className="pt-12 md:pt-24 border-t border-gray-100">
          <h2 className="text-left md:text-center mb-8 md:mb-16 text-xl md:text-2xl" style={{ fontFamily: "Fraunces, serif", color: C.ink }}>
            Complete The Look
          </h2>
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:grid md:grid-cols-4 md:gap-8 pb-8 md:pb-0 hide-scrollbar" style={{ scrollbarWidth: 'none' }}>
            {recommended.map((prod) => (
              <div key={prod.id} className="min-w-[70vw] sm:min-w-[45vw] md:min-w-0 snap-start shrink-0">
                <ProductCard product={prod} onAdd={(p) => { addToCart(p, "M", 1); toast.success(`${p.name} added!`); }} />
              </div>
            ))}
          </div>
        </section>
      </div>
      
      {/* Global style to hide scrollbar for horizontal carousels */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
