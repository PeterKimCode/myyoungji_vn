module.exports = {
  content: [
    "./*.html",
    "./**/*.html",
    "./partials/**/*.html",
    "./assets/js/**/*.js",
  ],
  safelist: [
    "lg:flex",
    "lg:hidden",
    "sm:inline-flex",
    "sticky",
    "top-0",
    "z-40",
    "z-50",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
