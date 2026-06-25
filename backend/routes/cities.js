const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController');

// GET /api/cities - Get all cities
router.get('/', cityController.getAllCities);

// GET /api/cities/favorites - Get favorite cities
router.get('/favorites', cityController.getFavorites);

// GET /api/cities/popular - Get popular cities
router.get('/popular', cityController.getPopularCities);

// GET /api/cities/:name - Get single city by name
router.get('/:name', cityController.getCity);

// POST /api/cities - Create or update city
router.post('/', cityController.createCity);

// PUT /api/cities/:id - Update city
router.put('/:id', cityController.updateCity);

// DELETE /api/cities/:id - Delete city
router.delete('/:id', cityController.deleteCity);

module.exports = router;