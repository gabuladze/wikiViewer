var searchForm = $("#searchForm");
var input = $("#input");
var articlesDiv = $("#articles");

function getArticles() {
  if (input.val().length === 0) return;
  $.ajax({
    headers: {
      contentType: "application/json; charset=utf-8",
    },
    type: "GET",
    url: "//en.wikipedia.org/w/api.php",
    data: { action: 'query',
            list: 'search',
            srsearch: input.val(),
            srprop: 'sectiontitle|snippet',
            format: 'json' },
    dataType: "jsonp",
    jsonp: 'callback',

    success: function(data) {
      articlesDiv.empty();
      var articles = data.query.search;
      for (var i = 0; i < articles.length; i++) {
        var articleURL = "https://en.wikipedia.org/wiki/"+articles[i].title;

        var row = "<a target='_blank' href='"+articleURL
        +"'><li><h4><strong>"+articles[i].title+"</strong></h4>"+
        articles[i].snippet+
        "</li></a>";
        articlesDiv.append(row);
      }
    }
  });
}

$(document).ready(function() {
  searchForm.on("submit", function(event) {
    event.preventDefault();
    $.ajax({
      url: window.location.pathname,
      type: 'GET',
      data: $(this).serialize(),
      success: getArticles(),
    });
  });
});
