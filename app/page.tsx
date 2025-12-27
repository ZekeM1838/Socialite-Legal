import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, FileText, Cookie, Users, ExternalLink } from "lucide-react";

const legalDocuments = [
  {
    href: "/privacy",
    title: "PRIVACY_POLICY",
    description: "How we collect, use, and protect your personal information",
    icon: Shield,
    color: "#0088ff",
  },
  {
    href: "/terms",
    title: "TERMS_OF_SERVICE",
    description: "The rules and agreements for using the Socialite app",
    icon: FileText,
    color: "#00d4ff",
  },
  {
    href: "/cookies",
    title: "COOKIE_POLICY",
    description: "Information about cookies and tracking technologies",
    icon: Cookie,
    color: "#ff6b35",
  },
  {
    href: "/guidelines",
    title: "COMMUNITY_GUIDELINES",
    description: "Standards for behavior and content on our platform",
    icon: Users,
    color: "#00ff41",
  },
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="pt-[100px] pb-8 min-h-screen">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Hero Section */}
          <div className="panel-chrome p-8 md:p-12 rounded-lg mb-8 text-center">
            <div className="display-lcd p-6 rounded-md mb-8 inline-block">
              <h1 className="text-2xl md:text-4xl font-mono tracking-wider">
                SOCIALITE_LEGAL
              </h1>
            </div>
            <p className="text-lg text-muted-foreground font-medium mb-6 max-w-2xl mx-auto">
              Welcome to the Socialite Legal Center. Here you&apos;ll find all the important
              documents regarding your use of our platform.
            </p>
            <div className="section-divider"></div>
            <div className="flex items-center justify-center gap-4 text-xs font-mono text-muted-foreground">
              <span>STATUS:</span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#00ff41] rounded-full animate-pulse"></span>
                <span className="text-[#00ff41]">ACTIVE</span>
              </span>
            </div>
          </div>

          {/* Document Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {legalDocuments.map((doc) => {
              const Icon = doc.icon;
              return (
                <Link
                  key={doc.href}
                  href={doc.href}
                  className="group panel-inset p-6 rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="p-3 rounded-lg"
                      style={{ backgroundColor: `${doc.color}20` }}
                    >
                      <Icon
                        className="w-6 h-6"
                        style={{ color: doc.color }}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h2
                          className="text-sm font-mono font-bold tracking-wider"
                          style={{ color: doc.color }}
                        >
                          {doc.title}
                        </h2>
                        <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {doc.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 control-slider rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500 group-hover:w-full w-0"
                      style={{ backgroundColor: doc.color }}
                    ></div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Contact Section */}
          <div className="panel-chrome p-8 rounded-lg text-center">
            <div className="display-lcd p-3 rounded-md mb-4 inline-block">
              <span className="text-sm font-mono tracking-wider">CONTACT_US</span>
            </div>
            <p className="text-muted-foreground mb-6">
              Have questions about our policies? Reach out to our support team.
            </p>
            <a
              href="mailto:legal@socialite.app"
              className="btn-winamp inline-flex"
            >
              SEND_MESSAGE
            </a>
            <p className="mt-4 text-xs font-mono text-muted-foreground">
              EMAIL: legal@socialite.app
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
