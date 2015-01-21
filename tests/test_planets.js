/*global describe, it, before, after, beforeEach, afterEach */
'use strict';

var should = require('should');
var nock = require('nock');
var swapi = require('../lib/swapi');
var scope = null;

describe('the planets endpoints', function() {
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

  it('should return a planet object given an id', function (done) {
    scope = nock('http://swapi.co')
    .get('/api/planets/1/')
    .reply(200, require('./fixtures/tatooine.json'));

    swapi.planets.get(1).then(function(data) {
      data.name.should.be.eql('Tatooine');

      done();
    });
  });

  it('should return an error when given an invalid id', function (done) {
    scope = nock('http://swapi.co')
    .get('/api/planets/should-fail/')
    .reply(404, {'should': 'fail'});

    swapi.planets.get('should-fail', function(err) {
      

      done();
    });
  });

  it('should return a set of planets', function(done) {
    scope = nock('http://swapi.co')
    .get('/api/planets/')
    .reply(200, require('./fixtures/planets.json'));

    swapi.planets.get().then(function(data) {
      data.should.have.ownProperty('count');
      data.count.should.be.above(0);
      data.results.should.be.an.Array;

      done();
    });
  });
});
