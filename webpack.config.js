const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

global.srcRoot = path.resolve(__dirname);

const plugins = require('./build_config/webpack_plugins');

const commonConfig = {
  output: {
    path: path.resolve(__dirname, 'server/dist'),
    filename: 'main.[hash].js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: plugins
};

const prodConfig = () => {
  return {
    entry: {
      main: './src/main.js'
    }
  }
};

const devConfig = () => {
  return {
    entry: [
      'webpack-hot-middleware/client?path=/__webpack_hmr',
      'webpack/hot/dev-server',
      './src/main.js'
    ],
    devServer: {
      hot: true,
      inline: true
    },
    devtool: 'source-map',
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  }
};

const genConfig = (env) => {
  if(env === 'development') {
    return merge([
      commonConfig,
      devConfig()
    ]);
  } else {
    return merge([
      commonConfig,
      prodConfig()
    ]);
  }
}

let config = genConfig(process.env.NODE_ENV);

module.exports = config;
