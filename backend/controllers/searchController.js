const Search = require('../models/Search');
exports.getRecentSearches = async (req, res) => {
    try {
        const { limit = 10 } = req.query;
        const searches = await Search.getRecentSearches(parseInt(limit));
        res.json({
            success: true,
            count: searches.length,
            data: searches
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching searches',
            error: error.message
        });
    }
};
exports.logSearch = async (req, res) => {
    try {
        const { city, country, temperature, condition, successful, errorMessage } = req.body;
        const search = new Search({
            city,
            country,
            temperature,
            condition,
            successful,
            errorMessage,
            ipAddress: req.ip || req.connection.remoteAddress,
            userAgent: req.headers['user-agent']
        });
        await search.save();
        
        res.status(201).json({
            success: true,
            message: 'Search logged',
            data: search
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error logging search',
            error: error.message
        });
    }
};
exports.getSearchStats = async (req, res) => {
    try {
        const stats = await Search.getSearchStats();
        res.json({
            success: true,
            data: stats
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching search stats',
            error: error.message
        });
    }
};
exports.clearSearchHistory = async (req, res) => {
    try {
        await Search.deleteMany({});
        res.json({
            success: true,
            message: 'Search history cleared'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error clearing search history',
            error: error.message
        });
    }
};
