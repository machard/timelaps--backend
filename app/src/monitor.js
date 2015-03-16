'use strict';

module.exports = function(mediastream, statsstream, core) {
  var logger = core.get('logger');

  mediastream.on('error', function(e) {
    logger.error('media stream error', e);
  });
  statsstream.on('error', function(e) {
    logger.error('statsstream stream error', e);
  });

  mediastream
    .fork()
    .each(function(media) {
      logger.info('media', media.type);
    });

  statsstream
    .fork()
    .each(function(stat) {
      logger.info('media stat', stat);
    });
};
