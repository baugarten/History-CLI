#!/usr/bin/env node --harmony

require("babel-polyfill");

import { authenticate } from './api/auth';
var logger = require('./logger')
var program = require('commander')
var co = require('co')
var prompt = require('co-prompt')
var request = require('superagent')
var fs = require('fs');

var email = undefined;
program
  .arguments('<email>')
  .action(function(enteredEmail) {
    email = enteredEmail;
  })
  .parse(process.argv)
  
co(function *() {
  if (!email) {
    email = yield prompt('email: ');
  }
  var password = yield prompt.password('password: ');
  authenticate(email, password)
    .then(function() {
      logger.out('Authentication successful.')
      process.exit(0);
    })
    .catch(function(err) {
      console.error(err);
      process.exit(1) 
    });
})

