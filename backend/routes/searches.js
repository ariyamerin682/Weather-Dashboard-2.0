const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// GET /api/searches - Get recent searches
router.get('/', searchController.getRecentSearches);

// GET /api/searches/stats - Get search statistics
router.get('/stats', searchController.getSearchStats);

// POST /api/searches - Log a search
router.post('/', searchController.logSearch);

// DELETE /api/searches - Clear search history
router.delete('/', searchController.clearSearchHistory);

module.exports = router;