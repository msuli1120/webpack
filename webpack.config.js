const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    home: "./src/home.js",
    about: "./src/about.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader?sourceMap"
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader?sourceMap!sass-loader?sourceMap"
        }),
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["es2016", "react"]
          }
        },
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  watch: true,
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin({
      filename: '[name].style.css',
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin("vendors"),
    new webpack.WatchIgnorePlugin([
      path.join(__dirname, "node_modules")
    ]),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      proxy: {
        target: 'http://localhost/webpack'
      },
      files: [
        {
          match: [
            '*.php',
            './src/*.js',
            './assets/css/*.css',
            './assets/js/*.js',
            './assets/scss/*.scss'
          ],
          fn: function (event, file) {
            if (event === "change") {
              const bs = require("browser-sync").get(
                "bs-webpack-plugin"
              );
              bs.reload();
            }
          }
        }
      ]
    }, { reload: false })
  ],
  devtool:'source-map',
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, 'dist')
  },
}