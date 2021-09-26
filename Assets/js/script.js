var searchForm = document.querySelector('#search-form');
var searchInput = document.querySelector('#search-input');
var errorMessage = document.querySelector('#error');
var currentTemp = document.querySelector('#current-temp-container');
var forecastContainer = document.querySelector('#forecast-temp-container');

function handleSearchFormSubmit(event) {
    event.preventDefault();

    var searchInputVal= searchInput.value.trim();

    if (searchInputVal) {
        getWeatherData(searchInputVal);
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
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city.toLowerCase() + '&appid=b4bd9de6b2c738f8f298aed24a79827e&units=metric'
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
};

function displayWeather(weather) {
    console.log(weather);
    currentTemp.textContent = '';
    var day = moment(weather.dt.value).format('DD-MM-YYYY');
    console.log(weather.weather.icon);
    

    var cityName = document.createElement('h3');
    cityName.textContent = "Current Temp for " + weather.name + " " + "(" + day + ") ";
    cityName.setAttribute('class', 'poppins ');
    currentTemp.appendChild(cityName);

    var weatherImage = document.createElement('img');
    weatherImage.src = 'http://openweathermap.org/img/wn/' + weather.weather[0].icon + '@2x.png'
    cityName.appendChild(weatherImage);

    var currTemp = document.createElement('p');
    currTemp.textContent = 'Temperature: ' + weather.main.temp + '\u00B0C';
    console.log(currTemp);
    currentTemp.appendChild(currTemp);

    var currWind = document.createElement('p');
    currWind.textContent = 'Wind: ' + weather.wind.speed + " m/sec";
    console.log(currWind);
    currentTemp.appendChild(currWind);

    var currHumid = document.createElement('p');
    currHumid.textContent = 'Humidity: ' + weather.main.humidity + "%";
    console.log(currHumid);
    currentTemp.appendChild(currHumid);

    var lat = weather.coord.lat;
    var lon = weather.coord.lon;

    getUvIndex(lat,lon);
    
};

function getUvIndex(lat,lon) {
    console.log(lat, lon);
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&appid=b4bd9de6b2c738f8f298aed24a79827e&units=metric";
    console.log(apiUrl);

    fetch(apiUrl)
        .then(function (response) {
            console.log(response);
            if (response.ok) {
                response.json().then(function (data) {
                    displayUvIndex(data);
                    displayForecast(data);
                });
            };
        });
};

function displayUvIndex(weather) {
    var currUvIndex = document.createElement('p');
    currUvIndex.textContent = "UV Index: ";
    currentTemp.appendChild(currUvIndex);

    currUvIndexVal = document.createElement('span');
    currUvIndexVal.textContent = weather.current.uvi;
    
    if (weather.current.uvi <= 2) {
        currUvIndexVal.setAttribute("class", "low");
    } else if (weather.current.uvi > 2 || weather.current.uvi < 6) {
        currUvIndexVal.setAttribute("class", "moderate");
    } else {
        currUvIndexVal.setAttribute("class", "high");
    }

    currUvIndex.appendChild(currUvIndexVal);
};

function displayForecast(forecast) {
    forecastContainer.textContent = '';
    for (i=1; i < 6; i++) {
        var forecastDay = document.createElement('div');
        forecastDay.setAttribute('class', 'col-2 mt-3')
        
        var forecastContent = forecast.daily[i];
        var date = moment.unix(forecastContent.dt).format('DD/MM/YYYY');
        // console.log(date);
        var forecastDate = document.createElement('h4');
        forecastDate.textContent = date + " ";
        forecastDay.appendChild(forecastDate);

        var weatherImage = document.createElement('img');
        weatherImage.src = 'http://openweathermap.org/img/wn/' + forecastContent.weather[0].icon + '@2x.png'
        forecastDay.appendChild(weatherImage);

        var forecastTemp = document.createElement('p');
        forecastTemp.textContent = 'Temp: ' + forecastContent.temp.max + '\u00B0C';
        forecastDay.appendChild(forecastTemp);

        var forecastWind = document.createElement('p');
        forecastWind.textContent = 'Wind: ' + forecastContent.wind_speed + 'm/sec';
        forecastDay.appendChild(forecastWind);

        var forecastHumidity = document.createElement('p');
        forecastHumidity.textContent = 'Humidity: ' + forecastContent.humidity + '%';
        forecastDay.appendChild(forecastHumidity);

        forecastContainer.appendChild(forecastDay);
    }
};


searchForm.addEventListener('submit', handleSearchFormSubmit);