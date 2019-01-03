const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  app: path.join(__dirname, 'client/'),
}

module.exports = {
  entry: PATHS.app,
  output: {
    path: path.resolve(__dirname, './build/public/'),
    filename: 'index_bundle.js'
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'index.template.ejs',

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
