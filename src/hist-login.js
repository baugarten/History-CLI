#!/usr/bin/env node --harmony

require("babel-polyfill");

import { authenticate } from './api/auth';
var program = require('commander')
var co = require('co')
var prompt = require('co-prompt')
var request = require('superagent')
var fs = require('fs');

program
  .option('-e, --email <email>', 'email')
  .parse(process.argv)
  
if (!program.email) {
  console.error("Need to supply email address")
  process.exit(1);
}

co(function *() {
  var email = program.email;
  var password = yield prompt.password('password: ');
  authenticate(email, password)
    .then(function() {
      process.exit(0);
    })
    .catch(function(err) {
      console.error(err);
     process.exit(1) 
    });
})

