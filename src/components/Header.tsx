"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search } from "lucide-react";

const mainNavItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/waitlist", label: "Waitlist" },
  { href: "/contact", label: "Contact" },
];

const legalItems = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/cookies", label: "Cookie Policy" },
  { href: "/guidelines", label: "Community Guidelines" },
];

interface HeaderProps {
  onSearchClick?: () => void;
}

export default function Header({ onSearchClick }: HeaderProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLegalDropdownOpen, setIsLegalDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Check if current page is a legal page
  const isLegalPage = legalItems.some((item) => pathname === item.href);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLegalDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsLegalDropdownOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 panel-chrome antialiased tracking-tight max-w-full">
      {/* Gradient bar with logo + nav */}
      <div className="bg-gradient-to-b from-[#e8e8e9] to-[#5e5c5c]">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex items-center justify-center h-[40px] relative">
            
            {/* Left: Logo */}
            <div className="absolute left-0">
              <Link href="/" className="flex items-center gap-2">
                <span
                  className="text-[12px] text-black font-medium opacity-80 hover:opacity-100 transition-opacity whitespace-nowrap"
                  style={{
                    textShadow: `
                      0 1px 0 rgba(255,255,255,0.75),
                      0 -1px 0 rgba(0,0,0,0.25),
                      0 2px 2px rgba(0,0,0,0.10)
                    `,
                  }}
                >
                  Socialite Directory
                </span>
              </Link>
            </div>

            {/* Center: Desktop Navigation */}
            <nav className="hidden md:flex panel-inset items-center gap-1 px-2 overflow-visible">
              {/* Main nav items */}
              {mainNavItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-[11px] px-3 py-1 transition-all duration-150 ${
                      isActive
                        ? "text-black font-medium underline underline-offset-4"
                        : "text-black/70 hover:text-black"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              {/* Legal Dropdown */}
              <div 
                className="relative h-full flex items-center" 
                ref={dropdownRef}
                onMouseEnter={() => setIsLegalDropdownOpen(true)}
                onMouseLeave={() => setIsLegalDropdownOpen(false)}
              >
                <button
                  onClick={() => setIsLegalDropdownOpen(!isLegalDropdownOpen)}
                  className={`text-[11px] px-3 py-1 transition-all duration-150 flex items-center gap-1 ${
                    isLegalPage
                      ? "text-black font-medium underline underline-offset-4"
                      : "text-black/70 hover:text-black"
                  }`}
                >
                  Legal
                </button>
              
                {/* Dropdown Menu */}
                {isLegalDropdownOpen && (
                  <div className="absolute top-[30px] left-0 w-48 py-2 bg-white border border-[#d5d5d5] rounded-lg shadow-xl z-[100]">
                    {legalItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`block px-4 py-2 text-[11px] transition-colors ${
                          pathname === item.href
                            ? "text-black font-medium bg-[#f5f5f5]"
                            : "text-black/70 hover:text-black hover:bg-[#f5f5f5]"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Search Button */}
              <button
                onClick={onSearchClick}
                className="ml-2 p-1.5 text-black/70 hover:text-black transition-colors"
                aria-label="Search"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </nav>

            {/* Right: Mobile Menu Button + Search */}
            <div className="absolute right-0 flex items-center gap-2 md:hidden">
              <button
                onClick={onSearchClick}
                className="p-1.5 text-black/70 hover:text-black transition-colors"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="control-knob items-center justify-center w-8 h-8 flex p-1"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-4 h-4 text-black" />
                ) : (
                  <Menu className="w-4 h-4 text-black" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-3">
              <nav className="panel-inset rounded-lg flex flex-col items-center gap-1 py-3">
                {/* Main nav items */}
                {mainNavItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`text-[12px] py-2 px-4 w-full text-center transition-all duration-150 ${
                        isActive
                          ? "text-black font-medium underline underline-offset-4"
                          : "text-black/70 hover:text-black"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}

                {/* Legal Section */}
                <div className="w-full border-t border-black/10 mt-2 pt-2">
                  <p className="text-[10px] text-black/50 text-center uppercase tracking-wider mb-2">
                    Legal
                  </p>
                  {legalItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`text-[11px] py-1.5 px-4 w-full text-center block transition-all duration-150 ${
                          isActive
                            ? "text-black font-medium"
                            : "text-black/60 hover:text-black"
                        }`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>

      {/* Bottom border */}
      <div className="h-[1px] bg-[#222222]"></div>
    </header>
  );
}
