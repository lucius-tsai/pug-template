
var path = require('path');

const imgs = {
  test: /\.(png|svg|jpg|gif)$/,
  use: [
    'file-loader'
  ]
}

const fonts = {
  test: /\.(woff|woff2|eot|ttf|otf)$/,
  use: [
    'file-loader'
  ]
}

const pug = {
  test: /\.pug$/,
  // use: ['html-loader?attrs=false', 'pug-html-loader']
  use: ['pug-loader']
};

const scss = {
  test: /\.(css|scss)$/,
  use: [
    "style-loader", // creates style nodes from JS strings
    "css-loader", // translates CSS into CommonJS
    "sass-loader" // compiles Sass to CSS, using Node Sass by default
  ]
}

const files = {
  test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
  loaders: ['file-loader']
}

const jsx = {
  // this is so that we can compile any React,
  // ES6 and above into normal ES5 syntax
  test: /\.(js|jsx)$/,
  // we do not want anything from node_modules to be compiled
  exclude: /node_modules/,
  use: ['babel-loader']
}

const config = {
  entry: {
    app: path.resolve(__dirname, 'src/assets/js/app.js')
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  // plugins: [
  //   env.analyse ? new BundleAnalyzerPlugin() : null,
  // ],
  output: {
    filename: '[name].js',
    // chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build/assets/js/'),
    publicPath: '/assets/js/',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
    // splitChunks: {
    //   chunks: 'all'
    // }
    // usedExports: true,
    // moduleIds: 'hashed',
    // runtimeChunk: {
    //   name: entrypoint => `runtime~${entrypoint.name}`
    // },
    // splitChunks: {
    //   cacheGroups: {
    //     vendor: {
    //       test: /[\\/]node_modules[\\/]/,
    //       name: 'vendors',
    //       chunks: 'all'
    //     }
    //   }
    // }
  },
  module: {
    rules: [ imgs, fonts, pug, scss, jsx, files ]
  },
  plugins: []
};

module.exports = config;