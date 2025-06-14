const path = require("path");
const webpack = require("webpack");

const mode = process.env.NODE_ENV || 'development';

module.exports = {
  entry: "./src/index.js",
  mode: mode,
  output: {
    path: path.resolve(__dirname, "./static/frontend"),
    filename: "[name].js",
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "./static/frontend"),
    },
    hot: true,
    liveReload: true,
    watchFiles: ['src/**/*'],
  },
  watchOptions: {
    poll: 1000,
    ignored: /node_modules/,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.module\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: "[name]__[local]___[hash:base64:5]",
              },
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        NODE_ENV: JSON.stringify(mode),
      },
    }),
  ],
};