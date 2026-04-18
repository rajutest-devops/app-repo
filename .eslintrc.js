module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: ['react-app', 'eslint:recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: { jsx: true }
  },
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'off'
  }
};
