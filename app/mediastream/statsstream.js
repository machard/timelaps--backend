'use strict';

var _ = require('lodash');
var __ = require('highland');

var mediastream = require('./mediastream');

function Stats() {
  this.init();
}

Stats.prototype.init = function() {
  this.nb = 0;
};

var statsstream = __().throttle(1000);
var stats =  new Stats();

mediastream
  .fork()
  .each(function() {
    stats.nb++;

    statsstream.write(_.clone(stats));
  });

statsstream
  .fork()
  .each(function() {
    stats.init();
  });

module.exports = statsstream;
