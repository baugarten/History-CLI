import { clipSaveWithToken, clipGet } from '../src/api/clips';
var server = require('hist-server').server;
var TestUtils = require('hist-server').TestUtils;
var DbUtils = require('hist-server').DbUtils;
var knex = require('hist-server').knex;
var should = require('should');

var clip = undefined;

describe('clip show', () => {
  before(function(done) {
    this.timeout(10000);
    DbUtils.clean(knex).then(function() { 
      return clipSaveWithToken(
        'this is clip text', 
        TestUtils.defaultTeam().get('id'), 
        TestUtils.user().generateToken()
      )
    }).then(function(savedClip) {
      clip = savedClip;
      done();
    });
  });

  it('should get a clip', () => {
    return clipGet(TestUtils.user().generateToken(), clip.id)
      .then(function(clip) {
        should(clip.clip).equal('this is clip text');
      });
  });

  it('should receive a 400 when given an invalid token', () => {
    return clipGet("invalidtoken", clip.id)
      .then(function(clips) {
        return Promise.reject('Expected error');
      }, function(err) {
        should(err).not.be.empty();
        return Promise.resolve(); 
      }); 
  });

  it('should 404 when given an invalid clip id', () => {
    return clipGet(TestUtils.user().generateToken(), 'badclipid')
      .then(function(clip) {
        return Promise.reject('Expected error');
      }, function(err) {
        console.log(err);
        should(err).not.be.empty();
        should(err.indexOf('Bad Request')).be.above(-1);
        return Promise.resolve(); 
      }); 
  });
});

