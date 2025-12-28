import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : new URL("http://localhost:3000");

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover", // This removes the white side bars on iPhones
};
export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Socialite",
    template: "%s | Socialite",
  },
  description: "Legal documents and policies for the Socialite app",
  
  // ✅ CORRECTED: Proper favicon configuration for Next.js 15
  icons: {
    // Standard favicons
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    // Fallback .ico file for older browsers
    shortcut: "/favicon-16x16.png",
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
        url: "/favicon-16x16.png",
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
    images: ["/favicon-16x16.png"],
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
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </head>
      <body className="antialiased min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
