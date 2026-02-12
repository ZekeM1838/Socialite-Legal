import Link from "next/link";

/**
 * Footer with horizontal scroll on mobile.
 * 
 * NOTE: This approach keeps all content on one line and allows
 * horizontal scrolling on narrow viewports. The scroll indicator
 * (thin scrollbar) will appear on mobile when content overflows.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 w-full antialiased tracking-tight bg-gradient-to-b from-[#d5d5d5] to-[#868686]">
      {/* 
        Scrollable container - overflow-x-auto enables horizontal scroll
        while the parent page can still have overflow-x-hidden 
      */}
      <div className="overflow-x-auto">
        <div className="min-w-max max-w-[1440px] mx-auto py-3 px-4 sm:px-6 pb-[calc(16px+env(safe-area-inset-bottom,20px))]">
          <div className="flex flex-row items-center justify-between gap-x-6 sm:gap-x-8 text-[12px] text-black">
            
            {/* Copyright */}
            <span className="shrink-0 font-[11px] opacity-80 uppercase tracking-widest whitespace-nowrap">
              © {currentYear} ALL RIGHTS RESERVED
            </span>

            {/* Navigation Links - Hidden on mobile, visible on lg+ */}
            <nav className="hidden lg:flex items-center gap-x-4 opacity-80 shrink-0">
              <Link href="/privacy" className="hover:underline hover:opacity-100 transition-opacity whitespace-nowrap">
                Privacy
              </Link>
              <Link href="/terms" className="hover:underline hover:opacity-100 transition-opacity whitespace-nowrap">
                Terms
              </Link>
              <Link href="/cookies" className="hover:underline hover:opacity-100 transition-opacity whitespace-nowrap">
                Cookies
              </Link>
              <Link href="/guidelines" className="hover:underline hover:opacity-100 transition-opacity whitespace-nowrap">
                Guidelines
              </Link>
            </nav>

            {/* Contact & Version */}
            <div className="flex items-center gap-3 shrink-0">
              <a 
                href="mailto:support@socialite.world" 
                className="hover:underline opacity-80 hover:opacity-100 transition-opacity whitespace-nowrap"
              >
                support@socialite.world
              </a>
              <span className="text-black/80 whitespace-nowrap">v1.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
