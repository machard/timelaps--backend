'use strict';

var convict = require('convict');
var fs = require('fs');
var _ = require('lodash');

var conf = convict({
  env : {
    doc : 'The applicaton environment.',
    format : ['production', 'development'],
    default : 'development',
    env : 'NODE_ENV'
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
    default : [],
    env : 'twitter_consumer_key'
  },
  twitter_consumer_secret : {
    doc : ' twitter',
    format : Array,
    default : [],
    env : 'twitter_consumer_secret'
  },
  twitter_consumer_access_token : {
    doc : ' twitter',
    format : Array,
    default : [],
    env : 'twitter_consumer_access_token'
  },
  twitter_consumer_access_token_secret : {
    doc : ' twitter',
    format : Array,
    default : [],
    env : 'twitter_consumer_access_token_secret'
  },
  twitter_regions : {
    doc : ' Regions associated with each twitter stream',
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

var tCredentials = process.cwd() + '/.twitter';
if (fs.existsSync(tCredentials)) {
  conf.load(_.pick(JSON.parse(fs.readFileSync(tCredentials, 'utf8')), [
    'twitter_consumer_key',
    'twitter_consumer_secret',
    'twitter_consumer_access_token',
    'twitter_consumer_access_token_secret'
  ]));
}

conf.validate();

module.exports = conf;
