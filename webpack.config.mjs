// @ts-check
// ! fail to replace cra
/* eslint-disable no-unused-vars */
import webpack from "webpack";
import path, { resolve } from "node:path";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import CopyPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { WebpackManifestPlugin } from "webpack-manifest-plugin";

/**
 * @type {webpack.Configuration}
 * */
const config =
  // other webpack configuration module:
  {
    mode: "development",
    entry: "./src/index.jsx",
    output: {
      path: path.resolve(process.cwd(), "new-build"),
      filename: "main.js",
      publicPath: "public",
      clean: true,
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        favicon: "./public/favicon.ico",
      }),
      // new CopyPlugin({
      //   patterns: [
      //     {
      //       from: "./public/index.html",
      //       transform(input) {
      //         try {
      //           let result = input.toString("utf8").replace(/%PUBLIC_URL%/, "");
      //           return result;
      //         } catch {
      //           throw new Error(
      //             `failed to replace %PUBLIC_URL% input:${input.toString(
      //               "utf8"
      //             )}`
      //           );
      //         }
      //       },
      //     },
      //   ],
      // }),
      // new BundleAnalyzerPlugin({
      //   analyzerMode: "static",
      //   openAnalyzer: false,
      // }),
      new webpack.DefinePlugin({}),
      // new WebpackManifestPlugin({}),
    ],
    optimization: {
      usedExports: true,
      moduleIds: "deterministic",
    },
    resolve: {
      alias: {
        // ignore files in the 'ignore' directory
        [resolve("backend")]: false,
      },
      extensions: [".js", ".css", ".cjs", ".mjs"],
    },
    module: {
      rules: [
        {
          test: /\.html$/i,
          loader: "html-loader",
          options: {
            preprocessor: (content) => {
              return content.replace(/%PUBLIC_URL%/g, "");
            },
            esModule: true,
          },
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: "esbuild-loader",
        },
        {
          test: /\.jsx$/,
          exclude: /node_modules/,
          use: "esbuild-loader",
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        // other rules
      ],
    },
    externals: {
      react: "React",
    },
    /**
     * @type {import("webpack-dev-server").Configuration}
     * */
    devServer: {
      port: 7370,
      static: ["public"],
    },
  };
export default config;
