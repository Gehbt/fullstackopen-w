/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import webpack from "webpack";
import escapeStringRegexp from "escape-string-regexp";
import HtmlWebpackPlugin from "html-webpack-plugin";

/**
 * @implements {webpack.WebpackPluginInstance}
 */
class InterpolateHtmlPlugin {
  /**
   * @param {typeof HtmlWebpackPlugin} htmlWebpackPlugin
   * @param {string} replacements
   */
  constructor(htmlWebpackPlugin, replacements) {
    this.htmlWebpackPlugin = htmlWebpackPlugin;
    this.replacements = replacements;
  }
  /**
   * @param {webpack.Compiler} compiler
   */
  apply(compiler) {
    compiler.hooks.compilation.tap("InterpolateHtmlPlugin", (compilation) => {
      this.htmlWebpackPlugin
        .getHooks(compilation)
        .afterTemplateExecution.tap("InterpolateHtmlPlugin", (data) => {
          // Run HTML through a series of user-specified string replacements.
          // TODO: Replacements
          // Object.keys(this.replacements).forEach((key) => {
          //   const value = this.replacements[/** @types {*} */key];
          //   data.html = data.html.replace(
          //     new RegExp("\\/%" + escapeStringRegexp(key) + "%\\/", "g"),
          //     value
          //   );
          // });
          return data;
        });
    });
  }
}

export { InterpolateHtmlPlugin };
