'use strict';

var Twit = require('twit');
var quadtree = require('quadtree');
var __ = require('highland');
var _ = require('lodash');

var conf = require('../config');
var appswitch = require('../core/appswitch');
var logger = require('../core/logger');

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

appswitch.onStart(function(callback) {
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

  callback();
});

appswitch.onStop(function(callback) {
  _.each(_s, function(s) {
    s.removeAllListeners();
    s.stop();
  });

  callback();
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
  if (tweet.coordinates) {
    tweet.coordinates = tweet.coordinates.coordinates;
  }

  if (!tweet.coordinates) {
    var c = tweet.place.bounding_box.coordinates[0];
    var x = (c[0][0] + c[1][0] + c[2][0] + c[3][0]) / 4;
    var y = (c[0][1] + c[1][1] + c[2][1] + c[3][1]) / 4;

    tweet.coordinates = [x, y];
  }

  tweet.zone = quadtree.encode({
    lat : tweet.coordinates[1],
    lng : tweet.coordinates[0]
  }, conf.get('quadtree_precision'));

  tweet.eentities = tweet.extended_entities || {};
  tweet.urls = tweet.entities.urls;

  return tweet;
});

module.exports = stream;
