import { requireToken, requireDefaultTeamId } from './config'
import { get, post } from './request'
const Promise = require('bluebird');
const request = require('superagent');
const logger = require('../logger');

exports.clipsList = function(token) {
  return new Promise(function(resolve, reject) {
    get(token, 'clip')
      .end(function(err, res) {
        if (!err && res.ok) {
          return resolve(res.body);
        } else {
          var errorMessage;
          if (res && res.status === 401) {
            errorMessage = "Authentication failed! Bad username/password";
          } else if (err) {
            errorMessage = err;
          } else {
            errorMessage = res.text;
          }
          return reject(errorMessage)
        }
      });
  });
};

exports.clipSave = function(clipText) {
  return Promise.join(requireToken(), requireDefaultTeamId(), (token, defaultTeamId) => {
    return exports.clipSaveWithToken(clipText, defaultTeamId, token);
  });
};

exports.clipSaveWithToken = function(clipText, teamId, token) {
  return new Promise(function(resolve, reject) {
    post(token, 'clip')
      .send({
        'clip': clipText,
        'team_id': teamId
      })
      .end(function(err, res) {
        if (!err && res.ok && res.body.clip) {
          return resolve(res.body.clip);
        } else {
          var errorMessage;
          if (res && res.status === 401) {
            errorMessage = "Authentication failed! Bad username/password";
          } else if (err) {
            errorMessage = err;
          } else {
            errorMessage = res.text;
          }
          return reject(errorMessage);
        }
      });
  });
};

exports.clipGet = function(token, id) {
  return new Promise(function(resolve, reject) {
    get(token, `clip/${id}`)
      .end(function(err, res) {
        if (!err && res.ok && res.body.clip) {
          return resolve(res.body.clip);
        } else {
          var errorMessage;
          if (res && res.status === 401) {
            errorMessage = "Authentication failed! Bad username/password";
          } else if (err) {
            errorMessage = err;
          } else {
            errorMessage = res.text;
          }
          return reject(errorMessage);
        }
      });
  });
};
