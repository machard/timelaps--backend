'use strict';

var convict = require('convict');

var env = process.env.NODE_ENV || 'development';

var conf = convict({
  env : {
    doc : 'The applicaton environment.',
    format : ['production', 'development'],
    default : env
  },
  name : {
    doc : 'The name of the API',
    format : String,
    default : 'Timelaps twitter daemon',
    env : 'NAME'
  },
  port : {
    doc : 'The applicaton port.',
    format : 'port',
    default : 8080,
    env : 'PORT'
  },
  loggerLevel : {
    doc : 'The log level.',
    format : Number,
    default : 20,
    env : 'LOGGER_LEVEL'
  },
  rabbituri : {
    doc : ' the rabbitmq uri',
    format : String,
    default : 'amqp://tweetcam:78Ey;qAw9_AN5S@104.197.27.47',
    env : 'RABBIT_URI'
  },
  quadtree_precision : {
    doc : ' the lowest precision we deal with',
    format : Number,
    default : 8,
    env : 'QUADTREE_PRECISION'
  },
  twitter_consumer_key : {
    doc : ' twitter',
    format : Array,
    default : [
      //https://apps.twitter.com/app/8033815/show
      'AQJzdkTSAjICgC0deGfYIyUTs',
      //https://apps.twitter.com/app/8056888/show
      'AEHPjf2gLv2nUWFnR1K35hPb9',
      //https://apps.twitter.com/app/8092008/
      'drjT7E0G2nhZtAP589wNlFPpj',
      //https://apps.twitter.com/app/8092029
      'j1RZd2cXOj5j3rZd3PIrjR0UP',
      //https://apps.twitter.com/app/8092036
      '683tYRrvozD0tDAMJFMdePlAT'
    ],
    env : 'twitter_consumer_key'
  },
  twitter_consumer_secret : {
    doc : ' twitter',
    format : Array,
    default : [
      'LWPKKiLL3Qzehy6PCp7Rhu5ZwFetJvKD11wnyrJvU5Yb0EcOiT',
      'vaYJfJ2Qg911WWtXZ1TO1VjHClHHnVVghqu7XN8iHBomSLb4jT',
      'FaHsr8biuUrg5yiMD2pfCgJuHEgIOvwAbxeSzVhNML3bEnYdEX',
      '60pw8PgsjoiDPnG61p3kqahNxl2mQhrhtjGadnt4g0IJyGnafs',
      'CVGA2czELEwFvEmnVBjCm8mZptmeSVJHtrHUzHBlQhalcUEiuA'
    ],
    env : 'twitter_consumer_secret'
  },
  twitter_consumer_access_token : {
    doc : ' twitter',
    format : Array,
    default : [
      '399917385-ZKN8NUSq4pCJO43SqKn60Y3BYG2myW79UgMYxtj2',
      '399917385-QadN3nau1ZxX9X8BHbPQpYWtROX4XmMLaXCdrAFj',
      '399917385-ntY6BUK6sCMnW17Jd8XZH1U2uw0tAnd0JaCfcsyq',
      '399917385-OnLJwz6h963GliolHG2xYWTRTceQbnVZPxcTEkmp',
      '399917385-Ha0pyw5yC4N5QBdQU2cqvzyFozSSB2xAhATpMpSf'
    ],
    env : 'twitter_consumer_access_token'
  },
  twitter_consumer_access_token_secret : {
    doc : ' twitter',
    format : Array,
    default : [
      'rQ5xDGgELBmwXXZx6BCOHMUq8SI3aHYHgEqShAvk9lSqK',
      'RQQATyPKe9v27lh7rIRmGrz0pKNFymIVnxt979m5VjBSR',
      'mZMxe2MZPl8nzVXLeKkYgt8GkKkApBXWmpQ7ZxtVRJiAo',
      'lwjkJ2jtAUaJSkcQgL3Oi0PdO76GgKDUceFDPSzA6FRee',
      'bTWUr3EszVVsEKTFrHWixOaLBuMIuCX5G2kE3pFB23I3W'
    ],
    env : 'twitter_consumer_access_token_secret'
  },
  twitter_regions : {
    doc : ' twitter',
    format : Array,
    default : [
      ['00', '02'], // us ouest
      ['01', '03'], // us east
      ['21', '30', '31'], // amerique sud, afrique, australie
      ['12'], // europe centrale
      ['10', '11', '13'] //europe nord + asie
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

module.exports = conf;
