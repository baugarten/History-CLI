import { clipsList } from '../src/api/clips';
var server = require('hist-server').server;
var TestUtils = require('hist-server').TestUtils;
var DbUtils = require('hist-server').DbUtils;
var knex = require('hist-server').knex;
var should = require('should');

describe('clip list', () => {
  before(function(done) {
    this.timeout(10000);
    DbUtils.clean(knex).then(function() { done(); });
  });

  it('should list clips', () => {
    return clipsList(TestUtils.user().generateToken())
      .then(function(clips) {
        should(clips.clips).be.an.Array();
      });
  });

  it('should receive a 400 when given an invalid token', () => {
    return clipsList("invalidtoken")
      .then(function(clips) {
        return Promise.reject('Expected error');
      }, function(err) {
        should(err).not.be.empty();
        return Promise.resolve(); 
      }); 
  });
});

