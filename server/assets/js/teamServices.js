function displayTeams(teams) {
  var tableHTML = "<table class='standings-table'>";
  tableHTML += "<tr><th>Team</th><th>Wins</th><th>Losses</th><th>Points For</th><th>Points Against</th></tr>";

  teams.forEach(function(team) {
    tableHTML += "<tr>";
    tableHTML += "<td>" + team.team_name + "</td>";
    
    tableHTML += "</tr>";
  });

  tableHTML += "</table>";

  $(".content").html(tableHTML);
}
