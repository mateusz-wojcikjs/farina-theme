/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: { black: "#232323" },
    extend: {
      colors: {
        gold: {
          solid: "#C5A674",
          light: "#E7DECF"
        },
        blue: {
          solid: "#00497E",
          light: "#C4D3DD"
        },
        grey: {
          solid: "#8C8C8C",
          light: "#E1E1E1"
        }
      }
    }
  },
  plugins: []
};
