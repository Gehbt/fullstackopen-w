const eslint = require("eslint");
const eslint_js = require("@eslint/js");

const react = require("eslint-plugin-react");
const reactRecommended = require("eslint-plugin-react/configs/recommended");
const reactJsxRuntime = require("eslint-plugin-react/configs/jsx-runtime");
const react_hooks = require("eslint-plugin-react-hooks");
const react_refresh = require("eslint-plugin-react-refresh");
const globals = require("globals");
const jest_dom = require("eslint-plugin-jest-dom");

// import react_app from "react-scripts";
const react_plugin = require("@eslint-react/eslint-plugin");
/**
 * @type {eslint.Linter.FlatConfig[]}
 */
const configs = [
  {
    name: "legacy",
    files: ["./src/**/*.jsx"],
    plugins: {
      react: react.configs.all,
    },
    languageOptions: {
      parser: "@babel/eslint-parser",
      parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest",
        ecmaFeatures: {
          jsx: true,
        },
        babelOptions: {
          configFile: "./babel.config.cjs",
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    ...reactRecommended,
    rules: {
      ...reactRecommended.rules,
      // react17+
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
    },
  },
  {
    name: "hooks & refresh",
    files: ["./src/**/*.jsx"],
    plugins: {
      react_hooks,
      react_refresh,
    },
    rules: {
      "react_hooks/rules-of-hooks": "error",
      "react_hooks/exhaustive-deps": "error",
      "react_refresh/only-export-components": "error",
    },
  },
  {
    name: "react_plugin",
    files: ["./src/**/*.jsx"],
    ...react_plugin.configs.recommended,
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    name: "@override/react_plugin",
    rules: {
      // "@eslint-react/no-class-component": "error",
    },
  },
  {
    name: "js",
    files: ["./src/**/*.js"],
    rules: {
      ...eslint_js.configs.recommended.rules,
      "no-unused-vars": "error",
      eqeqeq: "error",
    },
  },
  // {
  //   ...jest_dom.configs["flat/recommended"],
  //   files: ["src/tests/**/*.spec.*", "src/tests/**/*.test.*"],
  // },
];
module.exports = configs;
