$(document).ready(function() {
  $(".sidebar").on("click", ".sidebar-items-li", function() {
    const itemText = $(this).text();

    if (itemText === "Home") {
      loadContent("http://localhost/localbb/server/rest/matches", function(response) {
        $(".content").html(function() {
          return `
            <div class="filter-container">
              <div class="filter-row">
                <label for="league-filter">Filter by League:</label>
                <select id="league-filter">
                  <option value="">All</option>
                  <option value="1">NBA</option>
                  <option value="2">Euroleague</option>
                  <option value="3">ABA League</option>
                </select>
              </div>
              <div class="filter-row">
                <label for="team-filter">Filter by Team:</label>
                <select id="team-filter">
                  <option value="">All</option>
                </select>
              </div>
            </div>
            <ul class="matches-list"></ul>
          `;
        });

        displayMatches(response);

        $("#league-filter").change(function() {
          var selectedLeagueId = $(this).val();
          if (selectedLeagueId !== "") {
            loadContent("http://localhost/localbb/server/rest/teams", function(teamsResponse) {
              var filteredTeams = teamsResponse.filter(function(team) {
                return team.league_id == selectedLeagueId;
              });

              var teamFilterOptionsHTML = filteredTeams.map(function(team) {
                return "<option value='" + team.team_name + "'>" + team.team_name + "</option>";
              });

              $("#team-filter").html(teamFilterOptionsHTML);
            });
          } else {
            $("#team-filter").html("<option value=''>All</option>");
          }
        });

        $("#team-filter").change(function() {
          var selectedTeam = $(this).val();
          var selectedLeagueId = $("#league-filter").val();
          var filteredMatches = response.filter(function(match) {
            var leagueMatch = match.league_id == selectedLeagueId;
            var teamMatch = selectedTeam === "" || match.home_team_name === selectedTeam || match.away_team_name === selectedTeam;
            return leagueMatch && teamMatch;
          });
          displayMatches(filteredMatches, selectedTeam);
        });

        $("#league-filter").change(function() {
          var selectedLeagueId = $(this).val();
          var filteredMatches = response.filter(function(match) {
            return selectedLeagueId === "" || match.league_id == selectedLeagueId;
          });
          displayMatches(filteredMatches);
        });
      });
    } else if (itemText === "Teams") {
      loadContent("http://localhost/localbb/server/rest/standings", function(response) {
        displayTeams(response);

        // Add the tabs
        $(".content").html(function() {
          return `
            <div class="tabs">
              <button id="nba-tab">NBA</button>
              <button id="euroleague-tab">Euroleague</button>
              <button id="aba-league-tab">ABA League</button>
            </div>
          `;
        });

        $("#nba-tab").on("click", function() {
          displayTeams(response, 1); 
        });

        $("#euroleague-tab").on("click", function() {
          displayTeams(response, 2); 
        });

        $("#aba-league-tab").on("click", function() {
          displayTeams(response, 3); 
        });

        $("#nba-tab").trigger("click");
      });
    } else if (itemText === "News") {
      loadContent("http://localhost/localbb/server/rest/news", function(response) {
        displayNews(response);
      });
    } else if (itemText === "Sign in") {
      window.location.href = "login.html"; 
    } else if (itemText === "Logout") {
      logout();
    }
  });
});

function logout() {
  // Remove the token from localStorage
  localStorage.removeItem("token");

  // Reload the page
  window.location.href = "index.html";
}
