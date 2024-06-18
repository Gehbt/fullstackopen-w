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

const PublicDir = resolve(process.cwd(), "public");
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
        template: "./public/index-new-build.html",
        favicon: "./public/favicon.ico",
        filename: "index.html",
        publicPath: "",
        templateParameters: {
          PUBLIC_URL: PublicDir,
        },
      }),
      // new InterpolateHtmlPlugin({PUBLIC_URL: 'public' })
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
      new EsbuildPlugin({}),
      // new WebpackManifestPlugin({}),
      // @ts-expect-error plugin-error
      new TsconfigPathsPlugin({
        baseUrl: ".",
        configFile: "./jsconfig.json",
        extensions: [".js", ".jsx", ".mjs"],
      }),
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
      extensions: [".js", ".css", ".jsx", ".mjs"],
    },
    module: {
      rules: [
        {
          test: /\.html$/i,
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
          test: /\.m?js$/,
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
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        // other rules
      ],
    },
    // externals: nodeExternals({
    //   allowlist: ["react", "react-dom"],
    // }),
    /**
     * @type {import("webpack-dev-server").Configuration}
     * */
    devServer: {
      port: 7370,
      static: ["public"],
    },
  };
export default config;
