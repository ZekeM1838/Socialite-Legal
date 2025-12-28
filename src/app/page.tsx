import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

const legalDocuments = [
  {
    href: "/privacy",
    title: "Privacy Policy",
    description: "How we collect, use, and protect your personal information",
  },
  {
    href: "/terms",
    title: "Terms of Service",
    description: "The rules and agreements for using the Socialite app",
  },
  {
    href: "/cookies",
    title: "Cookie Policy",
    description: "Information about cookies and tracking technologies",
  },
  {
    href: "/guidelines",
    title: "Community Guidelines",
    description: "Standards for behavior and content on our platform",
  },
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="pt-[70px] min-h-screen bg-white ">
      <div className="container mx-auto px-4 max-w-5xl">
          
          {/* Big Socialite title with Drexs font */}
          <div className="panel-inset py-6 text-center border-b border-[#222222]">
            <h1 className="text-6xl md:text-8xl font-drexs text-black tracking-tight mb-4">
              Socialite
            </h1>
            <p className="text-black/100 text-base uppercase tracking-[0.2em] text-sm">
              Primary Legal Records Archive
            </p>
          </div>

          <div className="my-8"></div>

          {/* Document List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 mb-8">
            {legalDocuments.map((doc, index) => (
              <Link
                key={doc.href}
                href={doc.href}
                className="group flex flex-col panel-chrome items-start py-3 transition-all hover:bg-[#f5f5f5] transition-colors px-4 -mx-4"
              >
              <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-4">
                    {/* Number */}
                    <span className="text-[12px] font-mono text-black/100">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {/* Title */}
                    <h2 className="text-[15px] font-semibold text-black group-hover:underline underline-offset-4 decoration-1">
                      {doc.title}
                    </h2>
                  </div>

                  {/* Your Custom Knob from global.css */}
                  <div className="shrink-0 translate-y-3">
                    {/* Your Custom Knob - Now acting as a relative parent */}
                    <div className="control-knob relative flex items-center justify-center !bg-white transition-transform duration-300">
                      
                      {/* The "X" that appears INSIDE the knob on hover */}
                      <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[20px] font-bold text-black pointer-events-none">
                        ✕
                      </span>
                      
                    </div>
                  </div>
                </div>

                {/* Bottom Row: Description (indented to align with title) */}
                <div className="w-full pl-0 mt-1">
                  <p className="text-[12px] text-black/100 text-left leading-relaxed">
                    {doc.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
