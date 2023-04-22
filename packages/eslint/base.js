/* eslint-disable unicorn/prefer-module */
module.exports = {
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  extends: [
    'turbo',
    'plugin:jsx-a11y/recommended',
    'plugin:unicorn/recommended',
    'plugin:prettier/recommended', // Make sure this is always the last element in the array.
  ],
  plugins: ['simple-import-sort', 'prettier', 'check-file'],
  rules: {
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    'jsx-a11y/accessible-emoji': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'check-file/folder-naming-convention': [
      'error',
      {
        'src/**': 'KEBAB_CASE',
      },
    ],
  },
  ignorePatterns: ['node_modules'],
};
