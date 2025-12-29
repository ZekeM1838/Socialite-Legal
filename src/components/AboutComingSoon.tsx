"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AboutComingSoon() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/");
    }, 10000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="container mx-auto px-4 max-w-3xl">
      <div className="pt-10 pb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-drexs text-black mb-3">
          Coming Soon
        </h1>
        <p className="text-[12px] text-black/60 leading-relaxed">
          Polishing the About page.
          Redirecting you home in about 10
          seconds.
        </p>
        <div className="mt-6 flex items-center justify-center">
          <Link href="/" className="btn-winamp-sm">
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
