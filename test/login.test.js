var auth = require('../src/api/auth');
var config = require('../src/api/config');
var server = require('hist-server').server;
var TestUtils = require('hist-server').TestUtils;
var DbUtils = require('hist-server').DbUtils;
var knex = require('hist-server').knex;
var should = require('should');
var Promise = require('bluebird');

describe('auth', () => {
  before(function(done) {
    this.timeout(10000);
    DbUtils.clean(knex).then(function() { done(); });
  });

  it('should authenticate with username and password', () => {
    return auth.authenticate(TestUtils.user().get('email'), TestUtils.unhashedPassword())
      .then(function(res) {
        return Promise.join(config.requireToken(), config.requireDefaultTeamId(), function(token, teamId) {
          should(token).not.be.empty();
          should(teamId).not.be.empty();
        });
      });
  });
  it('should receive a 400 when given an invalid email', () => {
    return auth.authenticate("invalidemail", "validpassword")
      .then(function(token) {
        return Promise.reject('Expected error');
      }, function(err) {
        should(err).not.be.empty();
        return Promise.resolve(); 
      }); 
  });
});

