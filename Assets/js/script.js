var searchForm = document.querySelector("#search-form");
var searchInput = document.querySelector('#search-input');

function handleSearchFormSubmit(event) {
    event.preventDefault();

    var searchInputVal= searchInput.val.trim();

    if (!searchInputVal) {
        var error = document.createElement("p");
        error.textContent = "Please enter a city";
        searchInput.appendChild(error);
    };

    var queryString = './search-results.html?q=' + searchInputVal;
};

searchForm.addEventListener('submit', handleSearchFormSubmit);