import localFont from "next/font/local";

// Drexs font - loaded with Next.js font optimization (no FOUT)
// Uses the font file in public/fonts/
export const drexs = localFont({
  src: "../../public/fonts/Drexs.ttf",
  variable: "--font-drexs",
  display: "block", // Prevents flash - hides text briefly until font loads
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});
