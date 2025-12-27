import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="panel-chrome mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="panel-inset p-6 rounded-lg">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-xs text-muted-foreground font-mono text-center md:text-left">
              © {currentYear} SOCIALITE • ALL_RIGHTS_RESERVED
            </div>

            {/* Navigation Links */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs font-mono">
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-[#0088ff] transition-colors"
              >
                PRIVACY
              </Link>
              <Link
                href="/terms"
                className="text-muted-foreground hover:text-[#00d4ff] transition-colors"
              >
                TERMS
              </Link>
              <Link
                href="/cookies"
                className="text-muted-foreground hover:text-[#ff6b35] transition-colors"
              >
                COOKIES
              </Link>
              <Link
                href="/guidelines"
                className="text-muted-foreground hover:text-[#00ff41] transition-colors"
              >
                GUIDELINES
              </Link>
            </div>

            {/* Version Info */}
            <div className="text-xs text-muted-foreground font-mono">
              <span className="hidden sm:inline">VERSION </span>v1.0.0
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
