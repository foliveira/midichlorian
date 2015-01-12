'use strict';

var should = require('should');
var nock = require('nock');
var swapi = require('../index');
var scope = null;

describe('the films submodule', function() {
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

  it('should return a film object given it\'s id', function (done) {
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
      console.log(err);
      done();
    });
  });
});
