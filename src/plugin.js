var youbora = require('youboralib')
var pkg = require('../package.json')

youbora.plugins.Html5 = youbora.plugins.Generic.extend({
  getVersion: function () {
    return pkg.version + '-html5'
  },

  getPlayhead: function () {
    return this.player ? this.player.currentTime : 0
  },

  getDuration: function () {
    return this.player ? this.player.duration : 0
  },

  getResource: function () {
    return this.player ? this.player.currentSrc : 'unknown'
  },

  getPlayerName: function () {
    return 'html5'
  },

  getPlayerVersion: function () {
    return this.getPlayerName()
  },

  registerListeners: function () {
    youbora.Util.listenAllEvents(this.player)

    // Enable playhead monitor
    this.createBufferMonitor()

    // Register listeners
    this.player.addEventListener('play', this.playListener.bind(this))
    this.player.addEventListener('timeupdate', this.timeupdateListener.bind(this))
    this.player.addEventListener('pause', this.pauseListener.bind(this))
    this.player.addEventListener('playing', this.playingListener.bind(this))
    this.player.addEventListener('error', this.errorListener.bind(this))
    this.player.addEventListener('seeking', this.seekingListener.bind(this))
    this.player.addEventListener('ended', this.endedListener.bind(this))
  },

  unregisterListeners: function () {
    // Disable playhead monitoring
    this.monitor.stop()

    // unregister listeners
    this.player.removeEventListener('play', this.onPlay)
    this.player.removeEventListener('timeupdate', this.onTimeupdate)
    this.player.removeEventListener('pause', this.onPause)
    this.player.removeEventListener('playing', this.onPlaying)
    this.player.removeEventListener('error', this.onError)
    this.player.removeEventListener('seeking', this.onSeeking)
    this.player.removeEventListener('ended', this.onEnded)
  },

  playListener: function (e) {
    this.emit('start')
  },

  timeupdateListener: function (e) {
    if (this.getPlayhead() > 0.1) {
      this.emit('join')
    }
  },

  pauseListener: function (e) {
    this.emit('pause')
  },

  playingListener: function (e) {
    this.emit('resume')
    this.emit('seek-end')
  },

  errorListener: function (e) {
    this.emit('error', {
      msg: 'PLAY_FAILURE'
    })
  },

  seekingListener: function (e) {
    this.emit('seek-begin')
  },

  endedListener: function (e) {
    this.emit('stop')
  }

})

module.exports = youbora
