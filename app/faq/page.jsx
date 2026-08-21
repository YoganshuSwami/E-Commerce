"use client";
import React from "react";
import { C } from "../../lib/data";

export default function FAQPage() {
  const faqs = [
    { q: "How long does shipping take?", a: "Standard shipping takes 3-5 business days. Express shipping takes 1-2 business days." },
    { q: "Do you offer Cash on Delivery?", a: "Yes, we offer Cash on Delivery (COD) on all orders across India." },
    { q: "How can I track my order?", a: "Once your order is shipped, you will receive a tracking link via email and SMS." },
    { q: "Can I change my order after placing it?", a: "You can change or cancel your order within 24 hours of placing it. Please contact support." }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-16">
      <h1 style={{ fontFamily: "Fraunces, serif", fontSize: 40, color: C.ink, marginBottom: 16, textAlign: "center" }}>FAQs</h1>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: 16, color: "#666", textAlign: "center", marginBottom: 48 }}>Frequently asked questions.</p>
      
      <div className="flex flex-col gap-6" style={{ fontFamily: "Inter, sans-serif" }}>
        {faqs.map((faq, i) => (
          <div key={i} className="p-6 border rounded" style={{ borderColor: C.line }}>
            <h3 className="font-semibold text-lg mb-2" style={{ color: C.ink }}>{faq.q}</h3>
            <p style={{ color: "#555", lineHeight: 1.6 }}>{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
