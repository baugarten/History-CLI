var request = require('superagent');
var fs = require('fs');
var config = require('./config');

const fileName = `${getUserHome()}/.cliprc`;

function getUserHome() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

exports.authenticate = function(email, password) {
  return new Promise(function(resolve, reject) {
    request.post('http://localhost:3000/login')
      .set('Accept', 'application/json')
      .send({
        'email': email,
        'password': password
      })
      .end(function(err, res) {
        if (!err && res.ok) {
          var defaultTeamId = undefined;
          if (res.body.user.teams && res.body.user.teams.length > 0) {
            defaultTeamId = res.body.user.teams[0].id;
          }
          config.writeConfigFile(res.body.token, defaultTeamId);
          resolve();
        } else {
          var errorMessage;
          if (res && res.body && res.body.msg) {
            errorMessage = res.body.msg;
          } else if (err) {
            errorMessage = err;
          } else {
            errorMessage = res.text;
          }
          reject(errorMessage);
        }
      })
  });
}

