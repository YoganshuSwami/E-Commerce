"use client";
import React from "react";
import { C } from "../../lib/data";

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-16">
      <h1 style={{ fontFamily: "Fraunces, serif", fontSize: 40, color: C.ink, marginBottom: 32 }}>Privacy Policy</h1>
      
      <div className="flex flex-col gap-8" style={{ fontFamily: "Inter, sans-serif", fontSize: 16, color: "#444", lineHeight: 1.8 }}>
        <section>
          <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 24, color: C.ink, marginBottom: 16 }}>1. Information We Collect</h2>
          <p>
            When you visit our demo site (Aavaran), we do not collect any real payment or personal data. This is a demonstration website. However, in a real production environment, we would collect information you provide directly to us when you create an account, make a purchase, or communicate with us.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 24, color: C.ink, marginBottom: 16 }}>2. How We Use Your Information</h2>
          <p>
            We use the information we collect to process transactions, provide customer support, and improve our services. For the purpose of this demo, any information entered is stored locally on your device or in memory and is cleared when you refresh the page.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 24, color: C.ink, marginBottom: 16 }}>3. Cookies and Tracking</h2>
          <p>
            We use cookies to enhance your browsing experience, remember your preferences, and understand how you interact with our website. You can manage your cookie preferences through your browser settings.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 24, color: C.ink, marginBottom: 16 }}>4. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. We use industry-standard encryption for all sensitive data transmission.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 24, color: C.ink, marginBottom: 16 }}>5. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at <strong style={{ color: C.oxblood }}>hello@aavaran.com</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
