import type { Metadata } from "next";
import "./globals.css";
import { drexs } from "../lib/fonts";
import GoogleAnalytics from "../components/GoogleAnalytics";
import CookieConsent from "../components/CookieConsent";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : new URL("http://localhost:3000");

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Socialite",
    template: "%s | Socialite",
  },
  description: "Legal documents and policies for the Socialite app",
  
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon-16x16.png",
    apple: [
      { url: "/inverted-v2.png", sizes: "180x180", type: "image/png" },
    ],
  },
  
  keywords: ["Socialite", "legal", "privacy policy", "terms of service", "community guidelines"],
  authors: [{ name: "Socialite" }],
  
  openGraph: {
    title: "Socialite",
    description: "Legal documents and policies for the Socialite app",
    type: "website",
    siteName: "Socialite",
    images: [
      {
        url: "/favicon-16x16.png",
        width: 512,
        height: 512,
        alt: "Socialite Logo",
      },
    ],
  },
  
  twitter: {
    card: "summary",
    title: "Socialite",
    description: "Legal documents and policies for the Socialite app",
    images: ["/favicon-16x16.png"],
  },
  
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`overflow-x-hidden ${drexs.variable}`}>
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </head>
      <body className="antialiased flex flex-col min-h-screen">
        {/* Google Analytics - only loads after cookie consent */}
        <GoogleAnalytics />
        
        <div className="flex-1">
          {children}
        </div>
        
        {/* Cookie Consent Banner */}
        <CookieConsent />
      </body>
    </html>
  );
}
