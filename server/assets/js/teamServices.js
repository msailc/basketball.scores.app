function displayTeams(teams, leagueId) {
  var tableHTML = "<table class='standings-table'>";
  tableHTML += "<tr><th>Team</th><th>Wins</th><th>Losses</th><th>Points For</th><th>Points Against</th></tr>";

  teams.forEach(function(team) {
    if (team.league_id === leagueId) {
      tableHTML += "<tr>";
      tableHTML += "<td>" + team.team_name + "</td>";
      tableHTML += "<td>" + team.wins + "</td>";
      tableHTML += "<td>" + team.losses + "</td>";
      tableHTML += "<td>" + team.points_for + "</td>";
      tableHTML += "<td>" + team.points_against + "</td>";
      tableHTML += "</tr>";
    }
  });

  tableHTML += "</table>";

  $(".content").html(function() {
    return `
      <div class="tabs">
        <button id="nba-tab">NBA</button>
        <button id="euroleague-tab">Euroleague</button>
        <button id="aba-league-tab">ABA League</button>
      </div>
      ${tableHTML}
    `;
  });

  $("#nba-tab").on("click", function() {
    displayTeams(teams, 1); 
  });

  $("#euroleague-tab").on("click", function() {
    displayTeams(teams, 2); 
  });

  $("#aba-league-tab").on("click", function() {
    displayTeams(teams, 3); 
  });
}

loadContent("http://localhost/localbb/server/rest/standings", function(response) {
  displayTeams(response, 1);
});
