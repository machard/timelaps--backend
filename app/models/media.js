'use strict';

var util = require('util');

var Geo = require('./geo');

function Media(type, data, position) {
  Geo.call(this, position);

  this.type = type;
  this.data = data;
}

util.inherits(Media, Geo);

module.exports = Media;
