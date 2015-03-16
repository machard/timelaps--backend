'use strict';

var __ = require('highland');

module.exports = function(twitter) {
  var streams = {};

  // twitter stream
  var transducers = twitter.get('transducers');

  streams.twitter = twitter.get('geostream')
    .fork()
    .transduce(transducers.extractmedias);

  //

  return __.values(streams).merge();
};
