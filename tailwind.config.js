module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        brand: {
          300: "#996dfe",
          500: "#8257e6",
        },
      },
      borderRadius: {
        md: "4px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
