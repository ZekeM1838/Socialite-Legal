import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    // FIX: Added min-w-full to ensure footer covers full width even with overflow
    // Also using w-screen as a fallback for viewport width
    <footer className="mt-12 w-full min-w-full antialiased tracking-tight bg-gradient-to-b from-[#d5d5d5] to-[#868686]">
      
      {/* The inner div handles the max-width and the Safe Area padding */}
      <div className="max-w-[1440px] mx-auto px-6 pt-4 pb-[calc(16px+env(safe-area-inset-bottom,20px))]">
        <div className="flex flex-row items-center justify-between w-full gap-x-8 text-[12px] text-black">
          
          <span className="shrink-0 font-medium opacity-80 uppercase tracking-widest whitespace-nowrap">
            © {currentYear} ALL RIGHTS RESERVED
          </span>
  
          <nav className="hidden lg:flex items-center gap-x-4 opacity-80">
            <Link href="/privacy" className="hover:underline hover:opacity-100 transition-opacity">Privacy</Link>
            <Link href="/terms" className="hover:underline hover:opacity-100 transition-opacity">Terms</Link>
            <Link href="/cookies" className="hover:underline hover:opacity-100 transition-opacity">Cookies</Link>
            <Link href="/guidelines" className="hover:underline hover:opacity-100 transition-opacity">Guidelines</Link>
          </nav>
  
          <div className="flex items-center gap-3 whitespace-nowrap">
            <a href="mailto:support@socialite.world" className="hover:underline opacity-80 hover:opacity-100 transition-opacity">
              support@socialite.world
            </a>
            <span className="text-black/80">v1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
