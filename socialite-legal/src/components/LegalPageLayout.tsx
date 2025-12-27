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
  return (
    <>
      <Header />
      <main className="pt-[100px] pb-8 min-h-screen">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Page Header */}
          <div className="panel-chrome p-8 rounded-lg mb-8">
            <div className="display-lcd p-4 rounded-md mb-6 inline-block">
              <h1 className="text-xl md:text-2xl font-mono tracking-wider">
                {title}
              </h1>
            </div>
            <p className="text-muted-foreground font-medium mb-4">
              {subtitle}
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
              <span>LAST_UPDATED:</span>
              <span className="text-[#0088ff]">{lastUpdated}</span>
            </div>
          </div>

          {/* Content */}
          <div className="panel-inset p-8 rounded-lg">
            <div className="legal-content">
              {children}
            </div>
          </div>

          {/* Back to Top */}
          <div className="mt-8 text-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="btn-winamp"
            >
              BACK_TO_TOP
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
