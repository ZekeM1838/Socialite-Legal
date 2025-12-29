// src/components/LegalPageLayout.tsx

"use client";

import { ReactNode } from "react";
import ClientLayout from "./ClientLayout";

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
    <ClientLayout>
      <div className="container mx-auto px-4 max-w-3xl overflow-hidden">
        {/* Page Title */}
        <div className="pt-10">
          <h1 className="text-[10px] font-bold text-black/100 tracking-wider mb-1">
            {cleanTitle}
          </h1>
          <p className="text-xs text-black/40 mb-4">
            Last updated: {cleanDate}
          </p>
          <p className="text-[12px] text-black/70 leading-relaxed">
            {subtitle}
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
            className="btn-winamp-sm"
          >
            BACK TO TOP
          </button>
        </div>
      </div>
    </ClientLayout>
  );
}
