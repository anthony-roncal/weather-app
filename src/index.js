import './style.css';
import viewCont from './viewController';

let history = [];
const lat = '34.05';
const lon = '-118.24';
const apiKey = 'c729b929766b1a310c84b9b8b3c972dc';
const viewController = viewCont(history);

async function getWeatherByCity(city) {
    let index = history.length;
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    let data = await response.json();
    
    let result = {
        "city": data.name,
        "tempF": convertKToF(data.main.temp),
        "maxF": convertKToF(data.main.temp_max),
        "minF": convertKToF(data.main.temp_min),
        "tempC": convertKToC(data.main.temp),
        "maxC": convertKToC(data.main.temp_max),
        "minC": convertKToC(data.main.temp_min),
        "weather": data.weather[0].main,
        "description": data.weather[0].description,
    };
    history[index] = result;
    console.log(`City: ${result.city}
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

/* -- DUMMY DATA -- */
async function addDummyData() {
    await getWeatherByCity('Los Angeles');
    await getWeatherByCity('Torrance');
    await getWeatherByCity('Hawthorne');
    await getWeatherByCity('Fountain Valley');
    console.log(history);
}

addDummyData();