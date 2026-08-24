"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { PRODUCTS, C } from "../lib/data";
import ProductCard from "../components/ProductCard";
import { useStore } from "../context/StoreContext";

export default function Home() {
  const { addToCart } = useStore();
  const newArrivals = PRODUCTS.filter((p) => p.tag === "New").slice(0, 4);
  const bestSellers = PRODUCTS.filter((p) => p.tag === "Bestseller").slice(0, 4);

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div className="bg-[#FFFFFF]">
      
      {/* HERO SECTION */}
      <section className="relative h-[90vh] md:h-screen w-full overflow-hidden flex items-center justify-center">
        <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
          <Image 
            src="/images/kurti_red.jpg" 
            alt="Hero Background" 
            fill 
            sizes="100vw" 
            style={{ objectFit: "cover", objectPosition: "top center" }} 
            priority 
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-8xl text-white mb-6 tracking-tight"
            style={{ fontFamily: "Fraunces, serif", lineHeight: 1.1 }}
          >
            The New <br className="md:hidden" /> Standard of <br className="hidden md:block" /> Ethnic Wear
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-white/80 text-sm md:text-base tracking-[0.2em] uppercase mb-10"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Meticulously crafted for the modern woman
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link 
              href="/products" 
              className="inline-block bg-white text-black px-10 py-4 text-xs tracking-[0.2em] uppercase font-semibold hover:bg-black hover:text-white transition-colors duration-500"
            >
              Discover Collection
            </Link>
          </motion.div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="w-full bg-black py-4 overflow-hidden whitespace-nowrap flex text-white/90 text-xs tracking-[0.3em] uppercase border-y border-gray-800">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex gap-16"
        >
          <span>Free Shipping Across India</span>
          <span>•</span>
          <span>Artisanal Craftsmanship</span>
          <span>•</span>
          <span>Premium Sustainable Fabrics</span>
          <span>•</span>
          <span>Easy 7-Day Returns</span>
          <span>•</span>
          <span>Free Shipping Across India</span>
          <span>•</span>
          <span>Artisanal Craftsmanship</span>
          <span>•</span>
          <span>Premium Sustainable Fabrics</span>
          <span>•</span>
          <span>Easy 7-Day Returns</span>
        </motion.div>
      </div>

      {/* NEW ARRIVALS (Editorial Grid) */}
      <section className="max-w-[1600px] mx-auto px-4 md:px-8 py-24 md:py-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <h2 className="text-4xl md:text-5xl" style={{ fontFamily: "Fraunces, serif", color: C.ink }}>
            New Arrivals
          </h2>
          <Link href="/products" className="text-xs tracking-[0.2em] uppercase border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12 md:gap-8">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={(p) => addToCart(p, "M", 1)} />
          ))}
        </div>
      </section>

      {/* CATEGORY HIGHLIGHT (Asymmetric) */}
      <section className="bg-gray-50 py-24 md:py-32">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
            <div className="w-full lg:w-1/2 relative aspect-[4/5] overflow-hidden">
              <Image 
                src="/images/coord_olive.jpg" 
                alt="Co-ord Sets Collection" 
                fill 
                sizes="(max-width: 1024px) 100vw, 50vw" 
                style={{ objectFit: "cover" }} 
              />
            </div>
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <span className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-6 block">Featured Category</span>
              <h2 className="text-4xl md:text-6xl mb-8 leading-tight" style={{ fontFamily: "Fraunces, serif", color: C.ink }}>
                The <br className="hidden lg:block"/> Co-ord Edit
              </h2>
              <p className="text-gray-500 mb-10 max-w-md mx-auto lg:mx-0 leading-relaxed text-sm md:text-base">
                Effortless style meets supreme comfort. Our curated collection of co-ord sets is designed for those who appreciate seamlessly matched elegance. Perfect for lounging or stepping out.
              </p>
              <Link 
                href="/products?cat=sets" 
                className="inline-block border border-black text-black px-10 py-4 text-xs tracking-[0.2em] uppercase font-semibold hover:bg-black hover:text-white transition-colors duration-500"
              >
                Explore Sets
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="max-w-[1600px] mx-auto px-4 md:px-8 py-24 md:py-32 border-b border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <h2 className="text-4xl md:text-5xl" style={{ fontFamily: "Fraunces, serif", color: C.ink }}>
            Signature Styles
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12 md:gap-8">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={(p) => addToCart(p, "M", 1)} />
          ))}
        </div>
      </section>

      {/* BRAND ETHOS */}
      <section className="py-24 text-center max-w-2xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl mb-6" style={{ fontFamily: "Fraunces, serif", color: C.ink }}>
          Aavaran means 'to envelop'
        </h2>
        <p className="text-gray-500 text-sm md:text-base leading-relaxed">
          We believe clothing is the closest environment we create for ourselves. Our pieces are designed to envelop you in confidence, comfort, and uncompromising quality.
        </p>
      </section>
    </div>
  );
}
