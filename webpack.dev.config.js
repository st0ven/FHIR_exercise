const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.config.js');
const portNumber = 4000;

module.exports = merge( commonConfig, {
  devServer: {
    publicPath: '/',
    port: portNumber,
    hot: true
  },
  mode: 'development'
});