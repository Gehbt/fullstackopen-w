#!/usr/bin/env node
// @ts-check
import {
  override,
  overrideDevServer,
  disableEsLint,
  addBundleVisualizer,
  addWebpackPlugin,
  addWebpackAlias,
  addBabelPlugins,
  addWebpackModuleRule,
} from "customize-cra";
import { launchEditorMiddleware } from "@react-dev-inspector/middleware";
import { dirname, resolve } from "path";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";
import babel_type from "@babel/core"; // for type
import babel_preset from "./babel.config.cjs";
import StylexPlugin from "@stylexjs/webpack-plugin";
import { fileURLToPath } from "url";

const pwd = import.meta.dirname ?? dirname(fileURLToPath(import.meta.url));
// * config more
// https://idayer.com/create-react-app-rewired-guide/
export const devServer = overrideDevServer((serverConfig) => {
  // https://webpack.js.org/configuration/dev-server/#devserversetupmiddlewares
  // @ts-expect-error default
  serverConfig.setupMiddlewares = (middlewares) => {
    middlewares.unshift(launchEditorMiddleware);
    return middlewares;
  };

  return serverConfig;
});
/**
 * Sets the paths for the dotenv and appJsConfig in the given paths object.
 *
 * @param {{dotenv: string, appJsConfig: string}} paths - The paths object to modify.
 * @param {string} env - The environment variable.
 * @return {Object} The modified paths object.
 */
export function paths(paths, env) {
  // 指向根目录的 test.html
  paths.dotenv = resolve(pwd, ".env");
  paths.appJsConfig = resolve(pwd, "jsconfig.json");
  return paths;
}
export const webpack = override(
  disableEsLint(),
  addWebpackModuleRule({
    test: /\.jsx$/,
    loader: "esbuild-loader",
    options: {
      // JavaScript version to compile to
      target: "es2020",
      tsconfig: "./jsconfig.json",
    },
  }),
  // addWebpackModuleRule({
  //   test: /\.m?js$/,
  //   exclude: /node_modules/,
  //   loader: "esbuild-loader",
  //   options: {
  //     // JavaScript version to compile to
  //     target: "es2020",
  //     tsconfig: "./jsconfig.json",
  //   },
  // }),
  addWebpackPlugin(
    new TsconfigPathsPlugin({
      baseUrl: ".",
      configFile: "./jsconfig.json",
      extensions: [".js", ".jsx", ".mjs"],
    })
  ),
  // addWebpackPlugin(
  //   new StylexPlugin({
  //     filename: "styles.[contenthash].css",
  //     // get webpack mode and set value for dev
  //     dev: true,
  //     // Use statically generated CSS files and not runtime injected CSS.
  //     // Even in development.
  //     runtimeInjection: false,
  //     // optional. default: 'x'
  //     classNamePrefix: "x",
  //     // Required for CSS variable support
  //     unstable_moduleResolution: {
  //       // type: 'commonJS' | 'haste'
  //       // default: 'commonJS'
  //       type: "commonJS",
  //       // The absolute path to the root directory of your project
  //       rootDir: resolve(pwd),
  //     },
  //   })
  // ),
  // @ts-expect-error type error
  addWebpackAlias({
    [resolve(pwd, "backend")]: false,
  })
  // Number.parseInt(process.env.BUNDLE_VISUALIZE) === 1 && addBundleVisualizer()
);
export function babel(/** @type {babel_type.TransformOptions} */ config) {
  config.plugins.push(addBabelPlugins(babel_preset.presets));
  return config;
}
// const kill = require("tree-kill");

// const pid = process.pid;
// process.on("SIGINT", function () {
//   // kill(pid, "SIGINT");
//   process.exit(0);
// });
console.log("override config!");
