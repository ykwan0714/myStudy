const glob = require('glob')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const myConfig = async () => {
  const plugins = []
  const folders = glob.sync('./src/**/*.js')
  const entry = folders.reduce((acc, item, idx) => {
    const path = item.replace('./src/', '').split('/')
    path.pop()
    const name = path.join('/')
    acc[name === '' ? '.' : name] = item
    return acc
  }, {})
  Object.keys(entry).forEach((ent) => {
    const htmlPlugin = new HtmlWebpackPlugin({
      inject: true,
      title: `${ent.replace('.', '')}`,
      template: '/index.html',
      filename: `${ent}/index.html`,
      chunks: [ent]
    })
    plugins.push(htmlPlugin)
  })
  return {
    entry,
    output: {
      filename: '[name]/index.js',
      path: path.resolve(__dirname, 'dist')
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif)$/i,
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader']
        }
      ]
    },
    plugins
  }
}

module.exports = myConfig()
