const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      ENV_MODE: JSON.stringify('uat'),
      API_HOST: JSON.stringify('https://testapi2.kvbgc.com/api/'),
      WEB_HOST: JSON.stringify('https://testgcfx.kvbgc.com/'),
    }),
  ],
});