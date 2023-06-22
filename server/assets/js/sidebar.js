$(document).ready(function() {
    // Add click event listener to each sidebar item
    $(".sidebar-items li").click(function() {
      const itemText = $(this).text();
      
      if (itemText === "Home") {
        // Load matches content
        loadContent("http://localhost/localbb/server/rest/matches", function(response) {
          displayMatches(response);
        });
      } else if (itemText === "Standings") {
        // Load standings content
        loadContent("http://localhost/localbb/server/rest/standings", function(response) {
          displayStandings(response);
        });
      } else if (itemText === "Profile") {
        // Load profile content
        loadContent("http://localhost/localbb/server/rest/teams", function(response) {
          $(".content").html(JSON.stringify(response));
        });
      }
    });
  });
  