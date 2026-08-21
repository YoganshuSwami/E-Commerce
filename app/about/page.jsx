"use client";
import React from "react";
import Image from "next/image";
import { C } from "../../lib/data";

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section style={{ height: "60vh", background: C.bottle, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url(https://images.pexels.com/photos/3317434/pexels-photo-3317434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.3 }} />
        <div className="relative z-10 text-center px-4" style={{ color: C.cream }}>
          <h1 style={{ fontFamily: "Fraunces, serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", marginBottom: 16 }}>Our Story</h1>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 18, letterSpacing: "0.05em", opacity: 0.9 }}>Redefining the modern Indian wardrobe.</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 max-w-4xl mx-auto px-4 md:px-8 text-center" style={{ color: C.ink }}>
        <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 32, marginBottom: 32 }}>Rooted in Tradition, Designed for Today</h2>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 16, lineHeight: 1.8, color: "#555", marginBottom: 24 }}>
          Aavaran was born out of a desire to bridge the gap between traditional Indian craftsmanship and contemporary fashion. We believe that ethnic wear doesn't have to be reserved for special occasions—it can be an everyday expression of your identity.
        </p>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 16, lineHeight: 1.8, color: "#555", marginBottom: 48 }}>
          Every piece in our collection is carefully curated, focusing on premium fabrics, flattering silhouettes, and timeless designs. From our signature bell-sleeve kurtis to our relaxed co-ord sets, we create clothing that makes you feel confident and comfortable.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          <div className="relative h-96 rounded-lg overflow-hidden">
             <Image src="https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Craftsmanship" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover" }} />
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden">
             <Image src="https://images.pexels.com/photos/2836486/pexels-photo-2836486.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Design" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover" }} />
          </div>
        </div>
      </section>
    </div>
  );
}
