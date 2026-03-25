import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0B1E3D",
          50: "#E8EDF5",
          100: "#C5D0E3",
          200: "#9AADC8",
          300: "#6F8AAC",
          400: "#3D5F84",
          500: "#1E3A5F",
          600: "#0B1E3D",
          700: "#091828",
          800: "#060F18",
          900: "#030609",
        },
        ocean: {
          DEFAULT: "#1E5FAD",
          50: "#E8F0FA",
          100: "#C5D9F1",
          200: "#93BBE5",
          300: "#619CD9",
          400: "#3B7FC9",
          500: "#1E5FAD",
          600: "#174D8E",
          700: "#103A6F",
          800: "#082750",
          900: "#041431",
        },
        teal: {
          DEFAULT: "#0D9488",
          50: "#E6FAF9",
          100: "#B3F0EC",
          200: "#80E6DF",
          300: "#4DD9D2",
          400: "#26C4BC",
          500: "#0D9488",
          600: "#0A7A70",
          700: "#076158",
          800: "#054740",
          900: "#022E29",
        },
        gold: {
          DEFAULT: "#F59E0B",
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
        },
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
        sans: ["var(--font-dm-sans)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-navy": "linear-gradient(135deg, #0B1E3D 0%, #1E3A5F 50%, #1E5FAD 100%)",
        "gradient-ocean": "linear-gradient(135deg, #1E5FAD 0%, #0D9488 100%)",
        "gradient-gold": "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
        "hero-gradient": "linear-gradient(to bottom, rgba(11,30,61,0.7) 0%, rgba(11,30,61,0.4) 50%, rgba(11,30,61,0.8) 100%)",
      },
      boxShadow: {
        "card": "0 4px 24px rgba(11, 30, 61, 0.08)",
        "card-hover": "0 8px 40px rgba(11, 30, 61, 0.16)",
        "gold": "0 4px 20px rgba(245, 158, 11, 0.3)",
        "ocean": "0 4px 20px rgba(30, 95, 173, 0.3)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "wave": "wave 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        wave: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
