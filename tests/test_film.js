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
  it('should return a people object given it\'s id', function (done) {

    done();
  });

  it('should return an error when given an invalid id', function (done) {

    done();
  });
});
