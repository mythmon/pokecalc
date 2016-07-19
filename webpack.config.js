const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: {
    main: './index.js',
  },
  output: {
    path: path.join(__dirname, 'static'),
    filename: '[name].js',
    publicPath: '/static/',
  },
  module: {
    loaders: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
      },
    ],
  },
};
