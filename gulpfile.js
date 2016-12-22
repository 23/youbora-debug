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
  file: 'adapter.js',
  minified: 'sp.min.js',
  src: './src/',
  dest: './dist/'
}

var bundler = browserify({
  entries: [config.src + config.file],
  standalone: 'youbora',
  debug: true
})

var rebundle = function () {
  Logger.start(config.file)
  bundler.on('bundle', function () {
    bundler.pipeline.get('wrap').push(license())
  })
  const stream = bundler.bundle()

  return stream
    .on('error', Logger.error)
    .on('end', Logger.end.bind(this, config.file))
    .pipe(source(config.file))
    .pipe(buffer())
    .pipe(plugins.rename(config.minified))
    .pipe(plugins.sourcemaps.init({ loadMaps: true }))
    .pipe(plugins.uglify({ compress: false, preserveComments: 'license' }))
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest(config.dest))
}

gulp.task('clean', function () {
  del([
    config.dest + config.file,
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
