/*global describe, it, before, after, beforeEach, afterEach */
'use strict';

var should = require('should');
var nock = require('nock');
var swapi = require('../lib/swapi');
var scope = null;

describe('the people endpoints', function() {
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

  it('should return a character object given an id', function (done) {
    scope = nock('http://swapi.co')
    .get('/api/people/1/')
    .reply(200, require('./fixtures/luke-skywalker.json'));

    swapi.people.get(1).then(function(data) {
      data.name.should.be.eql('Luke Skywalker');

      done();
    });
  });

  it('should return an error when given an invalid id', function (done) {
    scope = nock('http://swapi.co')
    .get('/api/people/should-fail/')
    .reply(404, {'should': 'fail'});

    swapi.people.get('should-fail', function(err) {

      done();
    });
  });

  it('should return a set of characters', function(done) {
    scope = nock('http://swapi.co')
    .get('/api/people/')
    .reply(200, require('./fixtures/characters.json'));

    swapi.people.get().then(function(data) {
      data.should.have.ownProperty('count');
      data.count.should.be.above(0);
      data.results.should.be.an.Array;

      done();
    });
  });
});
