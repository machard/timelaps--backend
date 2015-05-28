'use strict';

var Twit = require('twit');
var quadtree = require('quadtree');
var __ = require('highland');
var _ = require('lodash');

var conf = require('../config');
var logger = require('../core/logger');
var Geotweet = require('./geotweet');

var nb = conf.get('twitter_regions').length;
var stream = __();
var _s;

var T = _.map(_.range(0, nb), function(i) {
  var t = new Twit({
    consumer_key : conf.get('twitter_consumer_key')[i],
    consumer_secret : conf.get('twitter_consumer_secret')[i],
    access_token : conf.get('twitter_consumer_access_token')[i],
    access_token_secret : conf.get('twitter_consumer_access_token_secret')[i]
  });

  t.regions = conf.get('twitter_regions')[i];

  return t;
});

_s = _.map(T, function(t) {
  return t.stream('statuses/filter', {
    locations : _.map(t.regions, function(region) {
      var bb = quadtree.bbox(region);

      return [bb.minlng, bb.minlat, bb.maxlng, bb.maxlat].join(',');
    })
  });
});

_.each(_s, function(s) {
  s.on('tweet', _.bind(stream.write, stream));

  s.on('limit', _.bind(stream.emit, stream, 'limit'));
  s.on('error', _.bind(stream.emit, stream, 'error'));
  s.on('connect', _.bind(stream.emit, stream, 'connect'));
  s.on('reconnect', _.bind(stream.emit, stream, 'reconnect'));
});

stream.on('limit', function(t) {
  logger.warn('twitter limit', t);
});

stream.on('error', function(e) {
  logger.error('twitter error', e);
});

stream.on('connect', function() {
  logger.info('connected twitter');
});

stream.on('reconnect', function() {
  logger.info('reconnected twitter');
});

stream = stream.map(function(tweet) {
  return new Geotweet(tweet);
});

module.exports = stream;
