import { clipSaveWithToken } from '../src/api/clips';
var server = require('hist-server').server;
var TestUtils = require('hist-server').TestUtils;
var DbUtils = require('hist-server').DbUtils;
var knex = require('hist-server').knex;
var should = require('should');

describe('clip save', () => {
  before(function(done) {
    this.timeout(10000);
    DbUtils.clean(knex).then(function() { done(); });
  });

  it('should save clip', () => {
    return clipSaveWithToken(
      'this is clip text', 
      TestUtils.defaultTeam().get('id'), 
      TestUtils.user().generateToken()
    ).then(function(clip) {
      should(clip.clip).be.equal('this is clip text');
    });
  });
  it('should receive a 400 when given an invalid token', () => {
    return clipSaveWithToken('this is clip text', "invalidtoken")
      .then(function(clips) {
        return Promise.reject('Expected an authentication error to occur');
      }, function(err) {
        should(err).not.be.empty();
        return Promise.resolve(); 
      }); 
  });
});

