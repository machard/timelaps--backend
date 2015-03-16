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
    },
    twitter_consumer_key : {
      doc : ' twitter',
      format : Array,
      default : [
        //https://apps.twitter.com/app/8033815/show
        'AQJzdkTSAjICgC0deGfYIyUTs',
        //https://apps.twitter.com/app/8056888/show
        'AEHPjf2gLv2nUWFnR1K35hPb9'
      ],
      env : 'twitter_consumer_key'
    },
    twitter_consumer_secret : {
      doc : ' twitter',
      format : Array,
      default : [
        'LWPKKiLL3Qzehy6PCp7Rhu5ZwFetJvKD11wnyrJvU5Yb0EcOiT',
        'vaYJfJ2Qg911WWtXZ1TO1VjHClHHnVVghqu7XN8iHBomSLb4jT'
      ],
      env : 'twitter_consumer_secret'
    },
    twitter_consumer_access_token : {
      doc : ' twitter',
      format : Array,
      default : [
        '399917385-ZKN8NUSq4pCJO43SqKn60Y3BYG2myW79UgMYxtj2',
        '399917385-QadN3nau1ZxX9X8BHbPQpYWtROX4XmMLaXCdrAFj'
      ],
      env : 'twitter_consumer_access_token'
    },
    twitter_consumer_access_token_secret : {
      doc : ' twitter',
      format : Array,
      default : [
        'rQ5xDGgELBmwXXZx6BCOHMUq8SI3aHYHgEqShAvk9lSqK',
        'RQQATyPKe9v27lh7rIRmGrz0pKNFymIVnxt979m5VjBSR'
      ],
      env : 'twitter_consumer_access_token_secret'
    },
    twitter_regions : {
      doc : ' twitter',
      format : Array,
      default : [
        ['0'],
        ['1'],
        //['2'],
        //['3'],
      ],
      env : 'twitter_regions'
    },
    twitter_url_media_terms : {
      doc : ' twitter',
      format : Array,
      default : [
        'vine.co',
        'instagram.com'
      ],
      env : 'twitter_url_media_terms'
    }
  });
};
