var superagent = require('superagent');

module.exports = [
  {
    /**
     * regular expression of URL
     */
    pattern: 'localhost:3000(.*)',

    /**
     * returns the data
     *
     * @param match array Result of the resolution of the regular expression
     * @param params object sent by 'send' function
     * @param headers object set by 'set' function
     */
    fixtures: function (match, params, headers) {
      if (match[1] === '/login') {
        if(params['email'] === 'validemail@gmail.com' && params['password'] === 'validpassword') {
          return {
            token: "token!",
            user: {
              name: "Ben",
              email: "validemail@gmail.com"
            }
          };
        } else if (params['email'] === 'invalidemail') {
          throw badRequest("Invalid email");
        } else {
          throw unauthorized('Email and password do not match');
        }
      }

      let token = headers['Authorization'].split(' ')[1] 
      if (token === 'invalidtoken') {
        throw unauthorized('Invalid authentication token');
      }

      if (match[1] === '/api/v1/clip') {
        if (params && params['clip']) {
          return {
            clip: {
              clip: params['clip']
            }
          }
        } else {
          return {
            clips: []
          }
        }
      }
    },

    /**
     * returns the result of the GET request
     *
     * @param match array Result of the resolution of the regular expression
     * @param data  mixed Data returns by `fixtures` attribute
     */
    get: function (match, data) {
      return new superagent.Response({
        res: {
          statusCode: 200,
          headers: {},
          setEncoding: function (){},
          on: function (){},
          body: data
        },
        req: {
          method: function (){}
        },
        xhr: {
          responseType: '',
          getAllResponseHeaders: function () {return 'a header';},
          getResponseHeader: function () {return 'a header';}
        }
      });
    },

    /**
     * returns the result of the POST request
     *
     * @param match array Result of the resolution of the regular expression
     * @param data  mixed Data returns by `fixtures` attribute
     */
    post: function (match, data) {
      return new superagent.Response({
        res: {
          statusCode: 200,
          headers: {},
          setEncoding: function (){},
          on: function (){},
          body: data
        },
        req: {
          method: function (){}
        },
        xhr: {
          responseType: '',
          getAllResponseHeaders: function () {return 'a header';},
          getResponseHeader: function () {return 'a header';}
        }
      });
    }
  }
];

function badRequest(msg) {
  var err = new Error(400);
  err.responseBody = { msg: msg };
  return err;
}

function unauthorized(msg) {
  var err = new Error(401);
  err.responseBody = { msg: msg };
  return err;
}
