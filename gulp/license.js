var pkg = require('../package.json')
var lib = require('youboralib')
var through = require('through2')

var license = '/**' +
  '\n * @license ' + pkg.license +
  '\n * ' + pkg.name + ' ' + pkg.version +
  '\n * Packed with youboralib v' + lib.VERSION +
  '\n * Copyright NicePopleAtWork <http://nicepeopleatwork.com/>' +
  '\n * @author ' + pkg.author +
  '\n */' +
  '\n'

var createStream = function () {
  var firstChunk = true
  var stream = through.obj(function (buf, enc, next) {
    if (firstChunk) {
      /*  insert the header comment as the first chunk  */
      this.push(new Buffer(license))
      firstChunk = false
    }
    this.push(buf)
    next()
  })
  stream.label = 'header'
  return stream
}

module.exports = createStream
