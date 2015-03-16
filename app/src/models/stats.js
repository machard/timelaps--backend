'use strict';

module.exports = function() {
  function Stats() {
    this.init();
  }

  Stats.prototype.init = function() {
    this.nb = 0;
  };

  return Stats;
};
