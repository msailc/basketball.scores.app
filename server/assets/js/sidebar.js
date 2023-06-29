$(document).ready(function() {
  $(".sidebar").on("click", ".sidebar-items-li", function() {
    const itemText = $(this).text();

    if (itemText === "Home") {
      loadContent("http://localhost/localbb/server/rest/matches", function(response) {
        displayMatches(response);
        // Add filter by league
        $(".content").html(function() {
          return `
            <div class="filter-container">
              <label for="league-filter">Filter by League:</label>
              <select id="league-filter">
                <option value="">All</option>
                <option value="1">NBA</option>
                <option value="2">Euroleague</option>
                <option value="3">ABA League</option>
              </select>
            </div>
            <ul class="matches-list"></ul>
          `;
        });

        $("#league-filter").change(function() {
          var selectedLeagueId = $(this).val();
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
    } else if (itemText === "Teams") {
      loadContent("http://localhost/localbb/server/rest/teams", function(response) {
        displayTeams(response);
      });
    } else if (itemText === "News") {
      loadContent("http://localhost/localbb/server/rest/news", function(response) {
        $(".content").html(JSON.stringify(response));
      });
    }
  });
});
