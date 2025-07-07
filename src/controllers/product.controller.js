const { search } = require('../services/productAggregator.service.js');

const getProducts = async (req, res) => {
    try {
        console.log('incoming request query parameters:', req.query);

        const { keyword = '', page = 1 } = req.query;

        // Let's check the key and page values
        console.log('sorted keyword:', keyword);
        console.log('sorted page:', page);

        if (!keyword) {
            console.error('Error: Keyword parameter is required.');
            return res.status(400).json({ error: 'Keyword parameter required.' });
        }

        const products = await search({ keyword, page });

        // Let's check the return value from the search function
        console.log('Products returned from the search function:', products);

        res.render('brandProduct', {
            products: products || [],
            title: 'Brand Products',
            token: req.session.token, // Oturum bilgisi
            idAdmin: req.session.isAdmin // Admin kontrolü
        });


    } catch (error) {
        console.error('API Error (product.controller.js):', {
            message: error.message,
            stack: error.stack // trace of error
        });
        res.status(500).json({ error: 'API Error', message: error.message });
    }
};

module.exports = { getProducts };
