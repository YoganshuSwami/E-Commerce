"use client";
import React from "react";
import { C } from "../../lib/data";

export default function ShippingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-16">
      <h1 style={{ fontFamily: "Fraunces, serif", fontSize: 40, color: C.ink, marginBottom: 32 }}>Shipping Policy</h1>
      
      <div className="flex flex-col gap-8" style={{ fontFamily: "Inter, sans-serif", fontSize: 16, color: "#444", lineHeight: 1.8 }}>
        <section>
          <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 24, color: C.ink, marginBottom: 16 }}>Shipping Timelines</h2>
          <p>
            All orders are processed within 1-2 business days. Standard delivery takes 3-5 business days across India. Deliveries to remote locations may take up to 7 business days.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 24, color: C.ink, marginBottom: 16 }}>Shipping Charges</h2>
          <p>
            We offer <strong>Free Standard Shipping</strong> on all orders above ₹1999. For orders below ₹1999, a flat shipping fee of ₹99 applies.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 24, color: C.ink, marginBottom: 16 }}>Order Tracking</h2>
          <p>
            Once your order has been dispatched, you will receive an email and SMS with your tracking details. You can track the status of your shipment on our website under the "Track Order" section.
          </p>
        </section>
      </div>
    </div>
  );
}
