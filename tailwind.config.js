/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./client/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        "house-black": ["Le Havre Black", "sans-serif"],
        "house-bold": ["Le Havre Bold", "sans-serif"],
        "house-regular": ["Le Havre Regular", "sans-serif"],
        "house-regular-italic": ["Le Havre Regular Italic", "sans-serif"],
        "logo-font": ["HWT Arabesque", "cursive"],
      },
      colors: {
        pink: "#fa67ce",
        "dark-pink": "#ad368a",
        teal: "#6de2d4",
        "dark-teal": "#71ada8",
        black: "#000000",
      },
    },
  },
  plugins: [],
};

// sans: ['"Le Havre Black"', ...defaultTheme.fontFamily.sans],
