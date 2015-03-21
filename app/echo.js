'use strict';

var server = require('./core/server');

server.get('echo', function(req, res) {
  res.send('echo');
});
