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
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 bg-white border-t border-[#222222] shadow-lg">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Text */}
        <div className="flex-1 text-sm text-black/80">
          <p>
            We use cookies to analyze site traffic and improve your experience.{" "}
            <Link href="/cookies" className="underline hover:text-black">
              Learn more
            </Link>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={declineCookies}
            className="px-4 py-2 text-sm text-black/70 hover:text-black transition-colors"
          >
            Decline
          </button>
          <button
            onClick={acceptCookies}
            className="px-6 py-2 text-sm font-medium text-white bg-black rounded-full hover:bg-black/80 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
