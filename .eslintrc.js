module.exports = {
  "env": {
    "browser": true,
    "jquery": true,
  },
  "parserOptions": {
      "ecmaVersion": 7,
      "sourceType": "module"
  },
  "globals": {
  },
  "extends": "eslint:recommended",
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "no-console": "off",
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]
  }
};