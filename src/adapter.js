var youbora = require('youboralib')
var manifest = require('../manifest.json')

youbora.adapters.Html5 = youbora.StandardAdapter.extend({
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

  getIsLive: function () {
    return false
  },

  getPlayerName: function () {
    return 'html5'
  },

  getPlayerVersion: function () {
    return this.getPlayerName()
  },

  initializeAdapter: function () {
    this.monitorPlayhead(true, false)
  },

  getListenersList: function () {
    return [{
      //object: this.player,
      //suscriber: 'addEventListener',
      //unsuscriber: 'removeEventListener',
      events: {
        'play': this.playListener,
        'timeupdate': this.timeupdateListener,
        'pause': this.pauseListener,
        'playing': this.playingListener,
        'error': this.errorListener,
        'seeking': this.seekingListener,
        'seeked': this.seekedListener,
        'ended': this.endedListener,
        'canplay': null,
        'buffering': null,
        'waiting': null,
        'abort': null,
        'seek': null,
        'stalled': null,
        'dispose': null,
        'loadeddata': null,
        'loadstart': null
      }
    }]
  },

  playListener: function (e) {
    this.fireStart()
  },

  timeupdateListener: function (e) {
    if (this.getPlayhead() > 0.1) {
      this.fireStart()
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
  }
})

module.exports = youbora.adapters.Html5
