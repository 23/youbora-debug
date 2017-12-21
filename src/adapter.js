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

    // Store references
    this.references = []
    this.references['play'] = this.playListener.bind(this)
    this.references['timeupdate'] = this.timeupdateListener.bind(this)
    this.references['pause'] = this.pauseListener.bind(this)
    this.references['playing'] = this.playingListener.bind(this)
    this.references['error'] = this.errorListener.bind(this)
    this.references['seeking'] = this.seekingListener.bind(this)
    this.references['seeked'] = this.seekedListener.bind(this)
    this.references['ended'] = this.endedListener.bind(this)

    // Register listeners
    for (var key in this.references) {
      this.player.addEventListener(key, this.references[key])
    }
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
    if (this.player && this.references) {
      for (var key in this.references) {
        this.player.removeEventListener(key, this.references[key])
      }
      this.references = []
    }
  }

})

module.exports = youbora.adapters.Html5
