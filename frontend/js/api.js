// OpenWeatherMap API
// API Base URL for your backend
const API_BASE = 'http://localhost:5000/api';

// The rest of your code...
const WEATHER_API_KEY = '419f904644f31fd8feb98133c859472f';
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Fetch weather from OpenWeatherMap and save to backend
export async function fetchWeather(city) {
    if (!city || city.trim().length === 0) {
        throw new Error('Please enter a valid city name');
    }
    
    const cleanCity = city.trim();
    const url = `${WEATHER_BASE_URL}?q=${encodeURIComponent(cleanCity)}&appid=${WEATHER_API_KEY}&units=metric`;
    
    console.log('🌐 Fetching weather for:', cleanCity);
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            let errorMessage = '';
            switch (response.status) {
                case 404:
                    errorMessage = `City "${city}" not found. Please check the spelling.`;
                    break;
                case 401:
                    errorMessage = 'Invalid API key. Please check your OpenWeatherMap API key.';
                    break;
                case 429:
                    errorMessage = 'Too many requests. Please wait a moment.';
                    break;
                default:
                    errorMessage = `Error ${response.status}: Unable to fetch weather data.`;
            }
            throw new Error(errorMessage);
        }
        
        const data = await response.json();
        
        // Format the weather data
        const weatherData = {
            name: data.name,
            country: data.sys.country || '',
            temp: Math.round(data.main.temp),
            feelsLike: Math.round(data.main.feels_like),
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            condition: data.weather[0].description,
            iconCode: data.weather[0].icon,
            lat: data.coord.lat,
            lon: data.coord.lon
        };
        
        // Save to backend (don't wait for it)
        saveCityToBackend(weatherData);
        logSearchToBackend(weatherData);
        
        return weatherData;
        
    } catch (error) {
        console.error('❌ Weather API Error:', error);
        throw error;
    }
}

// Save city to backend
async function saveCityToBackend(weatherData) {
    try {
        const response = await fetch(`${API_BASE}/cities`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: weatherData.name,
                country: weatherData.country,
                lat: weatherData.lat,
                lon: weatherData.lon
            })
        });
        if (!response.ok) throw new Error('Failed to save city');
        const data = await response.json();
        console.log('✅ City saved to backend:', data.data?.name || weatherData.name);
    } catch (error) {
        console.warn('⚠️ Could not save city to backend:', error.message);
    }
}

// Log search to backend
async function logSearchToBackend(weatherData) {
    try {
        const response = await fetch(`${API_BASE}/searches`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                city: weatherData.name,
                country: weatherData.country,
                temperature: weatherData.temp,
                condition: weatherData.condition,
                successful: true
            })
        });
        if (!response.ok) throw new Error('Failed to log search');
        console.log('✅ Search logged to backend');
    } catch (error) {
        console.warn('⚠️ Could not log search:', error.message);
    }
}