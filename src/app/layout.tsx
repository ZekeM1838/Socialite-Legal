import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Socialite",
    template: "%s | Socialite",
  },
  description: "Legal documents and policies for the Socialite app",
  
  // ✅ CORRECTED: Proper favicon configuration for Next.js 15
  icons: {
    // Standard favicons
    icon: [
      { url: "/inverted-v2.png", sizes: "16x16", type: "image/png" },
      { url: "/inverted-v2.png", sizes: "32x32", type: "image/png" },
    ],
    // Fallback .ico file for older browsers
    shortcut: "/inverted-v2.png",
    // Apple touch icon for iOS home screen
    apple: [
      { url: "/inverted-v2.png", sizes: "180x180", type: "image/png" },
    ],
  },
  
  keywords: ["Socialite", "legal", "privacy policy", "terms of service", "community guidelines"],
  authors: [{ name: "Socialite" }],
  
  // Enhanced Open Graph metadata
  openGraph: {
    title: "Socialite",
    description: "Legal documents and policies for the Socialite app",
    type: "website",
    siteName: "Socialite",
    images: [
      {
        url: "/inverted-v2.png",
        width: 512,
        height: 512,
        alt: "Socialite Logo",
      },
    ],
  },
  
  // Twitter/X card metadata
  twitter: {
    card: "summary",
    title: "Socialite",
    description: "Legal documents and policies for the Socialite app",
    images: ["/inverted-v2.png"],
  },
  
  // Additional metadata
  manifest: "/site.webmanifest", // Optional: for PWA support
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Additional favicon fallbacks for maximum compatibility */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-v3.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-v6.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/inverted-v2.png" />
      </head>
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
