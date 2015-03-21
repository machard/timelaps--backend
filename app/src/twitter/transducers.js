'use strict';

var _ = require('lodash');
var t = require('transducers-js');
var quadtree = require('quadtree');

module.exports = function(conf) {

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

      tweet.zone = quadtree.encode({
        lat : tweet.coordinates[1],
        lng : tweet.coordinates[0]
      }, conf.get('quadtree_precision'));

      tweet.eentities = tweet.extended_entities || {};
      tweet.urls = tweet.entities.urls;

      return tweet;
    }),

    'extractmedias' : t.mapcat(function(tweet) {
      function urlmediatype(url) {
        var terms = conf.get('twitter_url_media_terms');

        return _.find(terms, function(term) {
          return url.indexOf(term) > -1;
        });
      }
      return Array.prototype.concat.call(
        _.chain(tweet.urls)
          .filter(function(url) {
            return !!urlmediatype(url.expanded_url);
          })
          .map(function(url) {
            return {
              type : urlmediatype(url.expanded_url),
              data : url.expanded_url,
              position : tweet.coordinates,
              zone : tweet.zone,
              id : tweet.id_str
            };
          })
          .value(),

        _.map(tweet.eentities.media, function(media) {
          return {
            type : media.type,
            data : media,
            position : tweet.coordinates,
            zone : tweet.zone,
            id : tweet.id_str
          };
        })
      );
    })
  };
};
