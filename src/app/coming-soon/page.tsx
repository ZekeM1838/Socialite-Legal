"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import GlassButton from "@/components/ui/GlassButton";

export default function ComingSoonPage() {
  const [phase, setPhase] = useState<"socialite" | "coming-soon">("socialite");

  useEffect(() => {
    // Phase 1: Socialite Fly-through (3.5s)
    const timer = setTimeout(() => {
      setPhase("coming-soon");
    }, 7300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/images/coming-soon-bg.jpeg)" }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <AnimatePresence mode="wait">
          {phase === "socialite" ? (
            <motion.h1
              key="socialite"
              initial={{ opacity: 0, scale: 0.1 }}
              animate={{ 
                opacity: [0, 0.4, 1, 0], 
                scale: [0.1, .5, .8, 0.1] // Shot forward then pulled back
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 3.5,
                times: [0, 0.5, 0.75, 1], 
                ease: "easeInOut",
              }}
              className="text-[100px] md:text-xl font-drexs text-black"
            >
              Socialite
            </motion.h1>
          ) : (
            /* PHASE 2: MIMIC EMAIL SCREEN FADE */
            <motion.div
              key="coming-soon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ 
                duration: 4.5, // Matches your app's Animated.timing duration
                ease: "linear" 
              }}
              className="flex flex-col items-center justify-center text-center w-full"
            >
              {/* Coming Soon Text (No y-offset jump) */}
              <h1 className="text-4xl md:text-6xl font-drexs text-black mb-4">
                Coming Soon
              </h1>

              {/* Subtitle */}
              <p className="text-sm md:text-base text-black/60 mb-8 mx-auto font-drexs text-center leading-snug max-w-lg md:max-w-2xl">
                <span className="block">
                  We&apos;re working hard to bring you something amazing.
                </span>
                <span className="block">
                  Join the waitlist to be the first to know.
                </span>
              </p>

              {/* Bottom Container Mimic */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <GlassButton 
                  title="Back Home" 
                  href="/" 
                />
                <GlassButton 
                  title="Join Waitlist" 
                  href="/waitlist" 
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Subtle footer - Fades in even later */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5, duration: 2 }}
        className="absolute bottom-6 left-0 right-0 text-center"
      >
        <p className="text-[10px] text-black/40 uppercase tracking-widest">
          © {new Date().getFullYear()} Socialite
        </p>
      </motion.div>
    </div>
  );
}


