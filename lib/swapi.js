'use strict';

var prequest = require('./promising-request')

var requester = function(path) {
  function makeUrl(id) {
    var turl = (function(p) { return 'http://swapi.co/api/' + p + '/'; })(path);

    return id === void 0 ? turl : turl + id + '/';
  }

  return {
    get: function(id, cb) {
      return swapi(makeUrl(id), cb);
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
