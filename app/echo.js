'use strict';

var server = require('./core/server');

server.get('/_ah/health', function(req, res) {
  res.set('Content-Type', 'text/plain');
  res.send(200, 'ok');
});

server.get('/_ah/start', function(req, res) {
  res.set('Content-Type', 'text/plain');
  res.send(200, 'ok');
});

server.get('/_ah/stop', function(req, res) {
  res.set('Content-Type', 'text/plain');
  res.send(200, 'ok');
  process.exit();
});

server.get('/echo', function(req, res) {
  res.set('Content-Type', 'text/plain');
  res.send(200, 'ok');
});
