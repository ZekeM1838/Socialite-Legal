"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Check } from "lucide-react";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowBanner(false);
    window.dispatchEvent(new Event("cookie-consent-change"));
  };

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] antialiased tracking-tight">
      {/* Top border line like GmbH */}
      <div className="h-[1px] bg-[#222222]"></div>
      
      {/* Using panel-chrome with the gradient */}
      <div className="panel-chrome bg-gradient-to-b from-[#e8e8e9] to-[#5e5c5c]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            
            {/* Text - left side */}
            <p 
              className="text-[12px] text-black font-medium opacity-90 leading-relaxed"
              style={{
                textShadow: `0 1px 0 rgba(255,255,255,0.75), 0 -1px 0 rgba(0,0,0,0.25)`,
              }}
            >
              This website uses cookies to analyze traffic.{" "}
              <Link href="/cookies" className="underline underline-offset-2 hover:opacity-100">
                Privacy Policy
              </Link>.
            </p>

            {/* Buttons - right side */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Decline - simple text style */}
              <button
                onClick={declineCookies}
                className="text-[11px] text-black/70 hover:text-black transition-colors"
              >
                Decline
              </button>
              
              {/* Accept - pill button style */}
              <button
                onClick={acceptCookies}
                className="btn-winamp"
              >
                <span className="flex items-center justify-center w-4 h-4 rounded-full bg-gradient-to-b from-[#3a3a3a] to-[#1a1a1a]">
                  <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                </span>
                <span className="text-[11px] font-medium text-black whitespace-nowrap">
                  Accept and continue
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
