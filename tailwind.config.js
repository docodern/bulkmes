module.exports = {
  content: ["./pages/**/*.js", "./components/**/*.js", "./slices/**/*.js"],
  theme: {
    fontFamily: {
      sans: '"Work Sans", Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    },
    extend: {
      colors: {
        main: '#6C55F9',
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
