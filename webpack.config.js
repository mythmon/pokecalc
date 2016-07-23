/* eslint-disable object-shorthand */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const production = process.env.NODE_ENV === 'production';

let plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    PRODUCTION: production,
    DEVELOPMENT: !production,
    process: {
      env: {
        NODE_ENV: production ? '"production"' : '"development"',
      },
    },
  }),
  new HtmlWebpackPlugin({
    title: 'CircleCI Graphs',
  }),
];

if (production) {
  plugins = plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      compressor: { warnings: false },
    }),
  ]);
} else {
  plugins = plugins.concat([
    new webpack.NoErrorsPlugin(),
  ]);
}

module.exports = {
  devtool: 'source-map',
  entry: {
    main: './src/index.js',
  },
  plugins: plugins,
  output: {
    path: 'build',
    filename: '[name].js',
  },
  module: {
    noParse: /node_modules\/localforage/,
    loaders: [
      {
        test: /.*\.js$/,
        loader: 'babel',
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
      },
    ],
  },
};
