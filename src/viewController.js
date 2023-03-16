export default function viewController(history) {
    const historyList = document.querySelector('.history');

    function updateHistory() {
        Array.from(historyList.children).forEach(item => historyList.removeChild(item));
        for(const item of history) {
            const city = document.createElement('p');
            city.textContent = item.city;
            
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
            historyItem.append(city, tempF, maxF, minF, tempC, maxC, minC, weather, description);

            historyList.append(historyItem);
        }
    }

    return {
        updateHistory
    }
};