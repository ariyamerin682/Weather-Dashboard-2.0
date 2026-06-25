const validApiKeys = [
    'dev-api-key-123', 
    'your-secret-key-here'
];
exports.validateApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'] || req.query.apiKey;
    if (!apiKey) {
        return res.status(401).json({
            success: false,
            message: 'API key required'
        });
    }
    if (!validApiKeys.includes(apiKey)) {
        return res.status(403).json({
            success: false,
            message: 'Invalid API key'
        });
    }
    next();
};
exports.logRequest = (req, res, next) => {
    console.log(`📝 ${req.method} ${req.url}`);
    console.log(`   IP: ${req.ip}`);
    console.log(`   User-Agent: ${req.headers['user-agent']}`);
    next();
};
