let searchData = ["BPS", "careers", "academy", "faculty", "teacher", "employment", "job openings", "pride"];

ul = document.getElementById("searchResults");

let render_lists = function (lists) {
  let li = "";
  for (index in lists) {
    li += "<li><a href=\"/\">" + lists[index] + "</a></li>";
  }
  ul.innerHTML = li;
};

// lets filters it
searchbarInput = document.getElementById("searchbarInput");

let filteredSearchResult = function (event) {
  keyword = searchbarInput.value.toLowerCase();

  var filtered_users;
  if (keyword != "") {
    console.log(keyword);
    filtered_users = searchData.filter(function (user) {
      user = user.toLowerCase();
      return user.indexOf(keyword) > -1;
    });
  }

  if (filtered_users && filtered_users.length > 3) {
    render_lists(filtered_users.slice(0, 3));
  } else {
    render_lists(filtered_users);
  }
};

searchbarInput.addEventListener("keyup", filteredSearchResult);
