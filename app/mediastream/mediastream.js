'use strict';

var __ = require('highland');

var rabbit = require('../core/rabbit');

var mediapub = rabbit.socket('PUB', 'media', {routing : 'topic'});

var mediastream = __([
  // twitter stream
  require('../twitter/mediastream')
]).merge();

// on balance à rabbit
mediastream
  .fork()
  .map(function(media) {
    return rabbit.event(media, media.zone.split('').join('.'));
  })
  .pipe(mediapub);

module.exports = mediastream;
