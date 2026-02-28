import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brandBlue: "#1a365d",
        brandGreen: "#38a169"
      },
      boxShadow: {
        soft: "0 8px 24px -12px rgba(26,54,93,0.35)"
      }
    }
  },
  plugins: []
};

export default config;
