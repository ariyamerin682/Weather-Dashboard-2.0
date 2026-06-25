const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
router.get('/', searchController.getRecentSearches);
router.get('/stats', searchController.getSearchStats);
router.post('/', searchController.logSearch);
router.delete('/', searchController.clearSearchHistory);
module.exports = router;
