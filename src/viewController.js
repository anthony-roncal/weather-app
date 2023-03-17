export default function viewController(history) {
    const historyList = document.querySelector('.history');

    function updateHistory(unit) {
        Array.from(historyList.children).forEach(item => historyList.removeChild(item));
        for(const item of history) {
            const city = document.createElement('p');
            city.textContent = item.city;

            const timestamp = document.createElement('p');
            timestamp.textContent = item.timestamp;
            
            const tempF = document.createElement('p');
            tempF.textContent = `${item.tempF}°F`;

            const maxF = document.createElement('p');
            maxF.textContent = `${item.maxF}°F`;
            
            const minF = document.createElement('p');
            minF.textContent = `${item.minF}°F`;

            const tempC = document.createElement('p');
            tempC.textContent = `${item.tempC}°C`;

            const maxC = document.createElement('p');
            maxC.textContent = `${item.maxC}°C`;

            const minC = document.createElement('p');
            minC.textContent = `${item.minC}°C`;

            const weather = document.createElement('p');
            weather.textContent = item.weather;

            const description = document.createElement('p');
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
    }

    function toggleUnits(currentUnit) {
        document.querySelectorAll('.unit-toggle > span').forEach(item => item.classList.toggle('current-unit'));
        updateHistory(currentUnit);
    }

    return {
        updateHistory,
        toggleUnits
    }
};