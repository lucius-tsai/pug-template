const path = require('path');


console.log(path.resolve(__dirname, 'build/assets/js'))
console.log(__dirname + '/dist')

module.exports = {
  mode: 'development',
  // mode: 'production',
  entry: {
    app: path.resolve(__dirname, 'src/assets/js/app.js')
  },
  devtool: 'inline-source-map',
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
    usedExports: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(csv|tsv)$/,
        use: [
          'csv-loader'
        ]
      },
      {
        test: /\.xml$/,
        use: [
          'xml-loader'
        ]
      }
    ]
  }
}