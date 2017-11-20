const webpack = require('webpack');

const isDevelopment = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === undefined;

module.exports = {
  entry: {
    app: [
      './js/app.js',
      './css/app.css',
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
  // resolve: {
  //   root: __dirname + '/js',
  // }
  // module: {
  //   loaders: [
  //     {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
  //     {test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader']},
  //   ],
  // }
};