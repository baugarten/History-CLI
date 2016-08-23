#!/usr/bin/env node --harmony

require("babel-polyfill");

import { requireTokenAndTeamId } from './api/config'
import { teamsList } from './api/teams'
import { formatTeamShort } from './utils/formatters'
const logger = require('./logger')
const program = require('commander')

program
  .parse(process.argv)
  
requireTokenAndTeamId(function(token, teamId) { 
  return [teamsList(token), teamId];
}).spread(function(body, teamId) {
  body.teams.map(formatTeamShort(teamId)).forEach(function(formattedTeam) {
    logger.out(formattedTeam);
  });
  process.exit(0);
}, function(err) {
  console.error("Error fetching teams", err);
  process.exit(1);
});
