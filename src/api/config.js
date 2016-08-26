const fs = require('fs');
const Promise = require('bluebird');

const fileName = `${getUserHome()}/.histrc`;

function getUserHome() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

var configFile = undefined;
function parseConfigFile() {
  if (!configFile) {
    configFile = JSON.parse(fs.readFileSync(fileName));
  }
  return configFile;
}


exports.requireToken = function() {
  return new Promise(function(resolve, reject) {
    try {
      resolve(parseConfigFile().token);
    } catch (e) {
      reject(e);
    }
  });
}

exports.requireDefaultTeamId = function() {
  return new Promise(function(resolve, reject) {
    try {
      resolve(parseConfigFile().defaultTeamId);
    } catch (e) {
      reject(e);
    }
  });
}

exports.requireTokenAndTeamId = function(cb) { 
  return Promise.join(exports.requireToken(), exports.requireDefaultTeamId(), cb);
};

exports.writeConfigFile = function(token, teamId) {
  var config = { token: token, defaultTeamId: teamId };
  fs.writeFileSync(fileName, JSON.stringify(config), { encoding: 'utf8', flag: 'w' });

}
