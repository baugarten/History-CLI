#!/usr/bin/env node --harmony

require("babel-polyfill");

import { requireTokenAndTeamId, changeTeam } from './api/config'
import { teamsList } from './api/teams'
import { formatTeamShort } from './utils/formatters'
const logger = require('./logger')
const program = require('commander')

var team;

program
  .arguments('<new_team>')
  .action(function(enteredTeam) {
    team = enteredTeam;
  })
  .parse(process.argv)

if (team) {
  switchDefaultTeamToTeamWithShortName(team);
} else {
  listActiveTeams();
}

function switchDefaultTeamToTeamWithShortName(team) {
  let normalizedTeamName = team.replace(/\W+/g, '-').toLowerCase();
  fetchTeamsAndTeamId().spread(function(body, teamId) {
    let foundTeam = body.teams.find(function(team) {
      return team.short_name === normalizedTeamName;
    });
    if (foundTeam) {
      changeTeam(foundTeam.id);
      logger.out(`Switching to team ${foundTeam.short_name}`);
    } else {
      logger.out(`Couldn't find team with name ${team}.`)
      logger.out(`Valid options are:\n`)
      printTeams(body.teams, teamId);
    }
  }).catch(function(err) {
    console.error('Error fetching teams', err);
    process.exit(1);
  });
}

function listActiveTeams() {
  fetchTeamsAndTeamId().spread(function(body, teamId) {
    printTeams(body.teams, teamId);
    process.exit(0);
  }).catch(function(err) {
    console.error('Error fetching teams', err);
    process.exit(1);
  });
}

function fetchTeamsAndTeamId() {
  return requireTokenAndTeamId(function(token, teamId) { 
    return [teamsList(token), teamId];
  });
}

function printTeams(teams, currentTeamId) {
  teams.map(formatTeamShort(currentTeamId)).forEach(function(formattedTeam) {
    logger.out(formattedTeam);
  });
}
