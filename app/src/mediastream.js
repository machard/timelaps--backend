'use strict';

var __ = require('highland');

module.exports = function(twitter, core) {
  var streams = {};
  var rabbit = core.get('rabbit');
  var mediapub = rabbit.socket('PUB', 'media', {routing : 'topic'});

  // twitter stream
  var transducers = twitter.get('transducers');

  streams.twitter = twitter.get('geostream')
    .fork()
    .transduce(transducers.extractmedias);

  //

  var mediastream = __.values(streams).merge();

  mediastream
    .fork()
    .map(function(media) {
      return rabbit.event(media, media.zone.split('').join('.'));
    })
    .pipe(mediapub);

  return mediastream;
};
