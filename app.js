let appId = '07d5dee25538408b2486c4db06bc3780';
let units = 'metric';
let searchMethod;

function getSearchMethod(cityName) {
    if (cityName.length === 5 && Number.parseInt(cityName) + '' === cityName)
        searchMethod = 'zip';
    else
        searchMethod = 'q';
}

function searchWeather(cityName) {
    getSearchMethod(cityName);
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${cityName}&APPID=${appId}&units=${units}`).then(result => {
        return result.json();
    }).then(result => {
        init(result);
    })
}

function init(resultFromServer) {

    switch (resultFromServer.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage = 'url("morning.jpg")';
            document.getElementById('box').style.backgroundColor = 'transparent")';
            break;
        case 'Clouds':
            document.body.style.backgroundImage = 'url("morning.jpg")';
            document.getElementById('box').style.backgroundColor = 'transparent")';
            break;

        case 'Rain':
        case 'Drizzle':
        case 'Mist':
            document.body.style.backgroundImage = 'url("morning.jpg")';
            document.getElementById('box').style.backgroundColor = 'transparent")';
            break;

        case 'Thunderstorm':
            document.body.style.backgroundImage = 'url("morning.jpg")';
            document.getElementById('box').style.backgroundColor = 'transparent")';
            break;

        case 'Snow':
            document.body.style.backgroundImage = 'url("morning.jpg")';
            document.getElementById('box').style.backgroundColor = 'transparent")';
            break;

        default:
            break;
    }

    //humidity
    let humidityElement = document.getElementById('humidity');
    humidityElement.innerHTML = resultFromServer.main.humidity + ' %';

    //windspeed
    let kmPH = document.getElementById('windSpeed');
    kmPH.innerHTML = Math.floor(resultFromServer.wind.speed);
    let kmPerHour = Number(((Math.floor(resultFromServer.wind.speed)) * 18 / 5));
    kmPH.innerHTML = kmPerHour + "  km/h";

    //temperature
    let temperatureElement = document.getElementById('temperature');
    temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + ' °C';


    //METRIC
    document.getElementById('met').addEventListener('click', () => {
        temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + ' °C';
        let kmPerHour = Number(((Math.floor(resultFromServer.wind.speed)) * 18 / 5));
        kmPH.innerHTML = kmPerHour + "  km/h";

    })
    // IMPERIAL
    document.getElementById('imp').addEventListener('click', () => {
        let fahrenHeit = Number(((Math.floor(resultFromServer.main.temp)) * 9 / 5) + 32);
        temperatureElement.innerHTML = fahrenHeit + " F";

        kmPH.innerHTML = Math.floor(resultFromServer.wind.speed) + ' m/s';
    })

    //city name
    let cityElement = document.getElementById('city');
    cityElement.innerHTML = resultFromServer.name;

    //description
    let descElement = document.getElementById('weatherDesc');
    let finalDesc = resultFromServer.weather[0].description;
    descElement.innerText = finalDesc.toUpperCase();

    //icons
    let iconElement = document.getElementById('weatherIcon');
    iconElement.src = 'http://openweathermap.org/img/wn/' + resultFromServer.weather[0].icon + '.png';

    position();

}

function position() {

    let boxy = document.getElementById('box');
    let boxWidth = boxy.clientWidth;
    let boxHeight = boxy.clientHeight;

    boxy.style.left = `calc(50%- ${boxWidth / 2}px)`;
    boxy.style.top = `calc(50%- ${boxHeight / 1.3}px)`;
    boxy.style.visibility = 'visible';
}

document.getElementById('button').addEventListener('click', () => {
    let cityName = document.getElementById('location').value;
    if (cityName)
        searchWeather(cityName);
})