var request = require('superagent');
var fs = require('fs');

let fileName = `${getUserHome()}/.cliprc`;

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
          fs.writeFileSync(fileName, `{"token": "${res.body.token}"}`, { encoding: 'utf8', flag: 'w' });
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

exports.requireToken = function() {
  return new Promise(function(resolve, reject) {
    try {
      resolve(JSON.parse(fs.readFileSync(fileName)).token);
    } catch (e) {
      reject(e);
    }
        
  });
}

