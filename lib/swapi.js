'use strict';

var prequest = require('./promising-request')

var requester = function(path) {
  function makeUrl(id, page) {
    var resourceUrl = (function(p) {
      return 'http://swapi.co/api/' + p + '/';
    })(path);

    if(id === void 0) {
      if(page === void 0) {
        return resourceUrl;
      } else {
        return resourceUrl + '?page=' + page;
      }
    } else {
      return resourceUrl + id + '/';
    }
  }

  return {
    get: function(id, opts, cb) {
      if("object" === typeof id) {
        cb = opts;
        opts = id;
        id = (void 0);
      }
      opts = opts || {};
      return swapi(makeUrl(id, opts.page), opts, cb);
    }
  }
}

function swapi(uri, opts, cb) {
  return prequest(uri, opts, cb);
}

swapi.people = requester('people');
swapi.films = requester('films');
swapi.planets = requester('planets');
swapi.species = requester('species');
swapi.starships = requester('starships');
swapi.vehicles = requester('vehicles');

swapi.info = {
  version: require('../package').version,
  path: __dirname
}

module.exports = exports = swapi;
