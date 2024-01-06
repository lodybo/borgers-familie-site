import type { Config } from "tailwindcss";
import { black, white, rose, transparent } from "tailwindcss/colors";
import plugin from "tailwindcss/plugin";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      black,
      white,
      red: rose,
      grey: "rgb(230, 230, 230)",
      "neon-blue": "rgb(0, 9, 255)",
      "light-blue": "rgb(0, 151, 255)",
      transparent: transparent,
    },
    fontFamily: {
      standard: '"Helvetica", "Arial", sans-serif',
      plakat: '"Plakat Regular", "Helvetica", "Arial", sans-serif',
    },
    extend: {},
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant("details-open", "details[open] &");
    }),
  ],
} satisfies Config;
