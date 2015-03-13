'use strict';

exports.start = function(app, callback) {
  app
    .run()

    .get('core')
    .get('appswitch')
    .start(callback);
};

exports.stop = function(app, callback) {
  app
    .run()

    .get('core')
    .get('appswitch')
    .stop(callback);
};
