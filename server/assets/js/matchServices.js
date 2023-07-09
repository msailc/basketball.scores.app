function displayMatches(matches, teamFilter) {
  var listHTML = "<div>";

  matches.forEach(function(match) {
    if (teamFilter && (match.home_team_name !== teamFilter && match.away_team_name !== teamFilter)) {
      return;
    }

    listHTML += "<li>";
    listHTML += "<div>";
    listHTML += "<p><strong>Date & Time:</strong> " + match.match_date + "</p>";
    listHTML += "<p><strong>Location:</strong> " + match.location + "</p>";
    listHTML += "</div>";
    listHTML += "<div class='match-result'>";
    listHTML += "<div class='home-team'>";
    listHTML += "<div class='team-logo'><img src='logos/" + getTeamLogoFilename(match.home_team_name) + "' alt='" + match.home_team_name + " Logo'></div>";
    listHTML += "<p class='team-name'>" + match.home_team_name + "</p>";
    listHTML += "</div>";
    listHTML += "<p class='match-score'>" + match.home_team_score + " - " + match.away_team_score + "</p>";
    listHTML += "<div class='away-team'>";
    listHTML += "<div class='team-logo'><img src='logos/" + getTeamLogoFilename(match.away_team_name) + "' alt='" + match.away_team_name + " Logo'></div>";
    listHTML += "<p class='team-name'>" + match.away_team_name + "</p>";
    listHTML += "</div>";
    listHTML += "</div>";
    listHTML += "</li>";
  });

  listHTML += "</div>";

  $(".matches-list").html(listHTML);
}

function getTeamLogoFilename(teamName) {
  return teamName.toLowerCase().replace(/\s/g, "-") + "-logo.png";
}


$("#league-filter").change(function() {
  var selectedLeagueId = $(this).val();

  if (selectedLeagueId !== "") {
    loadContent("rest/teams", function(teamsResponse) {
      var selectedTeam = $("#team-filter").val(); 

      loadContent("rest/matches", function(matchesResponse) {
        filterMatches(selectedLeagueId, selectedTeam, matchesResponse, teamsResponse);
      });
    });
  } else {
    loadContent("rest/matches", function(response) {
      displayMatches(response);
    });
  }
});
