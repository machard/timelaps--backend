'use strict';

var quadtree = require('quadtree');

var conf = require('../config');

function Geo(position) {
  this.position = position;
  this.zone = quadtree.encode({
    lat : position.lat,
    lng : position.lng
  }, conf.get('quadtree_precision'));
}

module.exports = Geo;
