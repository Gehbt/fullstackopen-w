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
    parseInt(process.env.BUNDLE_VISUALIZE) === 1 && addBundleVisualizer()
  ),
};
