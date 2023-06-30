function displayMatches(matches, teamFilter) {
  var listHTML = "<ul class='matches-list'>";

  matches.forEach(function(match) {
    if (teamFilter && (match.home_team_name !== teamFilter && match.away_team_name !== teamFilter)) {
      return;
    }

    listHTML += "<li>";
    listHTML += "<div>";
    listHTML += "<p><strong>Date & Time:</strong> " + match.match_date + "</p>";
    listHTML += "<p><strong>Location:</strong> " + match.location + "</p>";
    listHTML += "</div>";
    listHTML += "<p class='teams'>" + match.home_team_name + match.home_team_score + " vs " + match.away_team_score + match.away_team_name + "</p>";
    listHTML += "</li>";
  });

  listHTML += "</ul>";

  $(".matches-list").html(listHTML);
}

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

$("#league-filter").change(function() {
  var selectedLeagueId = $(this).val();

  if (selectedLeagueId !== "") {
    loadContent("http://localhost/localbb/server/rest/teams", function(teamsResponse) {
      var selectedTeam = $("#team-filter").val(); 

      loadContent("http://localhost/localbb/server/rest/matches", function(matchesResponse) {
        filterMatches(selectedLeagueId, selectedTeam, matchesResponse, teamsResponse);
      });
    });
  } else {
    loadContent("http://localhost/localbb/server/rest/matches", function(response) {
      displayMatches(response);
    });
  }
});
