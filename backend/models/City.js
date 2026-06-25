const mongoose = require('mongoose');
const citySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    lat: {
        type: Number,
        required: true
    },
    lon: {
        type: Number,
        required: true
    },
    isFavorite: {
        type: Boolean,
        default: false
    },
    notes: {
        type: String,
        trim: true,
        maxlength: 500
    },
    lastSearched: {
        type: Date,
        default: Date.now
    },
    searchCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true 
});
citySchema.index({ name: 1, country: 1 });
citySchema.virtual('fullName').get(function() {
    return `${this.name}, ${this.country}`;
});
citySchema.methods.incrementSearchCount = function() {
    this.searchCount += 1;
    this.lastSearched = new Date();
    return this.save();
};
citySchema.statics.getPopularCities = function(limit = 5) {
    return this.find()
        .sort({ searchCount: -1 })
        .limit(limit)
        .select('name country searchCount');
};
module.exports = mongoose.model('City', citySchema);
