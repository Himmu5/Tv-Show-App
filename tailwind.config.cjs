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
        "brand-bright": "#FF1A2B",
        "brand-dim": "#9F0712",
        surface: "#0c0c0c",
        "surface-elevated": "#141414",
        "surface-card": "#1a1a1a",
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
          "linear-gradient(90deg, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.72) 42%, rgba(0,0,0,0.35) 72%, rgba(0,0,0,0.15) 100%), linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.2) 45%, rgba(0,0,0,0.92) 100%)",
        "card-shine":
          "linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.55) 38%, rgba(0,0,0,0.15) 65%, transparent 100%)",
        "mesh-landing":
          "radial-gradient(ellipse 85% 55% at 15% -5%, rgba(229,9,20,0.14), transparent 55%), radial-gradient(ellipse 50% 40% at 95% 5%, rgba(120,113,255,0.07), transparent 50%), radial-gradient(ellipse 70% 50% at 50% 100%, rgba(229,9,20,0.06), transparent 45%)",
        "text-shine":
          "linear-gradient(135deg, #ffffff 0%, #e4e4e7 45%, #ffffff 100%)",
      },
      boxShadow: {
        card: "0 4px 6px -1px rgba(0,0,0,0.45), 0 12px 24px -4px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.04)",
        "card-hover":
          "0 8px 16px -2px rgba(0,0,0,0.5), 0 24px 48px -8px rgba(0,0,0,0.75), 0 0 0 1px rgba(229,9,20,0.25), 0 0 40px -12px rgba(229,9,20,0.35)",
        glow: "0 0 24px -4px rgba(229,9,20,0.45)",
        "inner-glow": "inset 0 1px 0 rgba(255,255,255,0.06)",
      },
      transitionTimingFunction: {
        crisp: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      transitionDuration: {
        250: "250ms",
        400: "400ms",
      },
      keyframes: {
        castReveal: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "cast-reveal":
          "castReveal 0.42s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}
