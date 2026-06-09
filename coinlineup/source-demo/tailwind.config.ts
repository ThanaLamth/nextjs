import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#F7931A",
          "orange-dark": "#D4780F",
          "orange-light": "#FFB347",
          green: "#00A86B",
          gold: "#C9A84C",
          red: "#E63946",
          bg: "#0D0D0D",
          "gray-90": "#1A1A1A",
          "gray-85": "#252525",
          "gray-70": "#444444",
          "gray-50": "#777777",
          "gray-33": "#AAAAAA",
          "gray-13": "#DDDDDD",
          "off-white": "#F5F5F0",
        },
        light: {
          bg: "#F5F5F0",
          surface: "#FFFFFF",
          card: "#FFFFFF",
          border: "#E5E7EB",
          "border-hover": "#D1D5DB",
          text: "#111827",
          "text-secondary": "#6B7280",
          "text-muted": "#9CA3AF",
          nav: "#FFFFFF",
          ticker: "#F0F0EC",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Montserrat", "sans-serif"],
      },
      backgroundImage: {
        "orange-gradient": "linear-gradient(135deg, #F7931A 0%, #D4780F 100%)",
        "dark-gradient": "linear-gradient(180deg, #0D0D0D 0%, #1A1A1A 100%)",
        "hero-gradient": "linear-gradient(180deg, rgba(13,13,13,0) 0%, rgba(13,13,13,0.95) 100%)",
        "card-gradient": "linear-gradient(180deg, rgba(13,13,13,0) 40%, rgba(13,13,13,1) 100%)",
        "light-card-gradient": "linear-gradient(180deg, rgba(245,245,240,0) 40%, rgba(245,245,240,1) 100%)",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)",
        "card-hover": "0 4px 20px rgba(247,147,26,0.15)",
        "card-light": "0 1px 4px rgba(0,0,0,0.08)",
        "card-light-hover": "0 6px 24px rgba(247,147,26,0.18)",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        ticker: "ticker 40s linear infinite",
        "ticker-fast": "ticker 25s linear infinite",
        "fade-up": "fade-up 0.5s ease forwards",
      },
    },
  },
  plugins: [],
};
export default config;
