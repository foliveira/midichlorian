/*global describe, it, before, after, beforeEach, afterEach */
'use strict';

var should = require('should');
var nock = require('nock');
var swapi = require('../lib/swapi');
var scope = null;

describe('the species endpoints', function() {
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
    .get('/api/species/1/')
    .reply(200, require('./fixtures/droid.json'));

    swapi.species.get(1).then(function(data) {
      data.name.should.be.eql('Droid');

      done();
    });
  });

  it('should return an error when given an invalid id', function (done) {
    scope = nock('http://swapi.co')
    .get('/api/species/not-the-droid-you-are-looking-for/')
    .reply(404, {'should': 'fail'});

    swapi.species.get('not-the-droid-you-are-looking-for', function(err) {


      done();
    });
  });

  it('should return a set of species', function(done) {
    scope = nock('http://swapi.co')
    .get('/api/species/')
    .reply(200, require('./fixtures/species.json'));

    swapi.species.get().then(function(data) {
      data.should.have.ownProperty('count');
      data.count.should.be.above(0);
      data.results.should.be.an.Array;

      done();
    });
  });
});
