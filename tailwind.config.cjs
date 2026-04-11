/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#E50914",
        surface: "#141414",
        "surface-elevated": "#181818",
        muted: "#808080",
      },
      fontFamily: {
        sans: [
          "Netflix Sans",
          "Helvetica Neue",
          "Segoe UI",
          "Roboto",
          "Ubuntu",
          "sans-serif",
        ],
        display: [
          "Netflix Sans",
          "Helvetica Neue",
          "Segoe UI",
          "Roboto",
          "Ubuntu",
          "sans-serif",
        ],
      },
      backgroundImage: {
        "hero-vignette":
          "linear-gradient(90deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.65) 45%, rgba(0,0,0,0.25) 100%), linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.85) 100%)",
        "card-shine":
          "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 45%, transparent 100%)",
      },
      boxShadow: {
        card: "0 8px 24px rgba(0,0,0,0.55)",
        "card-hover": "0 16px 48px rgba(0,0,0,0.75)",
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}
