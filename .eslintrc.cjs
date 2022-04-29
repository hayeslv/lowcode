
// "eslintConfig": {
//   "extends": "@hayeslv",
//   "ignorePatterns": ["auto-imports.d.ts"],
//   "rules": {}
// }
const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
  extends: "@hayeslv",
  rules: {
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-var-requires": "off",
    "import/first": "off",
    "@typescript-eslint/brace-style": ["warn", "1tbs", { allowSingleLine: true }],
  },
});
