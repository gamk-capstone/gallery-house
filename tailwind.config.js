/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./client/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        "house-font": ["Le Havre Black", "sans-serif"],
        colors: {
          pink: "#fa67ce",
          "dark-pink": "#ad368a",
          teal: "#6de2d4",
          "dark-teal": "#71ada8",
          black: "#000000",
        },
      },
    },
  },
  plugins: [],
};

// sans: ['"Le Havre Black"', ...defaultTheme.fontFamily.sans],
