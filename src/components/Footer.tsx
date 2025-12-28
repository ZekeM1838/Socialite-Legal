import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 antialiased tracking-tight">
      {/* GmbH-style gradient footer - ALL IN ONE LINE */}
      <div className="bg-gradient-to-b from-[#d5d5d5] to-[#868686]">
        <div className="max-w-[1440px] mx-auto px-6 py-4">
          {/* Single line layout */}
          <div className="flex flex-row items-center justify-between w-full text-[12px] text-black">
            {/* Copyright */}
            <span className="shrink-0 font-small opacity-80 uppercase tracking-widest">
              © {currentYear} ALL RIGHTS RESERVED
            </span>

            {/* Navigation Links */}
            <nav className="hidden sm:flex items-center gap-x-4 opacity-80">
              <Link href="/privacy" className="hover:underline opacity-80 hover:opacity-100 transition-opacity">Privacy</Link>
              <Link href="/terms" className="hover:underline opacity-80 hover:opacity-100 transition-opacity">Terms</Link>
              <Link href="/cookies" className="hover:underline opacity-80 hover:opacity-100 transition-opacity">Cookies</Link>
              <Link href="/guidelines" className="hover:underline opacity-80 hover:opacity-100 transition-opacity">Guidelines</Link>
            </nav>

            {/* Email + Version */}
            <div className="flex items-center gap-3">
              <a href="mailto:support@socialite.world" className="hover:underline opacity-80 hover:opacity-100 transition-opacity">
                support@socialite.world
              </a>
              <span className="text-black/80">v1.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
