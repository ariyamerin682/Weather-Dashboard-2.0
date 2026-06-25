import { fetchWeather } from './api.js';
import { displayWeather, showLoading, showError, showEmptyState, initMap } from './ui.js';
import { getRecentSearches, getPopularCities } from './api-client.js';

console.log('🚀 Weather App loaded');

// ... your existing code ...

// Handle form submission
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const city = cityInput.value.trim();
    console.log('🔍 Searching for:', city);
    
    if (!city) {
        showError(resultDiv, 'Please enter a city name');
        return;
    }
    
    showLoading(resultDiv);
    
    try {
        // Fetch weather from API
        const weatherData = await fetchWeather(city);
        console.log('✅ Weather data received:', weatherData);
        
        // Display the weather
        displayWeather(weatherData, resultDiv);
        
        // Update URL
        window.history.pushState({ city }, '', `?city=${encodeURIComponent(city)}`);
        
    } catch (error) {
        console.error('❌ Error:', error);
        showError(resultDiv, error.message);
    }
});

// ... rest of your code ...