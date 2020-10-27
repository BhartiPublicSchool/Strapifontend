var searchData = ["BPS", "careers", "academy", "faculty", "teacher", "employment", "job openings", "pride"];

$(document).ready(function (e) {
  $.ajax({
    url: "/search",
    success: function (result) {
      searchData = result;
      console.log(result);
    },
  });
});
ul = document.getElementById("searchResults");

let render_lists = function (lists) {
  let li = "";
  for (index in lists) {
    li += `<li class="bg-light"><div><a href="${lists[index].page}">` + lists[index].keyword + `</a><p>${lists[index].description}</p></div></li>`;
  }
  ul.innerHTML = li;
};

// lets filters it
searchbarInput = document.getElementById("searchbarInput");

let filteredSearchResult = function (event) {
  keyword = searchbarInput.value.toLowerCase();

  var filtered_keywords;
  if (keyword != "") {
    console.log(keyword);
    filtered_keywords = searchData.filter(function (word) {
      data = word.keyword.toLowerCase();
      return data.indexOf(keyword) > -1;
    });
  }

  if (filtered_keywords && filtered_keywords.length > 3) {
    render_lists(filtered_keywords.key.slice(0, 3));
  } else {
    render_lists(filtered_keywords);
  }
};

searchbarInput.addEventListener("keyup", filteredSearchResult);
