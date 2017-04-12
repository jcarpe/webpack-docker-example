const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = [
  new HtmlWebpackPlugin({
    alwaysWriteToDisk: true,
    inject: 'body'
  }),
  new HtmlWebpackHarddiskPlugin(),
  new CleanWebpackPlugin([path.resolve(global.srcRoot, 'server/dist')], {
    root: global.srcRoot
  })
];
