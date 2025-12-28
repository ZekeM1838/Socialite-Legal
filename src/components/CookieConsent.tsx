"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Small delay so it doesn't flash on page load
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowBanner(false);
    // Dispatch event so Google Analytics can load
    window.dispatchEvent(new Event("cookie-consent-change"));
  };

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] panel-chrome antialiased tracking-tight">
      {/* Top border */}
      <div className="h-[1px] bg-[#222222]"></div>
      
      {/* Gradient bar matching header/footer style */}
      <div className="bg-gradient-to-b from-[#e8e8e9] to-[#5e5c5c]">
        <div className="max-w-[1440px] mx-auto px-6 py-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Text */}
            <p 
              className="text-[12px] text-black font-medium opacity-80 text-center sm:text-left"
              style={{
                textShadow: `
                  0 1px 0 rgba(255,255,255,0.75),
                  0 -1px 0 rgba(0,0,0,0.25)
                `,
              }}
            >
              We use cookies to analyze site traffic.{" "}
              <Link href="/cookies" className="underline hover:opacity-100 transition-opacity">
                Learn more
              </Link>
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={declineCookies}
                className="px-4 py-1 text-[12px] text-black/70 hover:text-black transition-colors uppercase tracking-wider"
                style={{
                  textShadow: `0 1px 0 rgba(255,255,255,0.75)`,
                }}
              >
                Decline
              </button>
              <button
                onClick={acceptCookies}
                className="btn-winamp !min-w-[100px] !h-[32px] !text-[12px] uppercase tracking-wider"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
