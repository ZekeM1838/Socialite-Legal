"use client";

import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LegalPageLayoutProps {
  title: string;
  subtitle: string;
  lastUpdated: string;
  children: ReactNode;
}

export default function LegalPageLayout({
  title,
  subtitle,
  lastUpdated,
  children,
}: LegalPageLayoutProps) {
  const cleanTitle = title.replace(/_/g, " ");
  const cleanDate = lastUpdated.replace(/_/g, " ");

  return (
    // FIX: Added wrapper with overflow-x-hidden to prevent any content overflow
    <div className="min-h-screen flex flex-col overflow-x-hidden w-full">
      <Header />
      <main className="pt-[70px] flex-1 bg-white overflow-x-hidden">
        {/* FIX: Added overflow-hidden to container */}
        <div className="container mx-auto px-4 max-w-3xl overflow-hidden">
          {/* Page Title */}
          <div className="py-10 border-b border-[#222222]">
            <h1 className="text-2xl md:text-3xl font-bold text-black mb-2">
              {cleanTitle}
            </h1>
            <p className="text-black/60 text-sm mb-1">
              {subtitle}
            </p>
            <p className="text-xs text-black/40">
              Last updated: {cleanDate}
            </p>
          </div>

          {/* Content */}
          <div className="py-8">
            <div className="legal-content">
              {children}
            </div>
          </div>

          {/* Back to Top */}
          <div className="pb-12 text-center border-t border-[#d5d5d5] pt-8">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="btn-winamp"
            >
              BACK TO TOP
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
