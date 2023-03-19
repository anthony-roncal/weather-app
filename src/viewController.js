export default function viewController(history) {
    const container = document.querySelector('.container');
    const historyList = document.querySelector('.history');
    const loader = document.querySelector('.loader');
    const search = document.querySelectorAll('.search');

    function updateHistory(unit) {
        Array.from(historyList.children).forEach(item => historyList.removeChild(item));
        for(const item of history) {
            const city = document.createElement('p');
            city.classList.add('city');
            city.textContent = item.city;

            const timestamp = document.createElement('p');
            timestamp.classList.add('timestamp');
            timestamp.textContent = item.timestamp;
            
            const tempF = document.createElement('p');
            tempF.classList.add('mainTemp');
            tempF.textContent = `${item.tempF}°F`;

            const maxF = document.createElement('p');
            maxF.classList.add('maxTemp');
            maxF.textContent = `${item.maxF}°F`;
            
            const minF = document.createElement('p');
            minF.classList.add('minTemp');
            minF.textContent = `${item.minF}°F`;

            const tempC = document.createElement('p');
            tempC.classList.add('mainTemp');
            tempC.textContent = `${item.tempC}°C`;

            const maxC = document.createElement('p');
            maxC.classList.add('maxTemp');
            maxC.textContent = `${item.maxC}°C`;

            const minC = document.createElement('p');
            minC.classList.add('minTemp');
            minC.textContent = `${item.minC}°C`;

            const weather = document.createElement('p');
            weather.classList.add('weather');
            weather.textContent = item.weather;

            const description = document.createElement('p');
            description.classList.add('description');
            description.textContent = item.description;

            const historyItem = document.createElement('li');
            historyItem.classList.add('history-item');
            (unit === '°F') ? 
                historyItem.append(city, weather, tempF, maxF, minF, timestamp, description) : 
                historyItem.append(city, weather, tempC, maxC, minC, timestamp, description);

            if(historyList.children.length > 0) {
                historyList.firstChild.classList.toggle('first');
            }
            historyItem.classList.toggle('first');
            historyList.insertBefore(historyItem, historyList.firstChild);
        }

        if(history.length > 1) {
            const historyLabel = document.createElement('p');
            historyLabel.classList.add('history-label');
            historyLabel.textContent = 'Search history';
            historyList.insertBefore(historyLabel, historyList.firstChild.nextSibling);
        }
    }

    function toggleUnits(currentUnit) {
        document.querySelectorAll('.unit-toggle > span').forEach(item => item.classList.toggle('current-unit'));
        updateHistory(currentUnit);
    }

    function toggleLoader() {
        loader.classList.toggle('hidden');
        search.forEach(element => element.classList.toggle('hidden'));
    }

    function displayGif(gifSrc) {
        let gif = document.querySelector('img');
        gif.src = gifSrc;
        // container.insertBefore(gif, historyList);
    }

    return {
        updateHistory,
        toggleUnits, 
        toggleLoader,
        displayGif
    }
};