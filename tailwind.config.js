/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: { black: "#232323" },
    container: {
      center: true,
      padding: "1rem"
    },
    extend: {
      colors: {
        gold: {
          solid: "#C5A674",
          light: "#E7DECF",
          gradientFrom: "#B18C58",
          gradientTo: "#E0CB9C"
        },
        blue: {
          solid: "#00497E",
          light: "#C4D3DD"
        },
        grey: {
          solid: "#8C8C8C",
          light: "#E1E1E1"
        },
        gradient: {
          from: "rgba(0, 0, 0, 0.8)",
          to: "rgba(0, 0, 0, 0)"
        },
        white: "#fff"
      },

      spacing: {
        15: "4rem"
      },
      fontSize: {
        xxs: ".625rem"
      }
    }
  },
  plugins: []
};
