const {
  override,
  overrideDevServer,
  disableEsLint,
  addBundleVisualizer,
} = require("customize-cra");
const { launchEditorMiddleware } = require("@react-dev-inspector/middleware");

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

  webpack: override(
    disableEsLint(),
    Number.parseInt(process.env.BUNDLE_VISUALIZE) === 1 && addBundleVisualizer()
  ),
};
// const kill = require("tree-kill");

// const pid = process.pid;
process.on("SIGINT", function () {
  // kill(pid, "SIGINT");
  process.exit(0);
});
