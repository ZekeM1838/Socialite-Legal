"use client";

import Script from "next/script";
import { useEffect, useState, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// Google Analytics Measurement ID
// In production, set NEXT_PUBLIC_GA_ID in your Vercel environment variables
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID; 

// Type declarations for Google Analytics
declare global {
  interface Window {
    gtag: (
      command: "config" | "event" | "js" | "set",
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}

/**
 * Google Analytics component with consent-based loading.
 * 
 * Features:
 * - Only loads GA after user accepts cookies
 * - Tracks page views on route changes (Next.js App Router compatible)
 * - IP anonymization enabled for GDPR compliance
 * - Properly typed for TypeScript
 * 
 * Usage:
 * 1. Set NEXT_PUBLIC_GA_ID environment variable in Vercel
 * 2. Include <GoogleAnalytics /> in your root layout
 * 3. Ensure CookieConsent component dispatches "cookie-consent-change" event
 */
export default function GoogleAnalytics() {
  const [consentGiven, setConsentGiven] = useState(false);
  const [gaLoaded, setGaLoaded] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Check consent on mount
  useEffect(() => {
    // Only runs on client
    if (typeof window === "undefined") return;
    
    const consent = localStorage.getItem("cookie-consent");
    if (consent === "accepted") {
      setConsentGiven(true);
    }
  }, []);

  // Listen for consent changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleConsentChange = () => {
      const consent = localStorage.getItem("cookie-consent");
      setConsentGiven(consent === "accepted");
    };

    window.addEventListener("cookie-consent-change", handleConsentChange);
    
    // Also check on storage events (for cross-tab sync)
    window.addEventListener("storage", (e) => {
      if (e.key === "cookie-consent") {
        handleConsentChange();
      }
    });

    return () => {
      window.removeEventListener("cookie-consent-change", handleConsentChange);
    };
  }, []);

  // Track page views when route changes (after GA is loaded)
  const trackPageView = useCallback((url: string) => {
    if (typeof window !== "undefined" && window.gtag && gaLoaded) {
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: url,
        anonymize_ip: true,
      });
    }
  }, [gaLoaded]);

  // Effect to track page views on route changes
  useEffect(() => {
    if (!gaLoaded) return;
    
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
    trackPageView(url);
  }, [pathname, searchParams, gaLoaded, trackPageView]);

  // Don't render anything if:
  // - No consent given
  // - No GA ID configured
  // - Running on server
  if (!consentGiven || !GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      {/* Load gtag.js */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
        onLoad={() => {
          // Mark as loaded so we can start tracking page views
          setGaLoaded(true);
        }}
      />
      
      {/* Initialize gtag */}
      <Script 
        id="google-analytics-init" 
        strategy="afterInteractive"
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure'
          });
        `}
      </Script>
    </>
  );
}

/**
 * Utility function to track custom events
 * Can be imported and used throughout your app
 * 
 * Example:
 * import { trackEvent } from "@/components/GoogleAnalytics";
 * trackEvent("button_click", "navigation", "signup_cta");
 */
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}
