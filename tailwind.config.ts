import type { Config } from "tailwindcss";
import { black, white } from "tailwindcss/colors";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      black,
      white,
      grey: "rgb(230, 230, 230)",
      "neon-blue": "rgb(0, 9, 255)",
      "light-blue": "rgb(0, 151, 255)",
    },
    fontFamily: {
      standard: '"Helvetica", "Arial", sans-serif',
      plakat: '"Plakat Regular", "Helvetica", "Arial", sans-serif',
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
