const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: "#66ff66",
        secondary: "#f50057",
        tertiary: "#d3ffd3",
      },
    },
  },
  plugins: [],
};
