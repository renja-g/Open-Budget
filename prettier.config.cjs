/** @type {import("prettier").Config} */
const config = {
  singleQuote: true,
  semi: true,
  trailingComma: 'es5',
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
};

module.exports = config;
