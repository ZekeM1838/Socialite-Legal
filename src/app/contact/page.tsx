// src/app/contact/page.tsx

import type { Metadata } from "next";
import { Mail, Instagram, Twitter } from "lucide-react";
import ClientLayout from "../../components/ClientLayout";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Socialite team",
  openGraph: {
    title: "Socialite | Contact",
    description: "Get in touch with the Socialite team",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <ClientLayout>
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Page Header */}
        <div className="pt-10 pb-2">
          <h1 className="text-[10px] font-bold text-black/100 tracking-wider mb-1">
            Contact
          </h1>
          <p className="text-[12px] text-black/70 leading-relaxed">
            Get in touch with the Socialite team. We typically respond within <strong>24-48 hours</strong>.
            <br />
            For urgent matters, please reach out on Instagram.
          </p>
        </div>

        {/* Support Section */}
        <div className="mt-6">
          <p className="text-[10px] font-bold text-black/100 tracking-wider mb-3 px-1">
            Support
          </p>
          <div className="panel-chrome rounded-sm overflow-hidden">
            <a
              href="mailto:support@socialite.world"
              className="contact-row group"
            >
              <div className="flex items-center gap-3">
                <div className="control-knob flex items-center justify-center !bg-white !rounded-sm">
                  <Mail className="w-3 h-3 text-black/70" />
                </div>
                <span className="text-[14px] font-medium text-black">
                  Customer Support
                </span>
              </div>
              <span className="text-[13px] text-black/60 group-hover:text-black group-hover:underline transition-colors">
                support@socialite.world
              </span>
            </a>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="mt-10">
          <p className="text-[10px] font-bold text-black/100 tracking-wider mb-3 px-1">
            Social Media
          </p>
          <div className="panel-chrome rounded-lg overflow-hidden">
            <a
              href="https://instagram.com/socialitehq"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-row group"
            >
              <div className="flex items-center gap-3">
                <div className="control-knob flex items-center justify-center !bg-white !rounded-sm">
                  <Instagram className="w-3 h-3 text-black/70" />
                </div>
                <span className="text-[14px] font-medium text-black">
                  Instagram
                </span>
              </div>
              <span className="text-[13px] text-black/60 group-hover:text-black group-hover:underline transition-colors">
                @socialitehq
              </span>
            </a>

            <a
              href="https://twitter.com/socialitepage"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-row group"
            >
              <div className="flex items-center gap-3">
                <div className="control-knob flex items-center justify-center !bg-white !rounded-sm">
                  <Twitter className="w-3 h-3 text-black/70" />
                </div>
                <span className="text-[14px] font-medium text-black">
                  Twitter / X
                </span>
              </div>
              <span className="text-[13px] text-black/60 group-hover:text-black group-hover:underline transition-colors">
                @socialitepage
              </span>
            </a>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}
