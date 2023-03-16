import './style.css';
import viewCont from './viewController';

const API_KEY = `${process.env.REACT_APP_API_KEY}`;

let history = [];
const viewController = viewCont(history);

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

document.querySelector('.search > button').addEventListener('click', function() {
    let searchInput = document.getElementById('search');
    if(searchInput.value) {
        getWeatherByCity(searchInput.value);
    }
    searchInput.value = '';
})

async function getWeatherByCity(city) {
    let index = history.length;
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
    let data = await response.json();
    
    let result = {
        "city": data.name,
        "timestamp": getDateTime(),
        "tempF": convertKToF(data.main.temp),
        "maxF": `High ${convertKToF(data.main.temp_max)}`,
        "minF": `Low ${convertKToF(data.main.temp_min)}`,
        "tempC": convertKToC(data.main.temp),
        "maxC": `High ${convertKToC(data.main.temp_max)}`,
        "minC": `Low ${convertKToC(data.main.temp_min)}`,
        "weather": data.weather[0].main,
        "description": data.weather[0].description,
    };
    history[index] = result;
    console.log(`City: ${result.city}\nTimestamp: ${result.timestamp}
        \nTemp in F: ${result.tempF}\nF Max: ${result.maxF}\nF Min: ${result.minF}
        \nTemp in C: ${result.tempC}\nC Max: ${result.maxC}\nC Min: ${result.minC}
        \nWeather: ${result.weather}\nDescription: ${result.description}`
    );

    viewController.updateHistory();
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

/* -- DUMMY DATA -- */
// async function addDummyData() {
//     await getWeatherByCity('Los Angeles');
//     await getWeatherByCity('Torrance');
//     await getWeatherByCity('Hawthorne');
//     await getWeatherByCity('Fountain Valley');
//     console.log(history);
// }
// addDummyData();