import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        parchment: "#E5E4E0",
        ink: "#1D1D1D",
        muted: "#6B6A67",
        line: "#BFBEBE",
        paper: "#FFFFFF",
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        serif: ["var(--font-lora)", "Georgia", "serif"],
      },
      letterSpacing: { wider2: "0.16em", widest2: "0.22em" },
    },
  },
  plugins: [],
};
export default config;
