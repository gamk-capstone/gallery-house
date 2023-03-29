const webpack = require("webpack");
const dotenv = require("dotenv");

// call dotenv and it will return an Object with a parsed key
  // const env = dotenv.config().parsed; // reduce it to a nice object, the same as before
  // const envKeys = Object.keys(env || {}).reduce((prev, next) => {
  //   prev[`process.env.${next}`] = JSON.stringify(env[next]);
  //   return prev;
  // }, {});

module.exports = {
    entry: ["./client/index.js"],
    output: {
      path: __dirname + "/public",
      filename: "bundle.js",
    },
    resolve: {
      fallback: {
        fs: false,
        stream: require.resolve("stream-browserify"),
        path: require.resolve("path-browserify"),
        buffer: require.resolve("buffer/"),
        os: require.resolve("os-browserify/browser"),
      },
    },
    // plugins: [new webpack.DefinePlugin(envKeys)],
    context: __dirname,
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      ],
    },
  };

