var gulp = require('gulp')
var plugins = require('gulp-load-plugins')()
var browserify = require('browserify')
var watchify = require('watchify')
var buffer = require('vinyl-buffer')
var source = require('vinyl-source-stream')
var del = require('del')

var license = require('./gulp/license')
var Logger = require('./gulp/logger')

var config = {
  file: 'plugin.js',
  minified: 'sp.min.js',
  src: './src/',
  dest: './dist/'
}

var bundler = browserify({
  entries: [config.src + config.file],
  standalone: 'youbora',
  debug: true
})

bundler.pipeline.get('wrap').push(license())

var rebundle = function () {
  Logger.start(config.file)
  const stream = bundler.bundle()

  return stream
    .on('error', Logger.error)
    .on('end', Logger.end.bind(this, config.file))
    .pipe(source(config.file))
    .pipe(buffer())
    .pipe(plugins.rename(config.minified))
    .pipe(plugins.sourcemaps.init({ loadMaps: true }))
    .pipe(plugins.streamify(plugins.uglify({
      preserveComments: 'license'
    })))
    .pipe(plugins.sourcemaps.write('.'))
    .pipe(gulp.dest(config.dest))
}

gulp.task('clean', function () {
  del([
    config.dest + config.output,
    config.dest + config.minified,
    config.dest + config.minified + '.map'
  ])
})

gulp.task('watch', ['clean'], function () {
  bundler = watchify(bundler)
  bundler.on('update', rebundle)

  return rebundle()
})

gulp.task('build', ['clean'], function () {
  return rebundle()
})

gulp.task('default', ['watch'])
