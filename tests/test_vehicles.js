/*global describe, it, before, after, beforeEach, afterEach */
'use strict';

var should = require('should');
var nock = require('nock');
var swapi = require('../lib/swapi');
var scope = null;

describe('the vehicles endpoints', function() {
  before(function(done) {
    nock.disableNetConnect();
    done();
  });

  after(function(done){
    nock.enableNetConnect();
    done();
  });

  beforeEach(function(done){
    scope = null;
    nock.cleanAll();
    done();
  });

  afterEach(function(done){
    if (scope) {
      scope.done();
    }
    nock.cleanAll();
    done();
  });

  it('should return a vehicle object given an id', function (done) {
    scope = nock('http://swapi.co')
    .get('/api/vehicles/18/')
    .reply(200, require('./fixtures/at-at.json'));

    swapi.vehicles.get(18).then(function(data) {
      data.name.should.be.eql('AT-AT');

      done();
    });
  });

  it('should return an error when given an invalid id', function (done) {
    scope = nock('http://swapi.co')
    .get('/api/vehicles/should-fail/')
    .reply(404, {'should': 'fail'});

    swapi.vehicles.get('should-fail', function(err) {
      
      done();
    });
  });

  it('should return a set of vehicle', function(done) {
    scope = nock('http://swapi.co')
    .get('/api/vehicles/')
    .reply(200, require('./fixtures/vehicles.json'));

    swapi.vehicles.get().then(function(data) {
      data.should.have.ownProperty('count');
      data.count.should.be.above(0);
      data.results.should.be.an.Array;

      done();
    });
  });
});
