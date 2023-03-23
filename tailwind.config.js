/** @type {import('tailwindcss').Config} */


module.exports = {
  content: ["./client/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'house-font': ['Le Havre Black', 'sans-serif'],
      }
    }
  },
  plugins: [],
};

// sans: ['"Le Havre Black"', ...defaultTheme.fontFamily.sans],