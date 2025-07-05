const ApiSource = require('../models/Apisource.js');

const newApiIntegration = async (req, res) => {
    try {
        const {
            name,
            method,
            sourceType,
            enabled,
            baseURL,
            path,
            headers,
            paramMap,
            responseMapping
        } = req.body;

        const isEnabled = enabled === 'on' || enabled === true;

        const apiSource = new ApiSource({
            name,
            method,
            sourceType,
            enabled: isEnabled,
            baseURL,
            path,
            headers: headers ? JSON.parse(headers) : {},        
            paramMap: paramMap ? JSON.parse(paramMap) : {},
            responseMapping: responseMapping ? JSON.parse(responseMapping) : {}
        });

        await apiSource.save();

        res.status(201).json({ message: 'API integration created successfully', apiSource });

    } catch (error) {
        console.error(error);
        if (error.name === 'SyntaxError' && error.message.includes('JSON')) {
            return res.status(400).json({ message: 'Invalid JSON format in request body' });
        } else if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation error', details: error.message });
        } else {
            return res.status(500).json({ message: 'Internal server error', details: error.message });
        }
    }
};

module.exports = { newApiIntegration };
