const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      ENV_MODE: JSON.stringify('prod'),
      API_HOST: JSON.stringify('https://api2.kvbgc.com/api/'),
      WEB_HOST: JSON.stringify('https://gcfx.kvbgc.com/'),
    }),
  ],
});