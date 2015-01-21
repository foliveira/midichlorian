/*global describe, it, before, after, beforeEach, afterEach */
'use strict';

var should = require('should');
var nock = require('nock');
var swapi = require('../lib/swapi');
var scope = null;

describe('the starships endpoints', function() {
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

  it('should return a species object given an id', function (done) {
    scope = nock('http://swapi.co')
    .get('/api/starships/10/')
    .reply(200, require('./fixtures/millenium-falcon.json'));

    swapi.starships.get(10).then(function(data) {
      data.name.should.be.eql('Millennium Falcon');

      done();
    });
  });

  it('should return an error when given an invalid id', function (done) {
    scope = nock('http://swapi.co')
    .get('/api/starships/should-fail/')
    .reply(404, {'should': 'fail'});

    swapi.starships.get('should-fail', function(err) {
      

      done();
    });
  });

  it('should return a set of starships', function(done) {
    scope = nock('http://swapi.co')
    .get('/api/starships/')
    .reply(200, require('./fixtures/starships.json'));

    swapi.starships.get().then(function(data) {
      data.should.have.ownProperty('count');
      data.count.should.be.above(0);
      data.results.should.be.an.Array;

      done();
    });
  });
});
