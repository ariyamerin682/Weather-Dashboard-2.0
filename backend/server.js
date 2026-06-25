require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ----- ROUTES -----

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Server is running!',
        mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
        timestamp: new Date().toISOString()
    });
});

// Test route
app.get('/api/test', (req, res) => {
    res.json({
        message: 'API is working!',
        endpoints: [
            'GET  /api/health',
            'GET  /api/test',
            'GET  /api/cities',
            'POST /api/cities',
            'GET  /api/cities/:id',
            'PUT  /api/cities/:id',
            'DELETE /api/cities/:id',
            'GET  /api/cities/favorites',
            'GET  /api/cities/popular',
            'GET  /api/searches',
            'POST /api/searches',
            'GET  /api/searches/stats'
        ],
        timestamp: new Date().toISOString()
    });
});

// ----- CITY ROUTES (Simple version) -----

// Sample data (replace with MongoDB later)
let cities = [
    { 
        id: 1, 
        name: 'London', 
        country: 'UK', 
        lat: 51.5074, 
        lon: -0.1278, 
        isFavorite: true,
        searchCount: 15,
        lastSearched: new Date()
    },
    { 
        id: 2, 
        name: 'Tokyo', 
        country: 'Japan', 
        lat: 35.6762, 
        lon: 139.6503, 
        isFavorite: false,
        searchCount: 8,
        lastSearched: new Date()
    },
    { 
        id: 3, 
        name: 'New York', 
        country: 'USA', 
        lat: 40.7128, 
        lon: -74.0060, 
        isFavorite: true,
        searchCount: 12,
        lastSearched: new Date()
    },
    { 
        id: 4, 
        name: 'Paris', 
        country: 'France', 
        lat: 48.8566, 
        lon: 2.3522, 
        isFavorite: false,
        searchCount: 6,
        lastSearched: new Date()
    }
];

let nextId = 5;

// GET all cities
app.get('/api/cities', (req, res) => {
    const { limit = 10, sort = 'name' } = req.query;
    
    let sortedCities = [...cities];
    
    // Sort
    if (sort === 'name') {
        sortedCities.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === '-searchCount') {
        sortedCities.sort((a, b) => b.searchCount - a.searchCount);
    } else if (sort === 'lastSearched') {
        sortedCities.sort((a, b) => new Date(b.lastSearched) - new Date(a.lastSearched));
    }
    
    // Limit
    sortedCities = sortedCities.slice(0, parseInt(limit));
    
    res.json({
        success: true,
        count: sortedCities.length,
        data: sortedCities
    });
});

// GET favorites
app.get('/api/cities/favorites', (req, res) => {
    const favorites = cities.filter(city => city.isFavorite);
    res.json({
        success: true,
        count: favorites.length,
        data: favorites
    });
});

// GET popular cities
app.get('/api/cities/popular', (req, res) => {
    const popular = [...cities]
        .sort((a, b) => b.searchCount - a.searchCount)
        .slice(0, 5);
    res.json({
        success: true,
        data: popular
    });
});

// GET single city by name
app.get('/api/cities/:name', (req, res) => {
    const city = cities.find(c => 
        c.name.toLowerCase() === req.params.name.toLowerCase()
    );
    
    if (!city) {
        return res.status(404).json({
            success: false,
            message: 'City not found'
        });
    }
    
    res.json({
        success: true,
        data: city
    });
});

// POST create city
app.post('/api/cities', (req, res) => {
    const { name, country, lat, lon, isFavorite = false } = req.body;
    
    // Check if city already exists
    const existing = cities.find(c => 
        c.name.toLowerCase() === name.toLowerCase()
    );
    
    if (existing) {
        // Update existing city
        existing.country = country || existing.country;
        existing.lat = lat || existing.lat;
        existing.lon = lon || existing.lon;
        existing.searchCount = (existing.searchCount || 0) + 1;
        existing.lastSearched = new Date();
        
        return res.json({
            success: true,
            message: 'City updated',
            data: existing
        });
    }
    
    // Create new city
    const newCity = {
        id: nextId++,
        name,
        country: country || 'Unknown',
        lat: lat || 0,
        lon: lon || 0,
        isFavorite: isFavorite || false,
        searchCount: 1,
        lastSearched: new Date()
    };
    
    cities.push(newCity);
    
    res.status(201).json({
        success: true,
        message: 'City created',
        data: newCity
    });
});

