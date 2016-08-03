import { authenticate } from '../src/api/auth';
var request = require('superagent');
var config = require('./superagent-mock-config');
var superagentMock = require('superagent-mock')(request, config);
var should = require('should');

describe('auth', () => {
  it('should authenticate with username and password', () => {
    return authenticate("validemail@gmail.com", "validpassword")
  });
  it('should receive a 400 when given an invalid email', () => {
    return authenticate("invalidemail", "validpassword")
      .then(function(token) {
        return Promise.reject('Expected error');
      }, function(err) {
        should(err).not.be.empty();
        return Promise.resolve(); 
      }); 
  });
});

