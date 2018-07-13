const path = require('path')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: ['./src/js/app.js'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: './js/[name].js'
  },
  devServer: {
    contentBase: "./build"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: './src/json',
        to: './json',
        toType: 'dir'
      }
    ]),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
}