import { clipsList } from '../src/api/clips';
var request = require('superagent');
var config = require('./superagent-mock-config');
var superagentMock = require('superagent-mock')(request, config);
var should = require('should');

describe('clip list', () => {
  it('should list clips', () => {
    return clipsList('validtoken')
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

