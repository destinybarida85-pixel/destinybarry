import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        parchment: "#FBFAF9",
        ink: "#121212",
        muted: "#7E7E7D",
        line: "#EBE7E0",
        paper: "#FFFFFF",
        stone: "#F2F0ED",
        sand: "#F6F4EF",
        body: "#474645",
        ember: "#FF3E00",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
      letterSpacing: { wider2: "0.16em", widest2: "0.22em" },
    },
  },
  plugins: [],
};
export default config;
