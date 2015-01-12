'use strict';

var baseUrl = 'http://swapi.co/api/';

module.exports.baseUrl = baseUrl;

module.exports.people = require('./lib/people')(baseUrl);
module.exports.film = require('./lib/film')(baseUrl);
module.exports.planet = require('./lib/planet')(baseUrl);
module.exports.species = require('./lib/species')(baseUrl);
module.exports.starship = require('./lib/starship')(baseUrl);
module.exports.vehicle = require('./lib/vehicle')(baseUrl);
