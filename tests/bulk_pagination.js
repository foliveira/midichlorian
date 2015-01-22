/*global describe, it, before, after, beforeEach, afterEach */
'use strict';

var should = require('should');
var nock = require('nock');
var swapi = require('../lib/swapi');
var scope = null;

describe('requesting pages for bulk requests', function() {
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

  it('should return an error when given an invalid id', function (done) {
    scope = nock('http://swapi.co')
    .get('/api/people/?page=-1')
    .reply(404);

    swapi.people.get({page: -1}, function(err) {

      done();
    });
  });

  it('should return the selected page of people', function(done) {
    scope = nock('http://swapi.co')
    .get('/api/people/?page=2')
    .reply(200, require('./fixtures/characters.json'));

    swapi.people.get({page: 2}).then(function(data) {
      data.should.have.ownProperty('count');
      data.count.should.be.above(0);
      data.results.should.be.an.Array;

      done();
    });
  });
});
