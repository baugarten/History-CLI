import { clipSaveWithToken } from '../src/api/clips';
var request = require('superagent');
var config = require('./superagent-mock-config');
var superagentMock = require('superagent-mock')(request, config);
var should = require('should');

describe('clip save', () => {
  it('should save clip', () => {
    return clipSaveWithToken('this is clip text', 'validtoken').then(function(clip) {
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

