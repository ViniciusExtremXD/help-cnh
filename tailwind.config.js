/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#070A12",
        midnight: "#0D1322",
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans Variable"', "system-ui", "sans-serif"],
        sans: ['"Inter Variable"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono Variable"', "ui-monospace", "monospace"],
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-160%) skewX(-12deg)" },
          "35%, 100%": { transform: "translateX(320%) skewX(-12deg)" },
        },
        "glow-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 0 0 rgba(16,185,129,0), 0 10px 30px -12px rgba(16,185,129,.55)",
          },
          "50%": {
            boxShadow: "0 0 0 6px rgba(16,185,129,.12), 0 12px 42px -8px rgba(16,185,129,.85)",
          },
        },
        "grid-pulse": {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.7" },
        },
        "grid-flow": {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "0 64px" },
        },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        "marquee-reverse": "marquee-reverse 46s linear infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2.6s ease-in-out infinite",
        "grid-pulse": "grid-pulse 6s ease-in-out infinite",
        "grid-flow": "grid-flow 3s linear infinite",
        "spin-slow": "spin 4s linear infinite",
        "spin-radar": "spin 3.2s linear infinite",
      },
    },
  },
  plugins: [],
};
