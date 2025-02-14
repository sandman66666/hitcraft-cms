/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        bold: 700
      },
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      zIndex: {
        50: "50",
      },
      colors: {
        primary: "#d13e69",
        secondary: "#8a44c8",
      },
      borderRadius: {
        DEFAULT: "29.7px",
      },
      width: {
        "signup-button": "290px",
      },
      backdropBlur: {
        xs: "2px",
      },
      screens: {
        sm: "769px",
        md: "1025px",
        lg: "1280px",
        xl: "1440px",
        "2xl": "1537px",
        "3xl": "1920px",
      },
    },
  },
  plugins: [],
};
