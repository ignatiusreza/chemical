module.exports = {
  env: {
    browser: true,
    es6: true,
    jasmine: true,
    jest: true,
    node: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
};
