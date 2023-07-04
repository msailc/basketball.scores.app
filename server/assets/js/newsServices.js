function displayNews(newsData) {
    $(".content").html(function() {
      let newsCards = `
        <div class="search-bar">
          <input type="text" id="search-input" placeholder="Search news...">
          <button id="search-button">Search</button>
        </div>
        <div class="card-container">`;
    
      for (const newsItem of newsData) {
        newsCards += `
          <div class="card">
            <h3 class="card-title">${newsItem.news_title}</h3>
            <p class="card-content">${newsItem.news_content}</p>
            <p class="card-date">${formatDate(newsItem.news_date)}</p>
          </div>
        `;
      }
    
      newsCards += `</div>`;
      return newsCards;
    });

  $("#search-button").click(function() {
    const searchTerm = $("#search-input").val().toLowerCase();

    $(".card").each(function() {
      const newsTitle = $(this).find(".card-title").text().toLowerCase();
      const newsContent = $(this).find(".card-content").text().toLowerCase();

      if (newsTitle.includes(searchTerm) || newsContent.includes(searchTerm)) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });

  $("#search-input").keyup(function() {
    if ($(this).val() === "") {
      $(".card").show();
    }
  });
  }
  