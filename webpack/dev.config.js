const webpack = require('webpack');
const path = require('path');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const dotenv = require('dotenv');

dotenv.config();

const config = require('../config');

console.log(config);

const host = process.env.HOST || config.host || 'localhost';
const port = process.env.PORT || config.port + 1;

module.exports = {
  devtool: 'source-map',

  context: path.join(__dirname, '..', 'src'),

  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr',
      './index'
    ]
  },

  output: {
    path: path.join(__dirname, '..', 'build'),
    publicPath: 'http://' + host + ':' + port + '/build/',
    filename: '[name].js?hash=[hash]',
    chunkFilename: '[name].js?hash=[chunkhash]'
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    modules: [
      'node_modules'
    ]
  },

  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /\/node_modules\//, loaders: ['babel'] },
      { test: /\.css$/, loader: 'style!css!postcss' },
      {
        test: /.(png|jpg|gif|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
        include: /\/node_modules\//,
        loader: 'file?name=[1].[ext]?hash=[hash:6]&regExp=node_modules/(.*)'
      },
      {
        test: /.(png|jpg|gif|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
        exclude: /\/node_modules\//,
        loader: 'file?name=[path][name].[ext]?hash=[hash:6]'
      }
    ]
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ContextReplacementPlugin(/node_modules\/moment\/locale/, /en-gb/), // include only en locales in moment
    new webpack.IgnorePlugin(/moment\/min\/locales/),
    new webpack.DefinePlugin({
      'process.env': {
        __CLIENT__: JSON.stringify(true),
        __DEVTOOLS__: JSON.stringify(true),
        NODE_ENV: JSON.stringify('development'),
        API_HOST: JSON.stringify(process.env.API_HOST),
        YELP_HOST: JSON.stringify(process.env.YELP_HOST),
        EVENTBRITE_API_HOST: JSON.stringify(process.env.EVENTBRITE_API_HOST),
        EVENTBRITE_TOKEN: JSON.stringify(process.env.EVENTBRITE_TOKEN),
        UPLOAD_HOST: JSON.stringify(process.env.UPLOAD_HOST),
        PARSE_APPLICATION_ID: JSON.stringify(process.env.PARSE_APPLICATION_ID),
        PARSE_MASTER_KEY: JSON.stringify(process.env.PARSE_MASTER_KEY),
        GOOGLE_MAP_API_KEY: JSON.stringify(process.env.GOOGLE_MAP_API_KEY),
        FACEBOOK_APP_ID: JSON.stringify(process.env.FACEBOOK_APP_ID)
      }
    }),
    new webpack.optimize.DedupePlugin()
  ],

  postcss: function () {
    return [precss, autoprefixer];
  }
};
