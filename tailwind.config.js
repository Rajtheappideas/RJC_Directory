/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary_color: "#02BD95",
        bgGray: "#FAFCFF",
        textColor: "#222",
        borderColor: "#D8DAE5",
        greenColor: "#02BD95",
        blueColor: "#1489FB",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
