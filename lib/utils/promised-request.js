var BbPromise = require('bluebird');
var _ = require('lodash');
var request = require('request');

function promiseFunctionWrap(func, url, opts) {
  return new BbPromise(function(resolve, reject) {
    func(url, opts, function(err, res) {
      if(err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

_.forEach(['get', 'patch', 'post', 'put',' head', 'del'], function(fn){
  request[fn] = _.partial(promiseFunctionWrap, request[fn]);
});

module.exports = request;
