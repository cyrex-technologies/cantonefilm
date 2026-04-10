import type { Config } from "tailwindcss";

const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F5F0E1",
        cream2: "#EDE8D5",
        warm: "#FAF7F0",
        gold: "#B8872A",
        "gold-l": "#D4A84B",
        dark: "#1A1408",
        text: "#2C2410",
        muted: "#7A6A4A",

        /* Compatibility aliases for existing class usage */
        navy: "#1A1408",
        brown: "#7A6A4A",
        "brown-dark": "#2C2410",
        black: "#000000",
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
    },
  },

  plugins: [],
} satisfies Config;

export default config;
