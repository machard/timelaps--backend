'use strict';

module.exports = function(core) {
  var server = core.get('server');

  server.get('echo', function(req, res) {
    res.send('echo');
  });
};
