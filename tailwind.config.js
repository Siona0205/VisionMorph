/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aura: {
          mint: "#c7f2d0",
          lavender: "#dec8ff",
          peach: "#ffceb8",
          sky: "#d6ecff",
          white: "#ffffff",

          deep: "#2e2e38",
          softGray: "#dfe3e6",
        },
      },
      backgroundImage: {
        "aurora-bg": "linear-gradient(135deg, #ffceb8, #dec8ff, #c7f2d0)",
      },
      boxShadow: {
        neon: "0px 0px 18px rgba(222, 200, 255, 0.8)",
        soft: "0px 8px 40px rgba(0,0,0,0.06)",
      }
    },
  },
  plugins: [],
};
