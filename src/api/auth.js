import { post } from './request'
var config = require('./config');

exports.authenticate = function(email, password) {
  return new Promise(function(resolve, reject) {
    post('login')
      .send({
        'email': email,
        'password': password
      })
      .end(function(err, res, errorMessage) {
        if (!err && res.ok) {
          var defaultTeamId = undefined;
          if (res.body.user.accounts && res.body.user.accounts.length > 0) {
            let account = res.body.user.accounts[0];
            if (account.teams && account.teams.length > 0) {
              defaultTeamId = account.teams[0].id;
            }
          }
          config.writeConfigFile(res.body.token, defaultTeamId);
          resolve();
        } else {
          if (err && res.status === 400) {
            reject('Invalid email or password.');
          } else {
            reject(errorMessage);
          }
        }
      })
  });
}

