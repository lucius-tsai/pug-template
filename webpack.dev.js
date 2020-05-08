const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

console.log(process.env.NODE_ENV)

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      ENV_MODE: JSON.stringify('dev'),
      API_HOST: JSON.stringify('https://testapi2.kvbgc.com/api/'),
      WEB_HOST: JSON.stringify('http://localhost:3000/'),
    }),
  ],
});