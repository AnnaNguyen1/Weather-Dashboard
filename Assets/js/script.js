var searchForm = document.querySelector('#search-form');
var searchInput = document.querySelector('#search-input');
var errorMessage = document.querySelector('#error');

function handleSearchFormSubmit(event) {
    event.preventDefault();

    var searchInputVal= searchInput.value.trim();

    if (searchInputVal) {
        getWeatherData(searchInputVal)
        console.log("work");
        searchInputVal.textContent = '';
    } else {
        searchInput.setAttribute('class', 'error-box');
        errorMessage.style.display = 'block';
    }
};

function removeError() {
        searchInput.removeAttribute('class');
        errorMessage.style.display = 'none';
}
    

searchForm.addEventListener('submit', handleSearchFormSubmit);
searchInput.addEventListener('keyup', removeError())