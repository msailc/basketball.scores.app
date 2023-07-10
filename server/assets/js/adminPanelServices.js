$(document).ready(function() {
  loadItems("rest/teams", "#teams-list");
  loadItems("rest/players", "#players-list");
  loadItems("rest/news", "#news-list");

  function loadItems(url, listId) {
    loadContent(url, function(response) {
      var itemList = createItemList(response);
      $(listId).html(itemList);
    });
  }

  function createItemList(items) {
    var itemList = $("<ul>").addClass("item-list");
    items.forEach(function(item) {
      var itemId = item.id;
      var itemName = item.team_name || item.player_name || item.news_title;
      var listItem = $("<li>").addClass("item-list-item");
      var nameContainer = $("<div>").addClass("item-name").text(itemName);
      var options = createOptions(itemId);
      listItem.append(nameContainer, options);
      itemList.append(listItem);
    });
    return itemList;
  }

  function createOptions(itemId) {
    var options = $("<div>").addClass("item-options");
    var deleteOption = $("<span>").addClass("option").text("Delete");
    options.append( deleteOption);



    deleteOption.click(function() {
      var deleteUrl;
      var itemType;

      if ($("#teams-list").has($(this)).length) {
        deleteUrl = "rest/teams/" + itemId;
        itemType = "team";
      } else if ($("#players-list").has($(this)).length) {
        deleteUrl = "rest/players/" + itemId;
        itemType = "player";
      } else if ($("#news-list").has($(this)).length) {
        deleteUrl = "rest/news/" + itemId;
        itemType = "news";
      }

      deleteItem(deleteUrl, itemType);
      $(this).closest(".item-list-item").remove(); 
    });


    return options;
  }


  function deleteItem(url, itemType) {
    $.ajax({
      url: url,
      type: "DELETE",
      success: function(response) {
        console.log(itemType + " deleted successfully");
      },
      error: function(error) {
        console.log("Failed to delete " + itemType + ":", error);
      }
    });
  }
  function loadTeams() {
    loadContent("rest/teams", function(response) {
      var teamDropdown = $("#player-team-id"); 
      teamDropdown.empty(); 

      response.forEach(function(team) {
        var option = $("<option>").attr("value", team.id).text(team.team_name);
        teamDropdown.append(option);
      });
    });
  }

  loadTeams();


  function loadLeagues() {
    var leagueDropdown = $("#team-league-id"); 
    leagueDropdown.empty(); 
  
    var leagues = [
      { id: 1, name: "NBA" },
      { id: 2, name: "Euroleague" },
      { id: 3, name: "ABA League" }
    ];
  
    leagues.forEach(function(league) {
      var option = $("<option>").attr("value", league.id).text(league.name);
      leagueDropdown.append(option);
    });
  }
  
  loadLeagues();
  

  function randomId() {
    return Math.floor(Math.random() * 10000) + 1;
  }

  $("#create-team-form").submit(function(event) {
    event.preventDefault();
    var createData = {
      id : randomId(),
      team_name: $("#team-name").val(),
      team_country: $("#team-country").val(),
      league_id: $("#team-league-id").val(),
      team_coach: $("#team-coach").val()
    };
    createItem("rest/teams", createData, "team");
    $(this).trigger("reset");
  });

  $("#create-player-form").submit(function(event) {
    event.preventDefault();
    var createData = {
      id: randomId(),
      player_name: $("#player-name").val(),
      player_country: $("#player-country").val(),
      player_age: $("#player-age").val(),
      team_id: $("#player-team-id").val() 
    };
    createItem("rest/players", createData, "player");
    $(this).trigger("reset");
  });

  $("#create-news-form").submit(function(event) {
    event.preventDefault();
    var createData = {
      id : randomId(),
      news_title: $("#news-title").val(),
      news_content: $("#news-content").val()
    };
    createItem("rest/news", createData, "news");
    $(this).trigger("reset");
  });

  function createItem(url, data, itemType) {
    var token = localStorage.getItem("token");

    $.ajax({
      url: url,
      type: "POST",
      data: data,
      headers: {
        Authorization: token
      },
      success: function(response) {
        console.log(itemType + " created successfully:", response);
        loadItems(url, "#" + itemType + "s-list"); 
      },
      error: function(error) {
        console.log("Failed to create " + itemType + ":", error);
      }
    });
  }
});
