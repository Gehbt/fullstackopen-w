// @ts-check
// ! fail to replace cra
import webpack from "webpack";
import path, { resolve } from "node:path";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import CopyPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { WebpackManifestPlugin } from "webpack-manifest-plugin";
import nodeExternals from "webpack-node-externals";
import { EsbuildPlugin } from "esbuild-loader";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { InterpolateHtmlPlugin } from "./cra/InterpolateHtmlPlugin.js";

const PublicDir = resolve(process.cwd(), "public");

/**
 * @param {number} percentage
 * @param {string} message
 * @param  {...any} args
 */
const handler = (percentage, message, ...args) => {
  // e.g. Output each progress message directly to the console:
  console.log(percentage.toFixed(3), message, ...args);
};
/**
 * @type {webpack.Configuration}
 * */
const config =
  // other webpack configuration module:
  {
    mode: "development",
    entry: {
      main: "./src/index.jsx",
    },
    devtool: "eval-cheap-source-map",
    output: {
      path: path.resolve(process.cwd(), "wp-build"),
      filename: "js/main.[contenthash:8].js",
      publicPath: "/public",
      clean: true,
      scriptType: "module",
      sourceMapFilename: "js/[name].[id].js.map",
      assetModuleFilename: "[name].[hash][ext]",
    },

    plugins: [
      new InterpolateHtmlPlugin(HtmlWebpackPlugin, "PUBLIC_URL"),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        favicon: "./public/favicon.ico",
        filename: "index.html",
        manifest: "./public/manifest.json",
        publicPath: "",
        templateParameters: {
          PUBLIC_URL: PublicDir,
        },
      }),
      new webpack.ProgressPlugin(handler),
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
      // ts-expect-error plugin-type-error
      // new BundleAnalyzerPlugin({
      //   analyzerMode: "static",
      //   openAnalyzer: false,
      //   generateStatsFile: true,
      // }),
      new EsbuildPlugin({}),
      new WebpackManifestPlugin({
        fileName: "asset-manifest.json",
        publicPath: "public",
        generate: (seed, files, entrypoints) => {
          const manifestFiles = files.reduce((manifest, file) => {
            manifest[file.name] = file.path;
            return manifest;
          }, seed);
          const entrypointFiles = entrypoints.main.filter(
            (fileName) => !fileName.endsWith(".map")
          );

          return {
            files: manifestFiles,
            entrypoints: entrypointFiles,
          };
        },
      }),
      // ts-expect-error plugin-type-error
      // new TsconfigPathsPlugin({
      //   baseUrl: ".",
      //   configFile: "./jsconfig.json",
      //   extensions: [".js", ".jsx"],
      // }),
      new MiniCssExtractPlugin({
        // 使用MiniCssExtractPlugin插件
        filename: "css/[name]-[id].css", // 打包后的css文件放到css文件夹中
        chunkFilename: "css/[name]-[id].css",
      }),
    ],
    optimization: {
      usedExports: true,
      moduleIds: "deterministic",
      sideEffects: true,
    },
    resolve: {
      alias: {
        // ignore files in the 'ignore' directory
        [resolve("backend")]: false,
        "@": resolve("src"),
      },
      extensions: [".js", ".css", ".jsx"],
    },
    module: {
      rules: [
        {
          test: /index-new-build\.html$/,
          loader: "html-loader",
          options: {
            preprocessor: (/** @type {string} */ content) => {
              return content.replace(
                /%PUBLIC_URL%/g,
                resolve(process.cwd(), "public")
              );
            },
            esModule: true,
          },
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "esbuild-loader",
          options: {
            // JavaScript version to compile to
            target: "es2020",
            tsconfig: "./jsconfig.json",
          },
        },
        {
          test: /\.jsx$/,
          exclude: /node_modules/,
          loader: "esbuild-loader",
          options: {
            // JavaScript version to compile to
            target: "es2020",
            tsconfig: "./jsconfig.json",
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    // externals: nodeExternals({
    //   allowlist: ["react", "react-dom"],
    // }),
    /**
     * @type {import("webpack-dev-server").Configuration}
     */
    devServer: {
      port: 7370,
      static: ["public"],
    },
  };
export default config;
