// src/app/about/page.tsx

import type { Metadata } from "next";
import ClientLayout from "../../components/ClientLayout";
import { Sparkles, Users, Shield, Zap } from "lucide-react";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Socialite - the next generation social platform",
  openGraph: {
    title: "About | Socialite",
    description: "Learn about Socialite - the next generation social platform",
    type: "website",
  },
};

const features = [
  {
    icon: Sparkles,
    title: "Authentic Connections",
    description:
      "Built for genuine interactions, not vanity metrics. Connect with people who share your interests.",
  },
  {
    icon: Users,
    title: "Community First",
    description:
      "Join communities that matter to you. Discover groups, events, and conversations that resonate.",
  },
  {
    icon: Shield,
    title: "Privacy Focused",
    description:
      "Your data belongs to you. We prioritize privacy and give you full control over your information.",
  },
  {
    icon: Zap,
    title: "Fast & Modern",
    description:
      "A seamless, responsive experience designed for the way you communicate today.",
  },
];

export default function AboutPage() {
  return (
    <ClientLayout>
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Hero Section */}
        <div className="py-16 text-center border-b border-[#222222]">
          <h1 className="text-4xl md:text-5xl font-drexs text-black mb-4">
            Socialite
          </h1>
          <p className="text-black/60 text-base max-w-xl mx-auto leading-relaxed">
            A new kind of social platform built for authentic connections.
            <br />
            Coming soon.
          </p>
        </div>

        {/* Image Placeholder - Hero */}
        <div className="my-12">
          <div className="panel-inset rounded-lg aspect-[16/9] flex items-center justify-center">
            <div className="text-center">
              <p className="text-[11px] text-black/40 uppercase tracking-wider">
                App Preview
              </p>
              <p className="text-[10px] text-black/30 mt-1">
                Image placeholder
              </p>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="my-16 text-center max-w-2xl mx-auto">
          <p className="text-[11px] text-black/50 uppercase tracking-wider mb-4">
            Our Mission
          </p>
          <p className="text-lg md:text-xl text-black leading-relaxed">
            We believe social media should bring people together, not divide them.
            Socialite is designed to foster meaningful connections in a space free
            from noise and negativity.
          </p>
        </div>

        {/* Features Grid */}
        <div className="my-16">
          <p className="text-[11px] text-black/50 uppercase tracking-wider mb-6 text-center">
            Features
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="panel-chrome rounded-lg p-6 transition-all hover:shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <div className="control-knob flex items-center justify-center !bg-white shrink-0 mt-1">
                      <Icon className="w-3 h-3 text-black/70" />
                    </div>
                    <div>
                      <h3 className="text-[14px] font-semibold text-black mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-[12px] text-black/60 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Image Placeholders - Feature Screenshots */}
        <div className="my-16">
          <p className="text-[11px] text-black/50 uppercase tracking-wider mb-6 text-center">
            Screenshots
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className="panel-inset rounded-lg aspect-[9/16] flex items-center justify-center"
              >
                <div className="text-center">
                  <p className="text-[10px] text-black/40 uppercase tracking-wider">
                    Screenshot {num}
                  </p>
                  <p className="text-[9px] text-black/30 mt-1">
                    Placeholder
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="my-16 pb-8 text-center">
          <div className="panel-chrome rounded-lg p-8">
            <h2 className="text-xl font-semibold text-black mb-2">
              Be the first to know
            </h2>
            <p className="text-[13px] text-black/60 mb-6">
              Join our waitlist and get early access when we launch.
            </p>
            <a href="/waitlist" className="btn-winamp inline-flex">
              JOIN WAITLIST
            </a>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}
