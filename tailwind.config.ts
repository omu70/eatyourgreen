import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: "var(--green-900)",
        brand: "var(--green-700)",
        leaf: "var(--green-500)",
        mist: "var(--green-100)",
        cta: { DEFAULT: "var(--cta)", hover: "var(--cta-hover)" },
        cream: "var(--cream)",
        ink: "var(--ink)",
        gold: "var(--gold)",
      },
      fontFamily: {
        heading: ["var(--font-poppins)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        h1: ["30px", { lineHeight: "1.15", fontWeight: "700" }],
        "h1-lg": ["48px", { lineHeight: "1.1", fontWeight: "700" }],
        h2: ["24px", { lineHeight: "1.2", fontWeight: "700" }],
        "h2-lg": ["36px", { lineHeight: "1.15", fontWeight: "700" }],
        h3: ["18px", { lineHeight: "1.3", fontWeight: "600" }],
        "h3-lg": ["24px", { lineHeight: "1.25", fontWeight: "600" }],
      },
      maxWidth: { measure: "64ch" },
      boxShadow: { card: "0 4px 20px rgba(0,0,0,.06)" },
      borderRadius: { card: "16px" },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
