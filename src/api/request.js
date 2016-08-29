import { baseUrl } from '../config';
const request = require('superagent');
const logger = require('../logger');

var requestCounter = 0;

const oldEnd = request.Request.prototype.end;
request.Request.prototype.end = function(cb) {
  const hrstart = process.hrtime();
  return oldEnd.call(this, function(err, res) {
    const hrend = process.hrtime(hrstart);
    var requestInfo;
    if (!!res) {
      requestInfo = `[${res.req.method}] request complete to ${res.req.path}`;
    } else {
      requestInfo = `request failed`;
    }
    logger.debug(`${requestInfo} - ${hrend[1]/1000000}ms`, err && err.toString(), res && res.status, res && res.body);

    var errorMessage;
    if (err || !res.ok) {
      if (res && res.status === 401) {
        errorMessage = "Authentication failed! Bad username/password";
      } else if (err) {
        errorMessage = err.toString();
      } else {
        errorMessage = res.text;
      }
    }
    return cb(err, res, errorMessage);
  });
};

function mkRequest(method) {
  return function(token, path) {
    if (arguments.length === 1) {
      path = token;
      token = undefined;
    }
    const r = request[method](`${baseUrl}/api/v1/${path}`)
      .set('Accept', 'application/json')

    if (token !== undefined) {
      return r.set('Authorization', `Bearer ${token}`);
    }
    return r;
  }
};

exports.get = mkRequest('get');
exports.post = mkRequest('post');
exports.put = mkRequest('put');
exports.delete = mkRequest('delete');

