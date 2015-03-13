'use strict';

var convict = require('convict');

var env = process.env.NODE_ENV || 'development';

module.exports = function() {
  return convict({
    env : {
      doc : 'The applicaton environment.',
      format : ['production', 'development'],
      default : env
    },
    name : {
      doc : 'The name of the API',
      format : String,
      default : 'ShotgunDay API',
      env : 'NAME'
    },
    port : {
      doc : 'The applicaton port.',
      format : 'port',
      default : 80,
      env : 'PORT'
    },
    loggerLevel : {
      doc : 'The log level.',
      format : Number,
      default : 20,
      env : 'LOGGER_LEVEL'
    },
    mongodburi : {
      doc : ' the mongo uri',
      format : String,
      default : 'mongodb://localhost/shotgunday',
      env : 'MONGODB_URI'
    },
    rabbituri : {
      doc : ' the rabbitmq uri',
      format : String,
      default : 'amqp://localhost',
      env : 'RABBIT_URI'
    }
  });
};
