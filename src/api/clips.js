import { requireToken } from './auth'
let request = require('superagent');

exports.clipsList = function(token) {
  return new Promise(function(resolve, reject) {
    request.get('http://localhost:3000/api/v1/clip')
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .end(function(err, res) {
      if (!err && res.ok) {
        return resolve(res.body);
      } else {
        var errorMessage;
        if (res && res.status === 400) {
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
  return requireToken().then(function(token) {
    return exports.clipSaveWithToken(clipText, token);
  });
};

exports.clipSaveWithToken = function(clipText, token) {
  return new Promise(function(resolve, reject) {
    request.post('http://localhost:3000/api/v1/clip')
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .send({
      'clip': clipText
    })
    .end(function(err, res) {
      if (!err && res.ok && res.body.clip) {
        return resolve(res.body.clip);
      } else {
        var errorMessage;
        if (res && res.status === 400) {
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

