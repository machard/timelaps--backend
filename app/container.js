'use strict';

var appjector = require('restifoosemq/node_modules/appjector');
var conf = require('../config/conf');
var restifooseMQ = require('restifoosemq');

module.exports = appjector
  .container(
    {
      conf : conf,
      core : restifooseMQ,
      appswitch : appjector.AppSwitch
    },
    './app/src'
  );
