// src/app/legal/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import ClientLayout from "../../components/ClientLayout";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  title: "Legal",
  description: "Legal documents and policies for Socialite",
  openGraph: {
    title: "LEGAL - Socialite",
    description: "Legal documents and policies for Socialite",
    type: "website",
  },
};

const legalDocuments = [
  {
    href: "/privacy",
    title: "Privacy Policy",
    description: "How we collect, use, and protect your personal information",
    updated: "December 2025",
  },
  {
    href: "/terms",
    title: "Terms of Service",
    description: "The rules and agreements for using the Socialite app",
    updated: "December 2025",
  },
  {
    href: "/cookies",
    title: "Cookie Policy",
    description: "Information about cookies and tracking technologies",
    updated: "December 2025",
  },
  {
    href: "/guidelines",
    title: "Community Guidelines",
    description: "Standards for behavior and content on our platform",
    updated: "December 2025",
  },
];

export default function LegalPage() {
  return (
    <ClientLayout>
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Page Header */}
        <div className="pt-8 pb-3">
          <h1 className="text-[10px] font-bold text-black/100 tracking-wider mb-1">
            Legal
          </h1>
          <p className="text-[12px] text-black/70 leading-relaxed">
            Documents and policies for <strong>Socialite</strong>
          </p>
        </div>

        {/* Documents List */}
        <div className="py-6">
          <div className="panel-chrome rounded-lg overflow-hidden">
            {legalDocuments.map((doc, index) => (
              <Link
                key={doc.href}
                href={doc.href}
                className="contact-row group"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-black/40">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h2 className="text-[14px] font-semibold text-black group-hover:underline underline-offset-4 truncate">
                        {doc.title}
                      </h2>
                    </div>
                    <p className="text-[11px] text-black/50 mt-0.5 truncate">
                      {doc.description}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] text-black/40 shrink-0 hidden sm:block">
                  {doc.updated}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Contact Notice */}
        <div className="mb-10">
          <div className="panel-inset rounded-lg p-6 text-center">
            <p className="text-[12px] text-black/70 leading-relaxed">
              Questions about our policies?
              <br />
              Contact us at{" "}
              <a
                href="mailto:support@socialite.world"
                className="font-medium underline underline-offset-2 hover:text-black"
              >
                support@socialite.world
              </a>
            </p>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}
