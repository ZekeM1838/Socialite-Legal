"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import GlassButton from "@/components/ui/GlassButton";

export default function ComingSoonPage() {
  const [phase, setPhase] = useState<"socialite" | "coming-soon">("socialite");

  useEffect(() => {
    // Total duration of the "Socialite" fly-through is 3.5s
    const timer = setTimeout(() => {
      setPhase("coming-soon");
    }, 3500); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
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
                // Fades in, stays solid, then fades out as it retreats
                opacity: [0, 1, 1, 0], 
                // SHOOTING ACTION: Tiny -> Giant (Zoom past) -> Normal -> Tiny (Retreat)
                scale: [0.1, 2.2, 1, 0.2],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 3.5,
                // Timing: 0% (Start), 25% (Shot at screen), 75% (Hold), 100% (Gone)
                times: [0, 0.25, 0.75, 1], 
                ease: "easeInOut",
              }}
              className="text-5xl md:text-7xl font-drexs text-black"
            >
              Socialite
            </motion.h1>
          ) : (
            <motion.div
              key="coming-soon"
              // Start blurred and invisible to create a "cinematic dissolve"
              initial={{ opacity: 0, filter: "blur(10px)", scale: 0.9 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              transition={{ 
                duration: 1.2, 
                ease: "easeOut" 
              }}
              className="text-center"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-6xl font-drexs text-black mb-4"
              >
                Coming Soon
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-sm md:text-base text-black/60 mb-8 max-w-md mx-auto"
              >
                We&apos;re working hard to bring you something amazing.
                <br />
                Join the waitlist to be the first to know.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <GlassButton 
                  title="JOIN WAITLIST" 
                  href="/waitlist" 
                />
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
        className="absolute bottom-6 left-0 right-0 text-center"
      >
        <p className="text-[10px] text-black/40 uppercase tracking-widest">
          © {new Date().getFullYear()} Socialite
        </p>
      </motion.div>
    </div>
  );
}
