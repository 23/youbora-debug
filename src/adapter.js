var youbora = require('youboralib')
var manifest = require('../manifest.json')

youbora.adapters.Html5 = youbora.Adapter.extend({
  getVersion: function () {
    return manifest.version + '-' + manifest.name + '-' + manifest.tech
  },

  getPlayhead: function () {
    return this.player.currentTime
  },

  getDuration: function () {
    return this.player.duration
  },

  getResource: function () {
    return this.player.currentSrc
  },

  getPlayerName: function () {
    return 'html5'
  },

  getPlayerVersion: function () {
    return this.getPlayerName()
  },

  registerListeners: function () {
    // Console all events if logLevel=DEBUG
    youbora.Util.logAllEvents(this.player)

    // Enable playhead monitor
    this.monitorPlayhead(true, false)

    // Register listeners
    this.player.addEventListener('play', this.playListener.bind(this))
    this.player.addEventListener('timeupdate', this.timeupdateListener.bind(this))
    this.player.addEventListener('pause', this.pauseListener.bind(this))
    this.player.addEventListener('playing', this.playingListener.bind(this))
    this.player.addEventListener('error', this.errorListener.bind(this))
    this.player.addEventListener('seeking', this.seekingListener.bind(this))
    this.player.addEventListener('seeked', this.seekedListener.bind(this))
    this.player.addEventListener('ended', this.endedListener.bind(this))
  },

  playListener: function (e) {
    this.fireStart()
  },

  timeupdateListener: function (e) {
    if (this.getPlayhead() > 0.1) {
      this.fireJoin()
    }
  },

  pauseListener: function (e) {
    this.firePause()
  },

  playingListener: function (e) {
    this.fireResume()
  },

  errorListener: function (e) {
    this.fireError()
  },

  seekingListener: function (e) {
    this.fireSeekBegin()
  },

  seekedListener: function (e) {
    this.fireSeekEnd()
  },

  endedListener: function (e) {
    this.fireStop()
  },

  unregisterListeners: function () {
    // Disable playhead monitoring
    this.monitor.stop()

    // unregister listeners
    this.player.removeEventListener('play', this.playListener)
    this.player.removeEventListener('timeupdate', this.timeupdateListener)
    this.player.removeEventListener('pause', this.pauseListener)
    this.player.removeEventListener('playing', this.playingListener)
    this.player.removeEventListener('error', this.errorListener)
    this.player.removeEventListener('seeking', this.seekingListener)
    this.player.removeEventListener('seeked', this.seekedListener)
    this.player.removeEventListener('ended', this.endedListener)
  }

})

module.exports = youbora.adapters.Html5
