module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    'jest/globals': true,
  },
  extends: [
    'airbnb-base',
    'plugin:jest/recommended',
  ],
  plugins: [
    'jest',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    indent: ['error', 4],
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'off',
    'no-unused-vars': 'warn',
  },
};
