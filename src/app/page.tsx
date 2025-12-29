// src/app/page.tsx

import Link from "next/link";
import ClientLayout from "../components/ClientLayout";
import type { Metadata } from "next";
import { ArrowRight, Sparkles } from "lucide-react";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  title: "Socialite | Social Valley",
  description: "A new kind of social platform built for authentic connections. Join the waitlist.",
  openGraph: {
    title: "Socialite | Social Valley",
    description: "A new kind of social platform built for authentic connections. Join the waitlist.",
    type: "website",
  },
};

// Updates - Add new posts here (newest first)
// Format: { date: "MONTH DAY, YEAR", title: "...", content: "..." }
const updates = [
  {
    date: "December 28, 2025",
    title: "Website Launch",
    content:
      "Welcome to the new Socialite website! We're excited to share our journey with you as we build something special. Sign up for the waitlist to be the first to know when we launch.",
  },
  {
    date: "December 2025",
    title: "Building in Public",
    content:
      "We believe in transparency. Follow along as we develop Socialite and share updates on our progress, challenges, and wins.",
  },
];

export default function HomePage() {
  return (
    <ClientLayout>
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Hero Section */}
        <div className="py-16 text-center border-b border-[#222222]">
          {/* Logo */}
          <h1 className="text-5xl md:text-7xl font-drexs text-black mb-4">
            Socialite
          </h1>
          <p className="text-black/60 text-sm uppercase tracking-[0.2em] mb-8">
            Social, re-engineered. Turning  moments into real world value with the people around you.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Launch App Button */}
            <Link href="/coming-soon" className="btn-winamp-sm">
              <span className="flex items-center gap-2">
                Launch App
              </span>
            </Link>

            {/* Waitlist Link */}
            <Link
              href="/waitlist"
              className="btn-winamp-sm flex items-center gap-2"
            >
              Join Waitlist
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Updates Section */}
        <div className="py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[11px] text-black/50 uppercase tracking-wider">
              Updates
            </h2>
            <span className="text-[10px] text-black/30">
              {updates.length} post{updates.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Updates Feed */}
          <div className="space-y-6">
            {updates.map((update, index) => (
              <article
                key={index}
                className="panel-chrome rounded-lg p-6 transition-all hover:shadow-lg"
              >
                {/* Date */}
                <time className="text-[10px] text-black/40 uppercase tracking-wider">
                  {update.date}
                </time>

                {/* Title */}
                <h3 className="text-lg font-semibold text-black mt-2 mb-3">
                  {update.title}
                </h3>

                {/* Content */}
                <p className="text-[13px] text-black/70 leading-relaxed">
                  {update.content}
                </p>
              </article>
            ))}
          </div>

          {/* More updates coming */}
          <div className="mt-12 text-center">
            <div className="panel-inset rounded-lg p-6">
              <p className="text-[12px] text-black/60">
                More updates coming soon. Follow{" "}
                <a
                  href="https://instagram.com/socialitehq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline underline-offset-2 hover:text-black"
                >
                  @socialitehq
                </a>{" "}
                for the latest.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}
