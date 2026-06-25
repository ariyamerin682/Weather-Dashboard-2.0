require('dotenv').config();
const mongoose = require('mongoose');
const City = require('./models/City');

const sampleCities = [
    { name: 'London', country: 'UK', lat: 51.5074, lon: -0.1278, isFavorite: true },
    { name: 'New York', country: 'USA', lat: 40.7128, lon: -74.0060, isFavorite: true },
    { name: 'Tokyo', country: 'Japan', lat: 35.6762, lon: 139.6503, isFavorite: false },
    { name: 'Paris', country: 'France', lat: 48.8566, lon: 2.3522, isFavorite: true },
    { name: 'Sydney', country: 'Australia', lat: -33.8688, lon: 151.2093, isFavorite: false },
    { name: 'Moscow', country: 'Russia', lat: 55.7558, lon: 37.6173, isFavorite: false },
    { name: 'Dubai', country: 'UAE', lat: 25.2048, lon: 55.2708, isFavorite: false },
    { name: 'Singapore', country: 'Singapore', lat: 1.3521, lon: 103.8198, isFavorite: false },
];

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
        
        // Clear existing data
        await City.deleteMany({});
        console.log('Cleared existing cities');
        
        // Insert sample cities
        const result = await City.insertMany(sampleCities);
        console.log(`✅ Seeded ${result.length} cities`);
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();