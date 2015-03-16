'use strict';

var _ = require('lodash');
var t = require('transducers-js');

module.exports = function(utils) {
  return {
    'clean' : t.map(function(tweet) {
      if (tweet.coordinates) {
        tweet.coordinates = tweet.coordinates.coordinates;
      }

      if (!tweet.coordinates) {
        var c = tweet.place.bounding_box.coordinates[0];
        var x = (c[0][0] + c[1][0] + c[2][0] + c[3][0]) / 4;
        var y = (c[0][1] + c[1][1] + c[2][1] + c[3][1]) / 4;

        tweet.coordinates = [x, y];
      }

      tweet.eentities = tweet.extended_entities || {};
      tweet.urls = tweet.entities.urls;

      return tweet;
    }),

    'extractmedias' : t.mapcat(function(tweet) {
      return Array.prototype.concat.call(
        _.chain(tweet.urls)
          .filter(function(url) {
            return !!utils.urlmediatype(url.expanded_url);
          })
          .map(function(url) {
            return {
              type : utils.urlmediatype(url.expanded_url),
              data : url.expanded_url,
              position : tweet.coordinates
            };
          })
          .value(),

        _.map(tweet.eentities.media, function(media) {
          return {
            type : media.type,
            data : media,
            position : tweet.coordinates
          };
        })
      );
    })
  };
};
