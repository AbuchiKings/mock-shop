module.exports = {
  env: {
    es6: true,
    node: true,
    "mocha": true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': 0,
    'comma-dangle': 0,
    'no-console': 0,
    'no-use-before-define': 0
  
  },
};
