const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
  configureWebpack: {
    plugins: [
      new FaviconsWebpackPlugin('./public/favicon.png')
    ]
  }
}
