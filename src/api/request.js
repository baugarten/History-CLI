const request = require('superagent');
const logger = require('../logger');

var requestCounter = 0;

const oldEnd = request.Request.prototype.end;
request.Request.prototype.end = function(cb) {
  const hrstart = process.hrtime();
  return oldEnd.call(this, function(err, res) {
    const hrend = process.hrtime(hrstart);
    logger.debug(`[${res.req.method}] request complete to ${res.req.path} - ${hrend[1]/1000000}ms`, err, res.status, res.body);
    return cb(err, res);
  });
};

function mkRequest(method) {
  return function(token, path) {
    return request[method](`localhost:3000/api/v1/${path}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
  }
};

exports.get = mkRequest('get');
exports.post = mkRequest('post');
exports.put = mkRequest('put');
exports.delete = mkRequest('delete');

