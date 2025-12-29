"use client";

import { useState, useEffect, ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import SearchOverlay from "./SearchOverlay";

interface ClientLayoutProps {
  children: ReactNode;
  hideHeaderFooter?: boolean;
}

export default function ClientLayout({ children, hideHeaderFooter = false }: ClientLayoutProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Handle Cmd/Ctrl + K to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent scroll when search is open
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSearchOpen]);

  if (hideHeaderFooter) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden w-full">
      <Header onSearchClick={() => setIsSearchOpen(true)} />
      
      <main className="pt-[50px] flex-1 bg-white overflow-x-hidden">
        {children}
      </main>
      
      <Footer />

      {/* Search Overlay */}
      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </div>
  );
}
