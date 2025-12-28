"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

// Replace with your actual Google Analytics Measurement ID
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX";

export default function GoogleAnalytics() {
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem("cookie-consent");
    if (consent === "accepted") {
      setConsentGiven(true);
    }

    // Listen for consent changes
    const handleConsentChange = () => {
      const consent = localStorage.getItem("cookie-consent");
      setConsentGiven(consent === "accepted");
    };

    window.addEventListener("cookie-consent-change", handleConsentChange);
    return () => window.removeEventListener("cookie-consent-change", handleConsentChange);
  }, []);

  // Don't load GA until consent is given
  if (!consentGiven) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
            anonymize_ip: true
          });
        `}
      </Script>
    </>
  );
}
