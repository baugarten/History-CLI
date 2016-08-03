#!/usr/bin/env node --harmony

require("babel-polyfill");

import { requireToken } from './api/auth'
import { clipsList } from './api/clips'
var program = require('commander')

program
  .option('-m, --mine', 'list only your clips')
  .parse(process.argv)
  
requireToken().then(function(token) { 
  return clipsList(token);
}).then(function(body) {
  console.log("Got clips", body.clips);
  process.exit(0);
}, function(err) {
  console.error("Error fetching clips", err);
  process.exit(1);
});
