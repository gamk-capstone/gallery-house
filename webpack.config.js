module.exports = {
  entry: ['./client/index.js'],
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js',
  },
  resolve: { 
    fallback: { 
      fs: false, 
      stream: require.resolve("stream-browserify"),
      path: require.resolve("path-browserify"), 
      buffer: require.resolve("buffer/") 
    }
   },
  context: __dirname,
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
    ],
  },
};
