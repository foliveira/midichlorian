'use strict';

var request = require('request');
var BbPromise = require('bluebird');

module.exports = exports = function requestPromisifiedWrap(uri, opts, cb) {
  if('function' === typeof opts) {
    cb = opts;
    opts = (void 0);
  }

  var promise = new BbPromise(function(resolve, reject) {
    request(uri, opts, function(err, res) {
      if(err) {
        reject(err);
      } else if(res && res.statusCode === 200) {
        resolve(JSON.parse(res.body));
      } else {
        reject(new Error('These aren\'t the resources you\'re looking for'));
      }
    });
  });

  return ('function' !== typeof cb) ? promise : promise.nodeify(cb);
}
