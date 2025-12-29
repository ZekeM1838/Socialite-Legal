"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function ComingSoonPage() {
  const [phase, setPhase] = useState<"socialite" | "coming-soon">("socialite");

  useEffect(() => {
    // Phase 1: Show "Socialite" for 2.5 seconds (with animation)
    // Phase 2: Transition to "Coming Soon"
    const timer = setTimeout(() => {
      setPhase("coming-soon");
    }, 7300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/images/coming-soon-bg.jpeg)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <AnimatePresence mode="wait">
          {phase === "socialite" ? (
            <motion.h1
              key="socialite"
              initial={{ opacity: 0, scale: 0.1 }}
              animate={{ 
                // Opacity: Start invisible -> Peak at 1 -> Drop to 0 at the very end
                opacity: [0, 1, 1, 0], 
                // Scale: Small -> Full -> Stay Full until fade
                scale: [0.1, 1, 1, 1],
              }}
              // We use exit only as a fallback now to prevent "ghosting"
              exit={{ opacity: 0 }}
              transition={{
                duration: 2.5, // Total time for the "Socialite" text to live
                // [0] Start, [0.2] Full Opaque, [0.8] Start Fading, [1] Gone
                times: [0, 0.2, 0.8, 1], 
                ease: "easeInOut",
              }}
              className="text-5xl md:text-7xl font-drexs text-black"
            >
              Socialite
            </motion.h1>
          ) : (
            <motion.div
              key="coming-soon"
              initial={{ opacity: 1, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center"
            >
              {/* Coming Soon Text */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-6xl font-drexs text-black mb-4"
              >
                Coming Soon
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-sm md:text-base text-black/60 mb-8 max-w-md mx-auto"
              >
                We&apos;re working hard to bring you something amazing.
                <br />
                Join the waitlist to be the first to know.
              </motion.p>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Link href="/waitlist" className="btn-winamp">
                  JOIN WAITLIST
                </Link>
                <Link
                  href="/"
                  className="text-[12px] text-black/60 hover:text-black transition-colors underline underline-offset-4"
                >
                  Back to Home
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Subtle footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-6 left-0 right-0 text-center"
      >
        <p className="text-[10px] text-black/40 uppercase tracking-widest">
          © {new Date().getFullYear()} Socialite
        </p>
      </motion.div>
    </div>
  );
}
