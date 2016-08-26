import { teamsList } from '../src/api/teams';
var server = require('hist-server').server;
var TestUtils = require('hist-server').TestUtils;
var DbUtils = require('hist-server').DbUtils;
var knex = require('hist-server').knex;
var should = require('should');

describe('teams list', () => {
  before(function(done) {
    this.timeout(10000);
    DbUtils.clean(knex).then(function() { done(); });
  });

  it('should list teams', () => {
    return teamsList(TestUtils.user().generateToken())
      .then(function(teams) {
        should(teams.teams).be.an.Array();
        should(teams.teams.length).be.equal(1);
      });
  });
  it('should receive a 400 when given an invalid token', () => {
    return teamsList("invalidtoken")
      .then(function(clips) {
        return Promise.reject('Expected error');
      }, function(err) {
        should(err).not.be.empty();
        should(err).equal('Authentication failed! Bad username/password');
        return Promise.resolve(); 
      }); 
  });
});

