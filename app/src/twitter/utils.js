'use strict';

var _ = require('lodash');

module.exports = function(conf) {
  var terms = conf.get('twitter_url_media_terms');

  return {
    urlmediatype : function(url) {
      return _.find(terms, function(term) {
        return url.indexOf(term) > -1;
      });
    }
  };
};
