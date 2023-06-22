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
  