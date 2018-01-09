const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    home: "./src/home.js"
  },
  output: {
    filename: "[name].js",
    path: __dirname + '/dist'
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
            presets: ['es2016']
          }
        },
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  watch: true,
  plugins: [
    new ExtractTextPlugin("styles.css"),
    new webpack.optimize.CommonsChunkPlugin("vendors"),
    new webpack.WatchIgnorePlugin([
      path.join(__dirname, "node_modules")
    ]),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
    //  server: { baseDir: ['./dist/*.html'] } // for frontend
      proxy: 'http://localhost/webpack',
      files: [
        {
          match: [
            './*.php'
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
  devtool:'source-map'
}