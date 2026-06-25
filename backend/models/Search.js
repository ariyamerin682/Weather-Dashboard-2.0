const mongoose = require('mongoose');

const searchSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        trim: true
    },
    temperature: {
        type: Number
    },
    condition: {
        type: String,
        trim: true
    },
    ipAddress: {
        type: String,
        trim: true
    },
    userAgent: {
        type: String,
        trim: true
    },
    searchTime: {
        type: Date,
        default: Date.now
    },
    successful: {
        type: Boolean,
        default: true
    },
    errorMessage: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

// Index for faster queries
searchSchema.index({ city: 1, searchTime: -1 });
searchSchema.index({ searchTime: -1 });

// Static method: get recent searches
searchSchema.statics.getRecentSearches = function(limit = 10) {
    return this.find()
        .sort({ searchTime: -1 })
        .limit(limit)
        .select('city country temperature condition searchTime');
};

// Static method: get search stats
searchSchema.statics.getSearchStats = function() {
    return this.aggregate([
        {
            $group: {
                _id: '$city',
                count: { $sum: 1 },
                avgTemp: { $avg: '$temperature' }
            }
        },
        { $sort: { count: -1 } },
        { $limit: 10 }
    ]);
};

module.exports = mongoose.model('Search', searchSchema);