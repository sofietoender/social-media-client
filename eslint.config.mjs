import globals from "globals";
import pluginJs from "@eslint/js";
import cypressPlugin from "eslint-plugin-cypress";

export default [
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
  pluginJs.configs.recommended,
  {
    files: ["**/*.cy.js"], // Cypress test files
    plugins: {
      cypress: cypressPlugin,
    },
    rules: {
      "cypress/no-unnecessary-waiting": "off", // Example of custom rule
      "no-unused-vars": "off",
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...cypressPlugin.configs.recommended.env, // Cypress globals
      },
    },
  },
];
