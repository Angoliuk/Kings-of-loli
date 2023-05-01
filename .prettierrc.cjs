/** @type {import("prettier").Config} */
const config = {
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  tabWidth: 2,
  endOfLine: 'auto',
  arrowParens: 'always',
  bracketSpacing: true,
  embeddedLanguageFormatting: 'auto',
  htmlWhitespaceSensitivity: 'css',
  insertPragma: false,
  jsxSingleQuote: false,
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  requirePragma: false,
  useTabs: false,
  vueIndentScriptAndStyle: false,
  printWidth: 120,
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
};

module.exports = config;
