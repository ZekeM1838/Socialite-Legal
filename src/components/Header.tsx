"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/cookies", label: "Cookies" },
  { href: "/guidelines", label: "Guidelines" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    // FIX: Added max-w-full and overflow-x-hidden to prevent header from causing horizontal overflow
    <header className="fixed top-0 left-0 right-0 z-50 panel-chrome antialiased tracking-tight max-w-full overflow-x-hidden">
      {/* gradient bar with logo + nav */}
      <div className="bg-gradient-to-b from-[#e8e8e9] to-[#5e5c5c]">
        {/* FIX: Added overflow-hidden to prevent inner content from overflowing */}
        <div className="max-w-[1440px] mx-auto px-6 overflow-hidden">
        <div className="flex items-center justify-center h-[35px] relative">
          {/* Left: Logo - Absolutely positioned to the left */}
          <div className="absolute left-0">
            <Link href="/" className="flex items-center gap-2">
              <span
                className="text-[12px] text-black font-medium opacity-80 hover:opacity-100 transition-opacity whitespace-nowrap"
                style={{
                  textShadow: `
                    0 1px 0 rgba(255,255,255,0.75),   /* light highlight */
                    0 -1px 0 rgba(0,0,0,0.25),        /* dark edge */
                    0 2px 2px rgba(0,0,0,0.10)        /* soft depth */
                  `,
                }}
              >
                Socialite Directory
              </span>
            </Link>
          </div>

          {/* Middle: Desktop Navigation - This will now be the TRUE center */}
          <nav className="hidden md:flex panel-inset items-center gap-6 px-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[12px] transition-all duration-150 ${
                    isActive
                      ? "text-black font-small underline underline-offset-4"
                      : "text-black/70 hover:text-black"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Mobile Menu Button - Absolutely positioned to the right */}
          <div className="absolute right-0 md:hidden">
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
            <div className="md:hidden py-2">
              
              <nav className="panel-inset rounded-lg flex flex-col items-center gap-2 pt-2 border-t border-black/20">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-[12px] py-2 transition-all duration-150 rounded-lg ${
                        isActive
                          ? "text-black font-medium underline underline-offset-4"
                          : "text-black/70 hover:text-black"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
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
