import globals from "globals";
import pluginJs from "@eslint/js";
import cypressPlugin from "eslint-plugin-cypress";
import jestPlugin from "eslint-plugin-jest";

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
    files: ["**/*.test.js"], 
    plugins: {
      jest: jestPlugin, 
    },
    rules: {
      "jest/prefer-expect-assertions": "off", 
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,  
        jest: "readonly",  
        test: "readonly",  
        expect: "readonly",  
        describe: "readonly", 
        it: "readonly",      
        afterEach: "readonly", 
      },
    },
  },
  {
    files: ["**/*.cy.js"], 
    plugins: {
      cypress: cypressPlugin,
    },
    rules: {
      "cypress/no-unnecessary-waiting": "off",
      "no-unused-vars": "off",
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...cypressPlugin.configs.recommended.env, 
        cy: "readonly",  
      },
    },
  },
];
