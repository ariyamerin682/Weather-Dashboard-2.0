import { fetchWeather } from './api.js';
import { displayWeather, showLoading, showError, showEmptyState, initMap } from './ui.js';
console.log('🚀 Weather App loaded');
const form = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const resultDiv = document.getElementById('result');
console.log('🔍 Form:', form);
console.log('📝 Input:', cityInput);
console.log('📦 Result:', resultDiv);
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM ready, initializing map...');
    initMap();
    if (resultDiv) {
        showEmptyState(resultDiv);
    }
    if (cityInput) {
        cityInput.focus();
    }
});
if (form && cityInput && resultDiv) {
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
            const weatherData = await fetchWeather(city);
            console.log('✅ Weather data received:', weatherData);
            displayWeather(weatherData, resultDiv);
            window.history.pushState({ city }, '', `?city=${encodeURIComponent(city)}`);
            
        } catch (error) {
            console.error('❌ Error:', error);
            showError(resultDiv, error);
        }
    });
}
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && cityInput) {
        cityInput.value = '';
        cityInput.focus();
        if (resultDiv) {
            showEmptyState(resultDiv);
        }
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const cityParam = params.get('city');
    if (cityParam && form) {
        cityInput.value = cityParam;
        form.dispatchEvent(new Event('submit'));
    }
});
console.log('✅ Weather Dashboard Ready!');
console.log('💡 Tips:');
console.log('  - Type a city name and press Enter');
console.log('  - Press ESC to clear the search');
