var path = require('path');
var webpack = require('webpack');

var config = {
  devtool: 'eval-source-map',
  entry: {
    main: [
     'webpack-dev-server/client?http://localhost:8080',
     'webpack/hot/only-dev-server',
      path.resolve(__dirname, 'src/main.js')
    ]
  },
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: 'public',
    filename: '[name].dev.js'
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'src'),
        loader: 'react-hot!babel'
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