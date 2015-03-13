'use strict';

var app = require('./container');
var utils = require('./utils');

// to do : deal with clustering here

utils.start(app, function(err) {
  console.log('app', err ? 'had an error' : 'started', err || '');
});
