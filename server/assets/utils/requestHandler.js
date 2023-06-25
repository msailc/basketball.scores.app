function loadContent(url, callback) {
    $.ajax({
      url: url,
      method: "GET",
      dataType: "json",
      success: function(response) {
        callback(response);
      },
      error: function(errorThrown) {
        console.log("Error:", errorThrown);
        $(".content").html("<p>Error loading content.</p>");
      }
    });
  }