// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pretendard", "sans-serif"],
      },
      colors: {
        background: "#F9FAFB",
        "background-dark": "#1F2937",

        text: "#374151",
        "text-dark": "#E5E7EB",

        border: "#D1D6DB",
        "border-dark": "#374151",

        primary: "#6366F1",
        "primary-dark": "#818CF8",

        secondary: "#FACC15",
        "secondary-dark": "#FDE047",

        error: "#EF4444",
        "error-dark": "#F87171",
      },
    },
  },
  plugins: [],
};

export default config;
