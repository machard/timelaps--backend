'use strict';

// sorte de wrapper autour de rabbit.js pour gerer les decos/recos
// sans interrompre les sockets

var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var __ = require('highland');
var util = require('util');
var async = require('async');
var rabbit = require('rabbit.js');

var conf = require('../config');
var logger = require('./logger');

function Event(data, topic) {
  this.data = data;
  this.topic = topic;
}

Event.prototype.getData = function() {
  return JSON.stringify(this.data);
};

function RabbitManager(options) {
  EventEmitter.call(this);

  this.sockets = [];
  this.factories = [];

  this.uri = options.uri;

  _.bindAll(this);
}

util.inherits(RabbitManager, EventEmitter);

RabbitManager.prototype.init = function(callback) {
  var self = this;
  self.c = rabbit.createContext(self.uri);

  var ccalled;

  self.c.once('error', function(err) {
    self.emit('error', err);

    setTimeout(function() {
      self.init(ccalled ? _.noop : callback);
    }, 100);
  });

  self.c.once('close', function() {
    // we give time for error to fire/allow others close listeners
    setTimeout(function() {
      self.c.removeAllListeners();
    });

    _.each(self.sockets, function(socket) {
      socket.close = _.noop;
      socket.stream.destroy();
    });

    self.sockets = [];
  });

  self.c.once('ready', function() {
    async.applyEach(self.factories, function(err) {
      if (err) {
        return callback(err);
      }

      ccalled = true;
      self.emit('ready');

      callback();
    });
  });
};

RabbitManager.prototype.stop = function(callback) {
  var self = this;

  self.c.once('close', callback);
  self.c.close();
};

RabbitManager.prototype.event = function(data, topic) {
  return new Event(data, topic);
};

RabbitManager.prototype.socket = function(type, destination, options) {
  var self = this;
  var stream = __();

  self.factories.push(function(callback) {
    var fork = stream.fork();
    var socket = self.c.socket(type, options);

    socket.connect(destination, function() {
      if (!socket.writable) {
        socket.pipe(fork);
      } else {
        fork.each(function(x) {
          if (x.topic) {
            return socket.publish(x.topic, x.getData());
          }
          socket.write(x.getData());
        });
      }

      callback();
    });

    socket.stream = fork;

    self.sockets.push(socket);
  });

  return stream;
};

var rm = new RabbitManager({
  uri : conf.get('rabbituri')
});

rm.on('error', function(err) {
  logger.error('rabbit connection error', err);
});

rm.on('ready', function() {
  logger.info('rabbit connection ready');
});

rm.on('socket unavailable', function(name) {
  logger.error('socket unavailable', name);
});

rm.init();

module.exports = rm;
