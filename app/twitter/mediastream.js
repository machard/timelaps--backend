'use strict';

var __ = require('highland');
var _ = require('lodash');

var conf = require('../config');
var geostream = require('./geostream');

var mediastream = __();

geostream
  .fork()
  .each(function(tweet) {

    _.each(tweet.urls, function(url) {

      var terms = conf.get('twitter_url_media_terms');

      var type = _.find(terms, function(term) {
        return url.expanded_url.indexOf(term) > -1;
      });

      if (type) {
        mediastream.write({
          type : type,
          data : url.expanded_url,
          position : tweet.coordinates,
          zone : tweet.zone,
          id : tweet.id_str
        });
      }
    });

    _.each(tweet.eentities.media, function(media) {
      mediastream.write({
        type : media.type,
        data : media,
        position : tweet.coordinates,
        zone : tweet.zone,
        id : tweet.id_str
      });
    });

  });

module.exports = mediastream;
