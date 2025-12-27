"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, FileText, Shield, Cookie, Users, Home } from "lucide-react";

const navItems = [
  { href: "/", label: "HOME", icon: Home },
  { href: "/privacy", label: "PRIVACY", icon: Shield },
  { href: "/terms", label: "TERMS", icon: FileText },
  { href: "/cookies", label: "COOKIES", icon: Cookie },
  { href: "/guidelines", label: "GUIDELINES", icon: Users },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 panel-chrome shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-[76px]">
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center gap-3">
            <div className="display-lcd px-4 py-2 rounded-md">
              <span className="font-mono tracking-wider text-sm">SOCIALITE</span>
            </div>
            <span className="hidden sm:block text-sm text-muted-foreground font-medium">
              LEGAL
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 panel-inset rounded-full px-2 py-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider rounded-full transition-all duration-200 ${
                    isActive
                      ? "bg-[#0088ff] text-white shadow-lg"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/50"
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden control-knob flex items-center justify-center w-10 h-10"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-4 h-4 text-muted-foreground" />
            ) : (
              <Menu className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="panel-inset rounded-lg p-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold tracking-wider rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-[#0088ff] text-white"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
