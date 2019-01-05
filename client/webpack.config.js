const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// const PATHS = {
//   app: path.join(__dirname, 'index.js'),
// }

module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, './build/public/'),
    filename: 'index_bundle.js'
  },
  plugins: [new HtmlWebpackPlugin({
    template: path.resolve(__dirname, './index.template.ejs'),
    filename: './index.html',

  })],
  module:{
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', ]
          }
        }
      }
    ]
  }
}
