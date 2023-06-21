$(document).ready(function() {
    // Function to load content using AJAX
    function loadContent(url, callback) {
      $.ajax({
        url: url,
        method: "GET",
        dataType: "json",
        success: function(response) {
          callback(response);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log("Error:", errorThrown);
          $(".content").html("<p>Error loading content.</p>");
        }
      });
    }

    // Function to display matches data as a list
  function displayMatches(matches) {
    var listHTML = "<ul>";
    
    matches.forEach(function(match) {
      listHTML += "<li>";
      listHTML += "<p>Date & Time: " + match.date_time + "</p>";
      listHTML += "<p>Location: " + match.location + "</p>";
      listHTML += "<p>Home Team: " + match.home_team_id + "</p>";
      listHTML += "<p>Away Team: " + match.away_team_id + "</p>";
      listHTML += "</li>";
    });
    
    listHTML += "</ul>";
    
    $(".content").html(listHTML);
  }
  
    // Function to display standings data in a table
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
  