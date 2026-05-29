import localFont from "next/font/local";

// Self-hosted fonts (no external fetch). Files live in /fonts.
export const poppins = localFont({
  src: [
    { path: "../fonts/poppins-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/poppins-600.woff2", weight: "600", style: "normal" },
    { path: "../fonts/poppins-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "swap",
});

export const inter = localFont({
  src: [
    { path: "../fonts/inter-latin-wght-normal.woff2", weight: "100 900", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
});
