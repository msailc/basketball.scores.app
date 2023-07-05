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
    listHTML += "<p class='teams'>" + match.home_team_name + " " + match.home_team_score + " vs " + match.away_team_score + " " + match.away_team_name + "</p>";
    listHTML += "</li>";
  });

  listHTML += "</div>";

  $(".matches-list").html(listHTML);
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
