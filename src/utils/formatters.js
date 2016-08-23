var colors = require('colors');

module.exports.formatClipShort = function(clip) {
  return `* ${clip.uuid.substring(0, 7).yellow} - ${clip.clip} ` + `<${clip.creator.name}>`.blue;
}

module.exports.formatTeamShort = function(currentTeamId) {
  return function(team) {
    if (currentTeamId == team.id) {
      return `* ${team.short_name}`;
    } else {
      return `  ${team.short_name}`;;
    }
  }
};
