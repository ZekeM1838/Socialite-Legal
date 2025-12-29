"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight, FileText, Home, Users, Mail, Shield } from "lucide-react";

// All searchable pages
const searchablePages = [
  { 
    href: "/", 
    title: "Home", 
    description: "Updates and announcements",
    icon: Home,
    keywords: ["home", "updates", "news", "announcements", "newsletter"]
  },
  { 
    href: "/about", 
    title: "About", 
    description: "Learn about Socialite",
    icon: Users,
    keywords: ["about", "mission", "team", "features", "what is socialite"]
  },
  { 
    href: "/waitlist", 
    title: "Waitlist", 
    description: "Join the beta waitlist",
    icon: Mail,
    keywords: ["waitlist", "signup", "join", "beta", "early access", "register"]
  },
  { 
    href: "/contact", 
    title: "Contact", 
    description: "Get in touch with us",
    icon: Mail,
    keywords: ["contact", "support", "help", "email", "instagram", "twitter"]
  },
  { 
    href: "/privacy", 
    title: "Privacy Policy", 
    description: "How we handle your data",
    icon: Shield,
    keywords: ["privacy", "data", "information", "collect", "gdpr"]
  },
  { 
    href: "/terms", 
    title: "Terms of Service", 
    description: "Rules for using Socialite",
    icon: FileText,
    keywords: ["terms", "service", "rules", "agreement", "legal"]
  },
  { 
    href: "/cookies", 
    title: "Cookie Policy", 
    description: "How we use cookies",
    icon: FileText,
    keywords: ["cookies", "tracking", "analytics", "browser"]
  },
  { 
    href: "/guidelines", 
    title: "Community Guidelines", 
    description: "Community standards",
    icon: FileText,
    keywords: ["guidelines", "community", "rules", "behavior", "content"]
  },
];

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Filter results based on query
  const results = query.trim()
    ? searchablePages.filter((page) => {
        const searchTerm = query.toLowerCase();
        return (
          page.title.toLowerCase().includes(searchTerm) ||
          page.description.toLowerCase().includes(searchTerm) ||
          page.keywords.some((k) => k.includes(searchTerm))
        );
      })
    : searchablePages.slice(0, 5); // Show top 5 when no query

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case "Enter":
          e.preventDefault();
          if (results[selectedIndex]) {
            router.push(results[selectedIndex].href);
            onClose();
          }
          break;
      }
    },
    [isOpen, onClose, results, selectedIndex, router]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Reset selection when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Handle clicking a result
  const handleResultClick = (href: string) => {
    router.push(href);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Search Modal */}
      <div className="relative w-full max-w-xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#d5d5d5]">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#e5e5e5]">
          <Search className="w-5 h-5 text-black/40 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Socialite..."
            className="flex-1 text-[15px] text-black placeholder:text-black/40 outline-none bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-black/40 hover:text-black transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 text-[10px] text-black/40 bg-[#f5f5f5] rounded border border-[#e5e5e5]">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[50vh] overflow-y-auto">
          {results.length > 0 ? (
            <div className="py-2">
              {query.trim() === "" && (
                <p className="px-5 py-2 text-[10px] text-black/40 uppercase tracking-wider">
                  Quick Links
                </p>
              )}
              {results.map((result, index) => {
                const Icon = result.icon;
                const isSelected = index === selectedIndex;
                return (
                  <button
                    key={result.href}
                    onClick={() => handleResultClick(result.href)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full flex items-center gap-4 px-5 py-3 text-left transition-colors ${
                      isSelected ? "bg-[#f5f5f5]" : "hover:bg-[#fafafa]"
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${isSelected ? "bg-black" : "bg-[#e5e5e5]"}`}>
                      <Icon className={`w-4 h-4 ${isSelected ? "text-white" : "text-black/60"}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-black truncate">
                        {result.title}
                      </p>
                      <p className="text-[11px] text-black/50 truncate">
                        {result.description}
                      </p>
                    </div>
                    {isSelected && (
                      <ArrowRight className="w-4 h-4 text-black/40 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-[13px] text-black/50">
                No results for &quot;{query}&quot;
              </p>
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div className="px-5 py-3 bg-[#fafafa] border-t border-[#e5e5e5]">
          <p className="text-[10px] text-black/40 text-center">
            <span className="hidden sm:inline">
              <kbd className="px-1.5 py-0.5 bg-white rounded border border-[#e5e5e5] mr-1">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-white rounded border border-[#e5e5e5] mr-1">↓</kbd>
              to navigate
              <span className="mx-2">·</span>
              <kbd className="px-1.5 py-0.5 bg-white rounded border border-[#e5e5e5] mr-1">↵</kbd>
              to select
              <span className="mx-2">·</span>
            </span>
            <kbd className="px-1.5 py-0.5 bg-white rounded border border-[#e5e5e5] mr-1">esc</kbd>
            to close
          </p>
        </div>
      </div>
    </div>
  );
}
