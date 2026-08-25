"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { C } from "../lib/data";

export default function ProductCard({ product, onAdd }) {
  const [hover, setHover] = useState(false);
  const router = useRouter();
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  const handleCardClick = () => {
    router.push(`/products/${product.slug}`);
  };

  const handleAddClick = (e) => {
    e.stopPropagation();
    onAdd(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      <div style={{ position: "relative", aspectRatio: "3/4", borderRadius: 4, overflow: "hidden" }}>
        <Image 
          src={product.images[0]} 
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          style={{ objectFit: "cover", transform: hover ? "scale(1.05)" : "scale(1)", transition: "transform 0.5s ease" }}
        />
        {product.tag && (
          <span style={{
            position: "absolute", top: 10, left: 10, background: C.ink, color: C.cream,
            fontSize: 10, letterSpacing: "0.08em", padding: "4px 9px", fontFamily: "Inter, sans-serif",
            fontWeight: 600, borderRadius: 2, textTransform: "uppercase",
          }}>
            {product.tag}
          </span>
        )}
        <div
          style={{
            position: "absolute", left: 0, right: 0, bottom: 0,
            transform: hover ? "translateY(0)" : "translateY(100%)",
            transition: "transform 0.25s ease", padding: 8,
          }}
        >
          <button
            onClick={handleAddClick}
            style={{
              width: "100%", background: C.cream, color: C.ink, border: "none",
              padding: "10px 0", fontFamily: "Inter, sans-serif", fontSize: 12.5,
              fontWeight: 600, letterSpacing: "0.04em", borderRadius: 2, cursor: "pointer",
            }}
          >
            + QUICK ADD
          </button>
        </div>
      </div>
      <div className="pt-3">
        <div style={{ fontFamily: "Fraunces, serif", fontSize: 15.5, color: C.ink }}>{product.name}</div>
        <div className="flex items-center gap-2 pt-1">
          <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 14, color: C.ink }}>
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: "#9c9088", textDecoration: "line-through" }}>
            ₹{product.mrp.toLocaleString("en-IN")}
          </span>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11.5, color: C.oxblood, fontWeight: 600 }}>
            {discount}% off
          </span>
        </div>
      </div>
    </motion.div>
  );
}
