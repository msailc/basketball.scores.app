function displayTeams(teams, leagueId) {
  var tableHTML = "<table class='standings-table'>";
  tableHTML += "<tr><th>Logo</th><th>Team</th><th>Wins</th><th>Losses</th><th>Points For</th><th>Points Against</th></tr>";

  teams.forEach(function(team) {
    if (team.league_id === leagueId) {
      tableHTML += "<tr id='team-" + team.id + "'>";
      tableHTML += "<td class='team-logo-cell'><img src='logos/" + getTeamLogoFilename(team.team_name) + "' alt='" + team.team_name + " Logo'></td>";
      tableHTML += "<td class='team-name-cell'><a class='team-link' data-team-id='" + team.id + "'>" + team.team_name + "</a></td>";
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

  $(".content").on("click", ".team-name-cell", function() {
    var teamId = $(this).find(".team-link").data("team-id");
    loadTeamData(teamId); 
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

loadContent("rest/standings", function(response) {
  displayTeams(response, 1);
});

function loadTeamData(teamId) {
  var teamUrl = "rest/teams/" + teamId;
  var playersUrl = "rest/teams/" + teamId + "/players";

  // Fetch team data
  loadContent(teamUrl, function (teamData) {
    // Fetch players data
    loadContent(playersUrl, function (playersData) {
      $(".content").html(function () {
        var teamDataHTML = "<div class='team-details'>";
        teamDataHTML += "<div class='team-info'>";
        teamDataHTML += "<div class='team-name-coach'>";
        teamDataHTML += "<div class='team-name'>";
        teamDataHTML += "<img src='logos/" + getTeamLogoFilename(teamData.team_name) + "' alt='" + teamData.team_name + " Logo'>";
        teamDataHTML += "<h2>" + teamData.team_name + "</h2>";
        teamDataHTML += "</div>";
        teamDataHTML += "</div>";
        teamDataHTML += "</div>";
        teamDataHTML += "<hr class='full-width-line'>"; // Horizontal line
        teamDataHTML += "<div class='team-players'>";
        teamDataHTML += "<h3>Coach: " + teamData.team_coach + ", " + "</h3>";
        teamDataHTML += "<h3>Players:</h3>";
        if (playersData.length > 0) {
          teamDataHTML += "<div class='players-list'>";
          playersData.forEach(function (player) {
            teamDataHTML += "<h3>" + player.player_name + ", " + player.player_age + ", " + player.player_country + "</h3>";
          });
          teamDataHTML += "</div>";
        } else {
          teamDataHTML += "<p>No players found.</p>";
        }
        teamDataHTML += "</div>";
        teamDataHTML += "</div>";
        return teamDataHTML;
      });
    });
  });
}

