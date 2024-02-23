const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const atApply = require('postcss-apply');

module.exports = {
  plugins: [
    tailwindcss(),
    autoprefixer(),
    atApply(),
  ],
};
