/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ['"Open Sans"'],
      serif: ['"Playfair Display"'],
    },
    extend: {
      fontSize: {
        "4xl": "2.5rem",
      },
      screens: {
        "2xl": "1440px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
