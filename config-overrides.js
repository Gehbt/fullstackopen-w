#!/usr/bin/env node
import {
  override,
  overrideDevServer,
  disableEsLint,
  addBundleVisualizer,
  addWebpackAlias,
  addBabelPlugins,
  addWebpackModuleRule,
} from "customize-cra";
import { launchEditorMiddleware } from "@react-dev-inspector/middleware";
import { resolve } from "path";

// eslint-disable-next-line no-unused-vars
import babel_type from "@babel/core"; // for type
import babel_preset from "./babel.config.cjs";

// * config more
// https://idayer.com/create-react-app-rewired-guide/
export const devServer = overrideDevServer((serverConfig) => {
  // https://webpack.js.org/configuration/dev-server/#devserversetupmiddlewares
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
  paths.dotenv = resolve(__dirname, ".env");
  paths.appJsConfig = resolve(__dirname, "jsconfig.json");
  return paths;
}
export const webpack = override(
  disableEsLint(),
  // addWebpackModuleRule({}),
  addWebpackAlias({
    [resolve(__dirname, "backend")]: false,
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
