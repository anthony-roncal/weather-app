import './style.css';
import viewCont from './viewController';

const API_KEY = `${process.env.REACT_APP_API_KEY}`;

let history = [];
const viewController = viewCont(history);
let currentUnit = '°F';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

document.querySelectorAll('.unit-toggle > span').forEach(item => item.addEventListener('click', toggleUnits));

document.querySelector('.search-container > button').addEventListener('click', function() {
    let searchInput = document.getElementById('search');
    if(searchInput.value) {
        getWeatherByCity(searchInput.value);
    }
    searchInput.value = '';
})

async function getWeatherByCity(city) {
    try {
        viewController.toggleLoader();
        let index = history.length;
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
        let data = await response.json();

        let weather = data.weather[0].main;
        let gifResponse = await fetch('https://api.giphy.com/v1/gifs/translate?api_key=NrETc2GEnxjH8HpSxz3ZizWPp7eJc6HA&s=' + weather, {mode: 'cors'});
        const gifData = await gifResponse.json();
        viewController.displayGif(gifData.data.images.original.url);
        
        viewController.toggleLoader();
        let result = {
            "city": data.name,
            "timestamp": getDateTime(),
            "tempF": convertKToF(data.main.temp),
            "maxF": `High ${convertKToF(data.main.temp_max)}`,
            "minF": `Low ${convertKToF(data.main.temp_min)}`,
            "tempC": convertKToC(data.main.temp),
            "maxC": `High ${convertKToC(data.main.temp_max)}`,
            "minC": `Low ${convertKToC(data.main.temp_min)}`,
            "weather": weather,
            "description": data.weather[0].description,
        };
        history[index] = result;
        viewController.updateHistory(currentUnit);
    } catch (error) {
        console.log(error);
        viewController.toggleLoader();
    }
}

function convertKToF(temp) {
    return Math.round((1.8 * (temp - 273)) + 32);
}

function convertKToC(temp) {
    return Math.round(temp - 273.15);
}

function getDateTime() {
    let currentDateTime = new Date();
    let hours = (currentDateTime.getHours() > 12) ? currentDateTime.getHours() - 12 : currentDateTime.getHours();
    let AmPm = (currentDateTime.getHours() > 12) ? 'PM' : 'AM';
    return `${months[currentDateTime.getMonth()]} ${currentDateTime.getDate()} at ${hours}:${currentDateTime.getMinutes()}${AmPm}`;
}

function toggleUnits() {
    (currentUnit === '°F') ? currentUnit = '°C' : currentUnit = '°F';
    viewController.toggleUnits(currentUnit);
}