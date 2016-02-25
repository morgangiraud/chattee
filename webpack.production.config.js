var path = require('path');
var webpack = require('webpack');

var config = {
  entry: {
    main: [
      path.resolve(__dirname, 'src/main.js')
    ]
  },
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: 'public',
    filename: '[name].js'
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel'
      },
      {
        test: /\.scss$/,
        include: path.join(__dirname, 'src'),
        loader: 'style!css!sass'
      }
    ]
  }
};

module.exports = config;