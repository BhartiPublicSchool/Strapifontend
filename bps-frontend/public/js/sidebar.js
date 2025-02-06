
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