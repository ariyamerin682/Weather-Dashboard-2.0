let map = null;
let currentMarker = null;

export function initMap() {
    console.log('Initializing map...');
    
    const mapContainer = document.getElementById('background-map');
    if (!mapContainer) {
        console.error('Map container not found!');
        return;
    }
    
    map = L.map('background-map').setView([20, 0], 2);
    
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; CartoDB',
        subdomains: 'abcd',
        minZoom: 1,
        maxZoom: 19
    }).addTo(map);
    
    console.log('Map initialized successfully!');
}

export function showLoading(resultDiv) {
    resultDiv.hidden = false;
    resultDiv.innerHTML = `
        <div class="loading-container">
            <div class="spinner"></div>
            <p>🌤️ Fetching weather data...</p>
        </div>
    `;
}

export function showEmptyState(resultDiv) {
    resultDiv.hidden = false;
    resultDiv.innerHTML = `
        <div class="empty-state">
            <div class="icon">🔍</div>
            <h3>Search for a city</h3>
            <p>Enter a city name above to see current weather conditions and location on the map.</p>
            <p style="margin-top: 10px; font-size: 14px; color: #aaa;">
                Try: London, Tokyo, New York, Paris, Sydney
            </p>
        </div>
    `;
}
export function showError(resultDiv, error) {
    resultDiv.hidden = false;

    let icon = '⚠️';
    let title = 'Something went wrong';
    let details = error.message || 'Unknown error';
    let suggestions = '';
    
    if (error.message && error.message.includes('not found')) {
        icon = '❓';
        title = 'City not found';
        suggestions = `
            <p class="suggestions">
                💡 Try: 
                <span data-city="London">London</span>
                <span data-city="Tokyo">Tokyo</span>
                <span data-city="New York">New York</span>
                <span data-city="Paris">Paris</span>
                <span data-city="Sydney">Sydney</span>
            </p>
        `;
    } else if (error.message && error.message.includes('API key')) {
        icon = '🔑';
        title = 'API Key Error';
        details = 'Please add a valid OpenWeatherMap API key';
        suggestions = `
            <p class="suggestions">
                💡 Get a free key at <a href="https://openweathermap.org/api" target="_blank">OpenWeatherMap</a>
            </p>
        `;
    } else if (error.message && error.message.includes('network')) {
        icon = '📡';
        title = 'Network Error';
        details = 'Please check your internet connection';
        suggestions = `
            <p class="suggestions">
                💡 Make sure you're connected to the internet and try again
            </p>
        `;
    } else if (error.message && error.message.includes('404')) {
        icon = '🔍';
        title = 'City Not Found';
        details = `"${error.city || 'City'}" doesn't exist in our database`;
        suggestions = `
            <p class="suggestions">
                💡 Check spelling or try a different city
            </p>
        `;
    } else {
        icon = '⚠️';
        title = 'Oops!';
        details = error.message || 'An unexpected error occurred';
    }
    
    resultDiv.innerHTML = `
        <div class="error-state">
            <div class="icon">${icon}</div>
            <h3>${title}</h3>
            <p>${details}</p>
            ${suggestions}
            <button onclick="location.reload()" style="margin-top: 15px; padding: 8px 20px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">
                🔄 Try Again
            </button>
        </div>
    `;
    
    document.querySelectorAll('[data-city]').forEach(el => {
        el.addEventListener('click', () => {
            document.getElementById('city-input').value = el.textContent;
            document.getElementById('search-form').dispatchEvent(new Event('submit'));
        });
    });
}
export function displayWeather(weatherData, resultDiv) {
    if (!weatherData) {
        console.error('❌ No weather data to display');
        showError(resultDiv, 'No weather data available');
        return;
    }
    
    if (!resultDiv) {
        console.error('❌ resultDiv is null');
        return;
    }
    
    // Safety checks for each property
    const name = weatherData.name || 'Unknown';
    const temp = weatherData.temp || '--';
    const feelsLike = weatherData.feelsLike || '--';
    const humidity = weatherData.humidity || '--';
    const windSpeed = weatherData.windSpeed || '--';
    const condition = weatherData.condition || 'Unknown';
    const iconCode = weatherData.iconCode || '01d';
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    
    console.log('📊 Displaying weather for:', name);
    
    // Update map if coordinates exist
    if (map && weatherData.lat && weatherData.lon) {
        map.setView([weatherData.lat, weatherData.lon], 10);
        if (currentMarker) {
            map.removeLayer(currentMarker);
        }
        currentMarker = L.marker([weatherData.lat, weatherData.lon])
            .addTo(map)
            .bindPopup(`<b>${name}</b><br>${condition}<br>${temp}°C`)
            .openPopup();
    }
    
    // Display the weather
    resultDiv.innerHTML = `
        <div class="weather-card" style="animation: fadeInUp 0.5s ease-out;">
            <h2 style="font-size: 28px; margin-bottom: 5px;">${name}</h2>
            <p style="color: #888; margin-bottom: 15px;">${weatherData.country || ''}</p>
            
            <div style="display: flex; align-items: center; justify-content: center; gap: 20px; margin-bottom: 15px;">
                <img src="${iconUrl}" alt="${condition}" style="width: 80px; height: 80px;">
                <div>
                    <div style="font-size: 48px; font-weight: bold;">${temp}°C</div>
                    <div style="font-size: 18px; color: #666;">${condition}</div>
                </div>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 10px; margin-top: 15px;">
                <div style="background: #f7f7f7; padding: 12px; border-radius: 8px;">
                    <div style="font-size: 12px; color: #888;">Feels Like</div>
                    <div style="font-size: 18px; font-weight: bold;">${feelsLike}°C</div>
                </div>
                <div style="background: #f7f7f7; padding: 12px; border-radius: 8px;">
                    <div style="font-size: 12px; color: #888;">💧 Humidity</div>
                    <div style="font-size: 18px; font-weight: bold;">${humidity}%</div>
                </div>
                <div style="background: #f7f7f7; padding: 12px; border-radius: 8px;">
                    <div style="font-size: 12px; color: #888;">💨 Wind</div>
                    <div style="font-size: 18px; font-weight: bold;">${windSpeed} m/s</div>
                </div>
            </div>
            
            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #eee; font-size: 13px; color: #999;">
                Last updated: ${new Date().toLocaleTimeString()}
            </div>
        </div>
    `;
}
function getWeatherEmoji(condition) {
    const lower = condition.toLowerCase();
    if (lower.includes('clear') || lower.includes('sunny')) return '☀️';
    if (lower.includes('cloud')) return '☁️';
    if (lower.includes('rain') || lower.includes('drizzle')) return '🌧️';
    if (lower.includes('thunder') || lower.includes('storm')) return '⛈️';
    if (lower.includes('snow')) return '❄️';
    if (lower.includes('mist') || lower.includes('fog')) return '🌫️';
    return '🌤️';
}