import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    "rules": {
      "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-require-imports": "off",
      "prefer-const": "off",
      "no-var": "off",
      "no-useless-escape": "off",
      "no-empty": "off",
      // note you must disable the base rule
      // as it can report incorrect errors
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn", // or "error"
        {
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "caughtErrorsIgnorePattern": "^_"
        }
      ]
    }
  }
];