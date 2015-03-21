'use strict';

var bunyan = require('bunyan');

var conf = require('../config');

var logger = bunyan.createLogger({name : conf.get('name')});
logger.level(conf.get('loggerLevel'));

module.exports = logger;
