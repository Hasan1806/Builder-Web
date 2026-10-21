import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: { colors: { ink: "#0c0e0d", panel: "#141615", linen: "#f4f1ea", bronze: "#c5a880", stone: "#8a857b" } } },
  plugins: [],
} satisfies Config;
