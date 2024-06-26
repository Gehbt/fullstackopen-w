// import eslint from "eslint";
// import js from "@eslint/js";
// import react from "eslint-plugin-react";
// import react_hooks from "eslint-plugin-react-hooks";
// import react_refresh from "eslint-plugin-react-refresh";
// import globals from "globals";
// import jest_dom from "eslint-plugin-jest-dom";
// // import react_app from "react-scripts";
// import react_plugin from "@eslint-react/eslint-plugin";
// /**
//  * @type {eslint.Linter.FlatConfig[]}
//  */
// const configs = [
//   {
//     ignores: ["node_modules", "backend", "build", "new-build"],
//   },
//   {
//     name: "hooks & refresh",
//     files: ["./src/**/*.jsx"],
//     plugins: {
//       react_hooks,
//       react_refresh,
//     },
//     rules: {
//       "react_hooks/rules-of-hooks": "error",
//       "react_hooks/exhaustive-deps": "error",
//       "react_refresh/only-export-components": "error",
//     },
//   },
//   {
//     name: "react_plugin",
//     files: ["src/**/*.jsx"],
//     ...react_plugin.configs.recommended,
//     languageOptions: {
//       parserOptions: {
//         ecmaFeatures: {
//           jsx: true,
//         },
//       },
//     },
//   },
//   {
//     name: "@override/react_plugin",
//     rules: {
//       "@eslint-react/dom/no-missing-button-type": "off",
//       "@eslint-react/prefer-destructuring-assignment": "off",
//       // "@eslint-react/no-class-component": "error",
//     },
//   },
//   {
//     name: "js",
//     files: ["./src/**/*.js"],
//     rules: {
//       // ...js.configs.recommended.rules,
//       "no-unused-vars": "error",
//       eqeqeq: "error",
//     },
//   },
//   // {
//   //   ...jest_dom.configs["flat/recommended"],
//   //   files: ["src/tests/**/*.spec.*", "src/tests/**/*.test.*"],
//   // },
// ];
// export default configs;
import { fixupConfigRules } from "@eslint/compat";
import reactRefresh from "eslint-plugin-react-refresh";
// import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

/**
 * @type {eslint.Linter.FlatConfig[]}
 */
export default [
  {
    ignores: [
      "**/dist",
      "**/.eslintrc.cjs",
      "node_modules",
      "backend/*",
      "build/*",
      "new-build/*",
      "./coverage",
    ],
    files: ["src/**/*.jsx", "src/**/*.js"],
  },
  ...fixupConfigRules(
    compat.extends(
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:react/jsx-runtime",
      "plugin:react-hooks/recommended"
    )
  ),
  {
    plugins: {
      "react-refresh": reactRefresh,
    },

    languageOptions: {
      // globals: {
      //   ...globals.browser,
      // },

      ecmaVersion: "latest",
      sourceType: "module",
    },

    settings: {
      react: {
        version: "18.2",
      },
    },

    rules: {
      // indent: ["error", 2],
      // "linebreak-style": ["error", "windows"],
      // quotes: ["error", "double"],
      // semi: ["error", "always"],
      eqeqeq: "error",
      "no-trailing-spaces": "error",
      "object-curly-spacing": ["error", "always"],
      "no-undef": "off",
      "arrow-spacing": [
        "error",
        {
          before: true,
          after: true,
        },
      ],

      "no-console": 0,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": 0,
      "no-unused-vars": "off",
    },
  },
];
