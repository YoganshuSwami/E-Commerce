"use client";
import React from "react";
import Link from "next/link";
import { Instagram, Facebook, Twitter, Phone, Mail, MapPin } from "lucide-react";
import { C } from "../lib/data";

export default function Footer() {
  return (
    <footer style={{ background: C.bottle, color: C.cream, padding: "48px 0 24px" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <div style={{ fontFamily: "Fraunces, serif", fontSize: 32, fontWeight: 600, color: C.gold, marginBottom: 24, letterSpacing: "-0.02em" }}>
              Aavaran
            </div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: `${C.cream}aa`, lineHeight: 1.6, marginBottom: 24 }}>
              Redefining modern ethnic wear for the contemporary Indian woman. Crafted with care, designed to stand out.
            </p>
            <div className="flex gap-4">
              <Instagram size={20} color={C.gold} />
              <Facebook size={20} color={C.gold} />
              <Twitter size={20} color={C.gold} />
            </div>
          </div>
          
          <div>
            <h4 style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 24, fontSize: 13, color: C.gold }}>
              Shop
            </h4>
            <div className="flex flex-col gap-3" style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: `${C.cream}aa` }}>
              <Link href="/products" className="hover:text-gold transition-colors">All Products</Link>
              <Link href="/products" className="hover:text-gold transition-colors">New Arrivals</Link>
              <Link href="/products" className="hover:text-gold transition-colors">Best Sellers</Link>
            </div>
          </div>

          <div>
            <h4 style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 24, fontSize: 13, color: C.gold }}>
              Customer Care
            </h4>
            <div className="flex flex-col gap-3" style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: `${C.cream}aa` }}>
              <Link href="/contact" className="hover:text-gold transition-colors">Contact Us</Link>
              <Link href="/faq" className="hover:text-gold transition-colors">FAQs</Link>
              <Link href="/returns" className="hover:text-gold transition-colors">Returns & Exchanges</Link>
              <Link href="/shipping" className="hover:text-gold transition-colors">Shipping Policy</Link>
            </div>
          </div>

          <div>
            <h4 style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 24, fontSize: 13, color: C.gold }}>
              Contact
            </h4>
            <div className="flex flex-col gap-4" style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: `${C.cream}aa` }}>
              <div className="flex items-start gap-3">
                <MapPin size={18} color={C.gold} className="mt-1 flex-shrink-0" />
                <span>124 Fashion Avenue,<br/>Jaipur, RJ 302001</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} color={C.gold} />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} color={C.gold} />
                <span>hello@aavaran.com</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: `1px solid ${C.cream}33`, paddingTop: 32, display: "flex", flexDirection: "column", md: { flexDirection: "row" }, justifyContent: "space-between", alignItems: "center", gap: 16 }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: `${C.cream}aa` }}>
            © {new Date().getFullYear()} Aavaran. All rights reserved. (Demo)
          </p>
          <div className="flex gap-6" style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: `${C.cream}aa` }}>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
