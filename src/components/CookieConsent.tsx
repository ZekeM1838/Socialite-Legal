"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Check } from "lucide-react";

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
    <div className="fixed bottom-0 left-0 right-0 z-[100] antialiased tracking-tight">
      {/* Top border */}
      <div className="h-[1px] bg-[#222222]"></div>
      
      {/* Using existing panel-chrome class */}
      <div className="panel-chrome">
        <div className="bg-gradient-to-b from-[#e8e8e9] to-[#5e5c5c]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              
              {/* Text - left aligned */}
              <div className="flex-1 min-w-0">
                <p 
                  className="text-[12px] text-black font-medium opacity-90 leading-relaxed"
                  style={{
                    textShadow: `0 1px 0 rgba(255,255,255,0.75), 0 -1px 0 rgba(0,0,0,0.25)`,
                  }}
                >
                  This website uses cookies to enable a personalized experience and to analyze traffic.
                </p>
                <p 
                  className="text-[12px] text-black/70 leading-relaxed mt-0.5"
                  style={{
                    textShadow: `0 1px 0 rgba(255,255,255,0.75)`,
                  }}
                >
                  By using this site you agree that we may store and access cookies on your device. To find out more, please visit our{" "}
                  <Link 
                    href="/cookies" 
                    className="underline underline-offset-2 hover:opacity-100 transition-opacity"
                  >
                    Privacy Policy
                  </Link>.
                </p>
              </div>

              {/* Buttons - right aligned, using control-knob style */}
              <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                {/* Decline - control-knob style */}
                <button
                  onClick={declineCookies}
                  className="group control-knob !w-auto !h-auto !rounded-[20%] px-4 py-2 flex items-center justify-center transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span 
                    className="text-[11px] font-medium text-black/70 group-hover:text-black tracking-wide"
                    style={{ textShadow: "0 1px 0 rgba(255,255,255,0.5)" }}
                  >
                    Decline
                  </span>
                </button>
                
                {/* Accept - control-knob style with checkmark */}
                <button
                  onClick={acceptCookies}
                  className="group control-knob !w-auto !h-auto !rounded-[20%] px-4 py-2 flex items-center gap-2 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  {/* Checkmark icon in dark circle */}
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-b from-[#3a3a3a] to-[#1a1a1a] shrink-0">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </span>
                  
                  {/* Button text */}
                  <span 
                    className="text-[11px] font-medium text-black tracking-wide whitespace-nowrap"
                    style={{ textShadow: "0 1px 0 rgba(255,255,255,0.5)" }}
                  >
                    Accept and continue
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
