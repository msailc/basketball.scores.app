function displayStandings(standings) {
    var tableHTML = "<table>";
    tableHTML += "<tr><th>Team</th><th>Wins</th><th>Losses</th><th>Points For</th><th>Points Against</th></tr>";
    
    standings.forEach(function(standing) {
      tableHTML += "<tr>";
      tableHTML += "<td>" + standing.team_name + "</td>";
      tableHTML += "<td>" + standing.wins + "</td>";
      tableHTML += "<td>" + standing.losses + "</td>";
      tableHTML += "<td>" + standing.points_for + "</td>";
      tableHTML += "<td>" + standing.points_against + "</td>";
      tableHTML += "</tr>";
    });
    
    tableHTML += "</table>";
    
    $(".content").html(tableHTML);
  }
  