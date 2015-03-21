'use strict';

require('./app/mediastream/monitor');

require('./app/echo');

require('./app/core/appswitch').start(function(err) {
  console.log('app launch ' + (err ? 'failed' : 'succeeded'));
});
