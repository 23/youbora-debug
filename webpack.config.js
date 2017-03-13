var path = require('path')
var webpack = require('webpack')
var pkg = require('./package.json')

var license = '@license ' + pkg.license +
  '\n' + pkg.name + ' ' + pkg.version +
  '\nCopyright NicePopleAtWork <http://nicepeopleatwork.com/>' +
  '\n@author ' + pkg.author

module.exports = {
  entry: './src/sp.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'sp.min.js',
    library: 'youbora',
    libraryTarget: 'umd'
  },
  devtool: 'source-map',
  plugins: [
    new webpack.BannerPlugin({
      banner: license,
      entryOnly: true
    })
  ]
}
