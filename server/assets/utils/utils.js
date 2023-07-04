  function filterMatches(selectedLeagueId, selectedTeam, response, teamsResponse) {
      var filteredMatches = response.filter(function(match) {
        var leagueMatch = match.league_id == selectedLeagueId;
        var teamMatch = selectedTeam === "" || teamsResponse.some(function(team) {
          return team.league_id == selectedLeagueId && (team.team_name === selectedTeam || team.team_name === match.away_team_name);
        });
        return leagueMatch && teamMatch;
      });
      displayMatches(filteredMatches);
    }

    

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleString("en-US", options);
  }