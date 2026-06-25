const City = require('../models/City');
exports.getAllCities = async (req, res) => {
    try {
        const { limit = 10, sort = '-searchCount' } = req.query;
        const cities = await City.find()
            .sort(sort)
            .limit(parseInt(limit));
        res.json({
            success: true,
            count: cities.length,
            data: cities
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching cities',
            error: error.message
        });
    }
};
exports.getCity = async (req, res) => {
    try {
        const city = await City.findOne({ 
            name: { $regex: new RegExp(req.params.name, 'i') } 
        });
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
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching city',
            error: error.message
        });
    }
};
exports.createCity = async (req, res) => {
    try {
        const { name, country, lat, lon } = req.body;
        let city = await City.findOne({ name: { $regex: new RegExp(name, 'i') } });
        if (city) {
            city = await City.findOneAndUpdate(
                { _id: city._id },
                { 
                    $set: { country, lat, lon },
                    $inc: { searchCount: 1 },
                    $set: { lastSearched: new Date() }
                },
                { new: true }
            );
            return res.json({
                success: true,
                message: 'City updated',
                data: city
            });
        }
        city = new City({
            name,
            country,
            lat,
            lon,
            searchCount: 1,
            lastSearched: new Date()
        });
        await city.save();
        res.status(201).json({
            success: true,
            message: 'City created',
            data: city
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: 'City already exists'
            });
        }
        res.status(500).json({
            success: false,
            message: 'Error creating city',
            error: error.message
        });
    }
};
exports.updateCity = async (req, res) => {
    try {
        const updates = req.body;
        const options = { new: true, runValidators: true };
        const city = await City.findByIdAndUpdate(
            req.params.id,
            updates,
            options
        );
        if (!city) {
            return res.status(404).json({
                success: false,
                message: 'City not found'
            });
        }
        res.json({
            success: true,
            message: 'City updated',
            data: city
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating city',
            error: error.message
        });
    }
};
exports.deleteCity = async (req, res) => {
    try {
        const city = await City.findByIdAndDelete(req.params.id);
        if (!city) {
            return res.status(404).json({
                success: false,
                message: 'City not found'
            });
        }
        res.json({
            success: true,
            message: 'City deleted',
            data: city
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting city',
            error: error.message
        });
    }
};
exports.getFavorites = async (req, res) => {
    try {
        const cities = await City.find({ isFavorite: true })
            .sort({ name: 1 });
        res.json({
            success: true,
            count: cities.length,
            data: cities
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching favorites',
            error: error.message
        });
    }
};
exports.getPopularCities = async (req, res) => {
    try {
        const cities = await City.getPopularCities();
        res.json({
            success: true,
            data: cities
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching popular cities',
            error: error.message
        });
    }
};
