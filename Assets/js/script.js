var searchForm = document.querySelector('#search-form');
var searchInput = document.querySelector('#search-input');
var errorMessage = document.querySelector('#error');
var currentTemp = document.querySelector('#current-temp-container');

function handleSearchFormSubmit(event) {
    event.preventDefault();

    var searchInputVal= searchInput.value.trim();

    if (searchInputVal) {
        getWeatherData(searchInputVal)
        console.log("work");
        searchInputVal.textContent = '';
        searchInput.removeAttribute('class');
        errorMessage.style.display = 'none';
    } else {
        searchInput.setAttribute('class', 'error-box');
        errorMessage.style.display = 'block';
    }
};

function getWeatherData(city) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city.toLowerCase() + '&appid=9382f6da9ce61a40176360cba8a34a63&units=metric'
    console.log(apiUrl);

    fetch(apiUrl)
        .then(function (response) {
            console.log(response);
            if (response.ok) {
                response.json().then(function (data) {
                    displayWeather(data);
                });
            } else {
                currentTemp.textContent = '';

                var errorCityName = document.createElement('p');
                errorCityName.textContent = "Weather data cannot be found for " + city;
                currentTemp.appendChild(errorCityName);
            }
        })
        .catch(function (error) {
            var errorCityName = document.createElement('p');
            errorCityName.textContent = "Unable to connect to Open Weather App";
            currentTemp.appendChild(errorCityName);
        })
}

function displayWeather(weather) {
    console.log(weather);
    currentTemp.textContent = '';
    var day = moment().format('DD-MM-YYYY');

    var cityName = document.createElement('p');
    cityName.textContent = "Current Temp for " + weather.name + " " + "(" + day + ")";
    currentTemp.appendChild(cityName);

    var currTemp = document.createElement('p');
    currTemp.textContent = weather.main.temp;
    console.log(currTemp);
    currentTemp.appendChild(currTemp);

};

searchForm.addEventListener('submit', handleSearchFormSubmit);