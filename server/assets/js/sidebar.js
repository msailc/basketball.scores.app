$(document).ready(function() {
    $(".sidebar-items li").click(function() {
      const itemText = $(this).text();
      
      if (itemText === "Home") {
        loadContent("http://localhost/localbb/server/rest/matches", function(response) {
          displayMatches(response);
        });
      } else if (itemText === "Standings") {
        loadContent("http://localhost/localbb/server/rest/standings", function(response) {
          displayStandings(response);
        });
      } else if (itemText === "Profile") {
        loadContent("http://localhost/localbb/server/rest/teams", function(response) {
          $(".content").html(JSON.stringify(response));
        });
      }
    });
  });
  