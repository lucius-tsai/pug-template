const merge = require('webpack-merge');
const common = require('./webpack.common.js');

console.log(process.env.NODE_ENV)

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  // devServer: {
  //   contentBase: './build',
  //   open: true,
  //   port: 9999
  // }
});