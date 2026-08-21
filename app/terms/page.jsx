"use client";
import React from "react";
import { C } from "../../lib/data";

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-16">
      <h1 style={{ fontFamily: "Fraunces, serif", fontSize: 40, color: C.ink, marginBottom: 32 }}>Terms of Service</h1>
      
      <div className="flex flex-col gap-8" style={{ fontFamily: "Inter, sans-serif", fontSize: 16, color: "#444", lineHeight: 1.8 }}>
        <section>
          <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 24, color: C.ink, marginBottom: 16 }}>1. Introduction</h2>
          <p>
            Welcome to Aavaran. By accessing or using our website, you agree to be bound by these Terms of Service. If you do not agree to all of the terms and conditions, then you may not access the website or use any services.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 24, color: C.ink, marginBottom: 16 }}>2. Products and Services</h2>
          <p>
            We have made every effort to display as accurately as possible the colors and images of our products that appear on the store. However, this is a demonstration environment. No actual products will be shipped, and no real transactions will be processed.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 24, color: C.ink, marginBottom: 16 }}>3. Pricing and Availability</h2>
          <p>
            Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 24, color: C.ink, marginBottom: 16 }}>4. User Accounts</h2>
          <p>
            If you create an account on our website, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account. You must immediately notify us of any unauthorized uses of your account or any other breaches of security.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 24, color: C.ink, marginBottom: 16 }}>5. Changes to Terms of Service</h2>
          <p>
            We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service by posting updates and changes to our website. It is your responsibility to check our website periodically for changes.
          </p>
        </section>
      </div>
    </div>
  );
}
