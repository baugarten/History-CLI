#!/usr/bin/env node --harmony

var program = require('commander')

program
  .version('0.0.1')
  .command('login [email]', 'login to clip').alias('i')
  .command('list', 'list your clips')
  .command('save <cmd>', 'save your clips')
  .parse(process.argv);
