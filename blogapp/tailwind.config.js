/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        Istacolor: {
          instaYellow: "#feda75",
          instaOrange: "#fa7e1e",
          instaPink: "#d62976",
          instaPurple: "#962fbf",
          instaTeal: "#1cd8d2",
        },

        primary: "#1565D8",
        dark: {
          light: "#5A7184",
          hard: "#0D2436",
          soft: "#183B56",
        },
      },
      fontFamily: {
        sans: ["'Open Sans'", "sans-serif"],
        roboto: ["'Roboto'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
