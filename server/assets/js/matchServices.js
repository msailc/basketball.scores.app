function displayMatches(matches) {
  var listHTML = "<ul class='matches-list'>";

  matches.forEach(function(match) {
    listHTML += "<li>";
    listHTML += "<div>";
    listHTML += "<p><strong>Date & Time:</strong> " + match.match_date + "</p>";
    listHTML += "<p><strong>Location:</strong> " + match.location + "</p>";
    listHTML += "</div>";
    listHTML += "<p class='teams'>" + match.home_team_name + " vs " + match.away_team_name + "</p>";
    listHTML += "</li>";
  });

  listHTML += "</ul>";

  $(".matches-list").html(listHTML);
}

  // Filter matches by league
  $("#league-filter").change(function() {
    var selectedLeagueId = $(this).val();
    loadContent("http://localhost/localbb/server/rest/matches", function(response) {
      if (selectedLeagueId !== "") {
        var filteredMatches = response.filter(function(match) {
          return match.league_id == selectedLeagueId;
        });
        displayMatches(filteredMatches);
      } else {
        displayMatches(response);
      }
    });
  });