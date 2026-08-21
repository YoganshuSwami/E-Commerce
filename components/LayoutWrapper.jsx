"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isDistractionFree = pathname === "/checkout";

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#FFFFFF' }}>
      {!isDistractionFree && <Header />}
      <main style={{ flex: 1 }}>{children}</main>
      {!isDistractionFree && <Footer />}
    </div>
  );
}
