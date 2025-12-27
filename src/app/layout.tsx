import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Socialite",
    template: "%s | Socialite",
  },
  description: "Legal documents and policies for the Socialite app",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/app-icon.png", type: "image/png" },
    ],
    apple: "/app-icon.png",
  },
  keywords: ["Socialite", "legal", "privacy policy", "terms of service", "community guidelines"],
  authors: [{ name: "Socialite" }],
  openGraph: {
    title: "Socialite",
    description: "Legal documents and policies for the Socialite app",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
