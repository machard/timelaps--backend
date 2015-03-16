'use strict';

var _ = require('lodash');
var __ = require('highland');

module.exports = function(twitter, core) {
  var streams = {};
  var logger = core.get('logger');

  // twitter stream
  var transducers = twitter.get('transducers');

  streams.twitter = twitter.get('geostream')
    .transduce(transducers.extractmedias);

  //

  var stream = __(_.values(streams)).merge();

  stream.on('error', function(e) {
    logger.error('media stream error', e);
  });

  stream.on('data', function(media) {
    logger.info('media', media.type);
  });

  return stream;
};
