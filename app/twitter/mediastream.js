'use strict';

var __ = require('highland');
var _ = require('lodash');

var conf = require('../config');
var geostream = require('./geostream');
var Media = require('../models/media');

var mediastream = __();

geostream
  .fork()
  .each(function(geotweet) {

    _.each(geotweet.urls, function(url) {

      var terms = conf.get('twitter_url_media_terms');

      var type = _.find(terms, function(term) {
        return url.expanded_url.indexOf(term) > -1;
      });

      if (type) {
        var media = {
          id : geotweet.id,
          url : url.expanded_url
        };
        mediastream.write(new Media(type, media, geotweet.position));
      }
    });

    _.each(geotweet.eentities.media, function(media) {
      media.id = geotweet.id;
      mediastream.write(new Media(media.type, media, geotweet.position));
    });

  });

module.exports = mediastream;
