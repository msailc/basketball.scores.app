function displayMatches(matches) {
  var listHTML = "<ul class='matches-list'>";

  matches.forEach(function(match) {
    listHTML += "<li>";
    listHTML += "<div>";
    listHTML += "<p><strong>Date & Time:</strong> " + match.date_time + "</p>";
    listHTML += "<p><strong>Location:</strong> " + match.location + "</p>";
    listHTML += "</div>";
    listHTML += "<p class='teams'>Dummy Home Team vs Dummy Away Team</p>";
    listHTML += "</li>";
  });

  listHTML += "</ul>";

  $(".content").html(listHTML);
}
