import { requireTokenAndTeamId} from './config'
import { get, post } from './request'
const Promise = require('bluebird');
const request = require('superagent');

exports.teamsList = function(token) {
  return new Promise(function(resolve, reject) {
    get(token, 'team')
      .end(function(err, res, errorMessage) {
        if (!err && res.ok) {
          return resolve(res.body);
        } else {
          return reject(errorMessage)
        }
      });
  });
};

