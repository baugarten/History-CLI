#!/usr/bin/env node --harmony

var program = require('commander')

program
  .version('0.0.1')
  .command('login [email]', 'login to clip')
  .command('list', 'list your clips')
  .command('team', 'list your teams')
  .command('save <cmd>', 'save your clips')
  .parse(process.argv);
