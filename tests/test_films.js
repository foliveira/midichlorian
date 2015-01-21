/*global describe, it, before, after, beforeEach, afterEach */
'use strict';

var should = require('should');
var nock = require('nock');
var swapi = require('../lib/swapi');
var scope = null;

describe('the films endpoints', function() {
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

  it('should return a film object given an id', function (done) {
    scope = nock('http://swapi.co')
    .get('/api/films/1/')
    .reply(200, require('./fixtures/a-new-hope.json'));

    swapi.films.get(1).then(function(data) {
      data.title.should.be.eql('A New Hope');

      done();
    });
  });

  it('should return an error when given an invalid id', function (done) {
    scope = nock('http://swapi.co')
    .get('/api/films/should-fail/')
    .reply(404, {'should': 'fail'});

    swapi.films.get('should-fail', function(err) {

      done();
    });
  });

  it('should return a set of films', function(done) {
    scope = nock('http://swapi.co')
    .get('/api/films/')
    .reply(200, require('./fixtures/films.json'));

    swapi.films.get().then(function(data) {
      data.should.have.ownProperty('count');
      data.count.should.be.above(0);
      data.results.should.be.an.Array;

      done();
    });
  });
});
