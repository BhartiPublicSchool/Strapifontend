
function openSearchBar() {
    document.getElementById("searchBar").style.height = "100%";
}

function closeSearchBar() {
    document.getElementById("searchBar").style.height = "0%";
}

function openNav() {
    console.log("open sidenav");
    document.getElementById("mySidenav").style.width = "100%";
}
function gotoTop() {
    window.scroll({
        behavior: 'smooth',
        left: 0,
        top: 0
    });

}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

window.onscroll = function () {
    stickyHeader()
};

  // Get the header

//   console.log(window.pageYOffset);
  // Get the offset position of the navbar
  var videoContent = document.getElementById('top_fold');
  var header = document.getElementById("myHeader");
  var sticky = (videoContent && videoContent.offsetHeight) || 500;

  // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
  function stickyHeader() {
   
  
      if (window.pageYOffset > sticky) {
          header.classList.remove("header-out");
          header.classList.add("sticky");
      } else {
          header.classList.remove("sticky");
          header.classList.add("header-out");
      }
  }