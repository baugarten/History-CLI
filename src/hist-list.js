#!/usr/bin/env node --harmony

require("babel-polyfill");

import { requireToken } from './api/config'
import { clipsList } from './api/clips'
import { formatClipShort } from './utils/formatters'
const program = require('commander')
const Promise = require('bluebird')
const logger = require('./logger')

program
  .parse(process.argv)
  
requireToken(function(token) { 
  return clipsList(token);
}).spread(function(body) {
  body.clips.map(formatClipShort).forEach(function(formattedClip) {
    logger.out(formattedClip);
  });
  process.exit(0);
}, function(err) {
  console.error("Error fetching clips", err);
  process.exit(1);
});
