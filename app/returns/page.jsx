"use client";
import React from "react";
import { C } from "../../lib/data";

export default function ReturnsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-16">
      <h1 style={{ fontFamily: "Fraunces, serif", fontSize: 40, color: C.ink, marginBottom: 32 }}>Returns & Exchanges</h1>
      
      <div className="flex flex-col gap-8" style={{ fontFamily: "Inter, sans-serif", fontSize: 16, color: "#444", lineHeight: 1.8 }}>
        <section>
          <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 24, color: C.ink, marginBottom: 16 }}>7-Day Return Policy</h2>
          <p>
            We offer a hassle-free 7-day return and exchange policy. If you are not satisfied with your purchase, you can return or exchange the product within 7 days of delivery.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 24, color: C.ink, marginBottom: 16 }}>Conditions for Return</h2>
          <ul className="list-disc pl-5">
            <li>Products must be unused, unwashed, and in their original condition.</li>
            <li>All original tags and packaging must be intact.</li>
            <li>Customized or altered items are not eligible for return.</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 24, color: C.ink, marginBottom: 16 }}>How to Initiate a Return</h2>
          <p>
            To initiate a return, please log in to your account and go to the "My Orders" section, or contact our support team at hello@aavaran.com with your order ID.
          </p>
        </section>
      </div>
    </div>
  );
}
