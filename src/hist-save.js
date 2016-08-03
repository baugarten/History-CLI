#!/usr/bin/env node --harmony

require("babel-polyfill");

import { requireToken } from './api/auth'
import { clipSave } from './api/clips'
var program = require('commander')

var cmdValue;

program
  .arguments('[cmd...]')
  .action(function(cmd) {
    cmdValue = cmd.join(' ');    
  })
  .parse(process.argv)
  
if (!cmdValue || !cmdValue.trim()) {
  console.log("Received no clip to save: reading from stdin")

  cmdValue = "";
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', function (chunk) {
    cmdValue += chunk;
  });

  process.stdin.on('end', function () {
    saveClip(cmdValue);
  });
} else {
  saveClip(cmdValue)};

function saveClip(cmdValue) {
  clipSave(cmdValue).then(function(clip) { 
    console.log("Saved clip", clip.clip);
    process.exit(0);
  }, function(err) {
    console.error("Error saving clip", err);
    process.exit(1);
  });
}

