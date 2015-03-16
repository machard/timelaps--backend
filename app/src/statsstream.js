'use strict';

var _ = require('lodash');
var __ = require('highland');

module.exports = function(mediastream, models) {
  var statsstream = __().throttle(1000);
  var stats =  new (models.get('stats'))();

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

  return statsstream;
};
