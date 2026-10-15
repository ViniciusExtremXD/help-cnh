/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Taken from the Help Soluções e CNH logo.
        navy: {
          950: "#060C13",
          900: "#09121B",
          800: "#0E1A27",
          700: "#152536",
          600: "#22374D",
        },
        brand: {
          50: "#E8FBF2",
          100: "#C9F5E1",
          400: "#2EDB93",
          500: "#0ACF7D",
          600: "#08B36B",
          700: "#06864F",
        },
        signal: {
          50: "#FFF5E8",
          400: "#FFAC3D",
          500: "#FF9A1A",
          700: "#B45309",
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans Variable"', "system-ui", "sans-serif"],
        sans: ['"Inter Variable"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(9,18,27,0.04), 0 8px 24px -12px rgba(9,18,27,0.12)",
        lift: "0 2px 4px rgba(9,18,27,0.04), 0 24px 48px -20px rgba(9,18,27,0.28)",
      },
      keyframes: {
        "slide-progress": {
          from: { transform: "scaleX(0)" },
          to: { transform: "scaleX(1)" },
        },
      },
    },
  },
  plugins: [],
};
