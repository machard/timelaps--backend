'use strict';

var restify = require('restify');

var conf = require('../config');
var logger = require('./logger');

var server = restify.createServer({
  name : conf.get('name'),
  log : logger
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.CORS());
server.use(restify.queryParser());
server.use(restify.gzipResponse());
server.use(restify.bodyParser());
server.use(restify.requestLogger());

server.listen(conf.get('port'));

module.exports = server;
