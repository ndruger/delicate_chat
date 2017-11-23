const webpack = require('webpack');

const isDevelopment = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === undefined;

module.exports = {
  entry: {
    app: [
      './js/app.js',
      './css/app.scss',
    ],
  },
  output: {
    path: __dirname + '/../priv/static/js',
    filename: 'app.js',
    publicPath: '/js/',
  },
  externals: {
    jquery: 'jQuery',
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        {
          loader: "style-loader"
        },
        {
          loader: "css-loader"
        },
        {
          loader: "sass-loader"
        }
      ]
    }]
  }
};