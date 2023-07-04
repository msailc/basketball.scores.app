function displayTeams(teams, leagueId) {
  var tableHTML = "<table class='standings-table'>";
  tableHTML += "<tr><th>Team</th><th>Wins</th><th>Losses</th><th>Points For</th><th>Points Against</th></tr>";

  teams.forEach(function(team) {
    if (team.league_id === leagueId) {
      tableHTML += "<tr id='team-" + team.id + "'>";
      console.log(team.id);
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

loadContent("http://localhost/localbb/server/rest/standings", function(response) {
  displayTeams(response, 1);
});

function loadTeamData(teamId) {
  var teamUrl = "http://localhost/localbb/server/rest/teams/" + teamId;
  var playersUrl = "http://localhost/localbb/server/rest/teams/" + teamId + "/players";

  // Fetch team data
  loadContent(teamUrl, function (teamData) {
    // Fetch players data
    loadContent(playersUrl, function (playersData) {
      $(".content").html(function () {
        var teamDataHTML = "<div class='team-details'>";
        teamDataHTML += "<div class='team-info'>";
        teamDataHTML += "<img class='team-logo' src='team_logo_url' alt='Team Logo'>";
        teamDataHTML += "<div class='team-name-coach'>";
        teamDataHTML += "<h2>" + teamData.team_name + "</h2>";
        teamDataHTML += "<p>Coach: " + teamData.team_coach + "</p>";
        teamDataHTML += "</div>";
        teamDataHTML += "</div>";
        teamDataHTML += "<hr class='full-width-line'>"; // Horizontal line
        teamDataHTML += "<div class='team-players'>";
        teamDataHTML += "<h3>Players:</h3>";
        if (playersData.length > 0) {
          teamDataHTML += "<ul class='players-list'>";
          playersData.forEach(function (player) {
            teamDataHTML += "<li>" + player.player_name + ", " + player.player_age + ", " + player.player_country + "</li>";
          });
          teamDataHTML += "</ul>";
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
