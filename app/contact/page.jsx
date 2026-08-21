"use client";
import React from "react";
import { C } from "../../lib/data";
import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-16">
      <h1 style={{ fontFamily: "Fraunces, serif", fontSize: 40, color: C.ink, marginBottom: 16, textAlign: "center" }}>Contact Us</h1>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: 16, color: "#666", textAlign: "center", marginBottom: 48 }}>We'd love to hear from you. Please reach out with any questions.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div style={{ fontFamily: "Inter, sans-serif" }}>
          <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 24, color: C.ink, marginBottom: 24 }}>Get in Touch</h2>
          <div className="flex flex-col gap-6" style={{ color: "#444" }}>
            <div className="flex items-start gap-4">
              <MapPin size={24} color={C.oxblood} className="mt-1 flex-shrink-0" />
              <div>
                <strong className="block text-ink mb-1">Our Studio</strong>
                124 Fashion Avenue,<br/>Jaipur, RJ 302001
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Phone size={24} color={C.oxblood} />
              <div>
                <strong className="block text-ink mb-1">Phone</strong>
                +91 98765 43210
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Mail size={24} color={C.oxblood} />
              <div>
                <strong className="block text-ink mb-1">Email</strong>
                hello@aavaran.com
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <form className="flex flex-col gap-4" style={{ fontFamily: "Inter, sans-serif" }}>
            <input type="text" placeholder="Name" required className="p-3 border rounded focus:outline-none focus:ring-1" style={{ borderColor: C.line }} />
            <input type="email" placeholder="Email" required className="p-3 border rounded focus:outline-none focus:ring-1" style={{ borderColor: C.line }} />
            <textarea placeholder="Message" rows={5} required className="p-3 border rounded focus:outline-none focus:ring-1" style={{ borderColor: C.line }}></textarea>
            <button type="submit" className="py-3 text-white rounded font-medium mt-2 transition-colors hover:bg-oxbloodDark" style={{ background: C.oxblood }}>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