// PUT update city
app.put('/api/cities/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const cityIndex = cities.findIndex(c => c.id === id);
    
    if (cityIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'City not found'
        });
    }
    
    const { name, country, lat, lon, isFavorite, notes } = req.body;
    
    cities[cityIndex] = {
        ...cities[cityIndex],
        name: name || cities[cityIndex].name,
        country: country || cities[cityIndex].country,
        lat: lat || cities[cityIndex].lat,
        lon: lon || cities[cityIndex].lon,
        isFavorite: isFavorite !== undefined ? isFavorite : cities[cityIndex].isFavorite,
        notes: notes || cities[cityIndex].notes
    };
    
    res.json({
        success: true,
        message: 'City updated',
        data: cities[cityIndex]
    });
});

// DELETE city
app.delete('/api/cities/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const cityIndex = cities.findIndex(c => c.id === id);
    
    if (cityIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'City not found'
        });
    }
    
    const deleted = cities.splice(cityIndex, 1)[0];
    
    res.json({
        success: true,
        message: 'City deleted',
        data: deleted
    });
});

// ----- SEARCH ROUTES -----

let searches = [];

// Log a search
app.post('/api/searches', (req, res) => {
    const { city, country, temperature, condition, successful = true } = req.body;
    
    const searchEntry = {
        id: searches.length + 1,
        city,
        country: country || 'Unknown',
        temperature,
        condition,
        successful,
        ipAddress: req.ip || req.connection.remoteAddress,
        userAgent: req.headers['user-agent'] || 'Unknown',
        searchTime: new Date()
    };
    
    searches.push(searchEntry);
    
    res.status(201).json({
        success: true,
        message: 'Search logged',
        data: searchEntry
    });
});

// Get recent searches
app.get('/api/searches', (req, res) => {
    const { limit = 10 } = req.query;
    
    const recent = [...searches]
        .sort((a, b) => new Date(b.searchTime) - new Date(a.searchTime))
        .slice(0, parseInt(limit));
    
    res.json({
        success: true,
        count: recent.length,
        data: recent
    });
});

// Get search stats
app.get('/api/searches/stats', (req, res) => {
    // Group by city
    const stats = {};
    searches.forEach(s => {
        if (!stats[s.city]) {
            stats[s.city] = { count: 0, avgTemp: 0 };
        }
        stats[s.city].count++;
        if (s.temperature) {
            stats[s.city].avgTemp = (stats[s.city].avgTemp * (stats[s.city].count - 1) + s.temperature) / stats[s.city].count;
        }
    });
    
    const result = Object.entries(stats)
        .map(([city, data]) => ({
            city,
            count: data.count,
            avgTemp: Math.round(data.avgTemp * 10) / 10
        }))
        .sort((a, b) => b.count - a.count);
    
    res.json({
        success: true,
        data: result
    });
});

// Clear search history
app.delete('/api/searches', (req, res) => {
    searches = [];
    res.json({
        success: true,
        message: 'Search history cleared'
    });
});

// ----- 404 HANDLER -----
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.method} ${req.url} not found`
    });
});

// ----- ERROR HANDLER -----
app.use((err, req, res, next) => {
    console.error('❌ Error:', err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: err.message
    });
});

// ----- START SERVER -----
app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════╗
║   🚀 Weather Dashboard API Server        ║
╠═══════════════════════════════════════════╣
║   📡 Port: http://localhost:${PORT}        ║
║   ✅ Test: http://localhost:${PORT}/api/test
║   📊 Cities: http://localhost:${PORT}/api/cities
║   ❤️  Health: http://localhost:${PORT}/api/health
╚═══════════════════════════════════════════╝
    `);
});