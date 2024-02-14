const {
  override,
  overrideDevServer,
  disableEsLint,
  addBundleVisualizer,
  addWebpackAlias,
  addWebpackModuleRule,
} = require("customize-cra");
const { launchEditorMiddleware } = require("@react-dev-inspector/middleware");
const path = require("path");
// config more
// https://idayer.com/create-react-app-rewired-guide/
module.exports = {
  /**
   * react-dev-inspector server config for webpack-dev-server
   */
  devServer: overrideDevServer((serverConfig) => {
    // https://webpack.js.org/configuration/dev-server/#devserversetupmiddlewares
    serverConfig.setupMiddlewares = (middlewares) => {
      middlewares.unshift(launchEditorMiddleware);
      return middlewares;
    };

    return serverConfig;
  }),

  paths: function (paths, env) {
    // 指向根目录的test.html
    paths.dotenv = path.resolve(__dirname, ".env");
    paths.appJsConfig = path.resolve(__dirname, "jsconfig.json");
    return paths;
  },
  webpack: override(
    disableEsLint(),
    // addWebpackModuleRule(),
    addWebpackAlias({
      [path.resolve(__dirname, "backend")]: false,
    }),
    Number.parseInt(process.env.BUNDLE_VISUALIZE) === 1 && addBundleVisualizer()
  ),
};
// const kill = require("tree-kill");

// const pid = process.pid;
// process.on("SIGINT", function () {
//   // kill(pid, "SIGINT");
//   process.exit(0);
// });
