'use strict';

var util = require('util');

var Geo = require('../models/geo');

function Geotweet(raw_tweet) {
  var position;

  if (raw_tweet.coordinates) {
    position = raw_tweet.coordinates.coordinates;
  }

  if (!raw_tweet.coordinates) {
    var c = raw_tweet.place.bounding_box.coordinates[0];
    var x = (c[0][0] + c[1][0] + c[2][0] + c[3][0]) / 4;
    var y = (c[0][1] + c[1][1] + c[2][1] + c[3][1]) / 4;

    position = [x, y];
  }

  Geo.call(this, {
    lat : position[1],
    lng : position[0]
  });

  this.eentities = raw_tweet.extended_entities || {};
  this.urls = raw_tweet.entities.urls;
  this.id = raw_tweet.id_str;
}

util.inherits(Geotweet, Geo);

module.exports = Geotweet;
