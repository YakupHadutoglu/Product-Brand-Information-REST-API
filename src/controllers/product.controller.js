const { search } = require('../services/productAggregator.service.js');

const getProducts = async (req, res) => {
    try {
        console.log('incoming request query parameters:', req.query);

        const { keyword = '', page = 1 , type } = req.query;

        // Let's check the key and page values
        console.log('sorted keyword:', keyword);
        console.log('sorted page:', page);

        if (!keyword) {
            console.error('Error: Keyword parameter is required.');
            return res.status(400).json({ error: 'Keyword parameter required.' });
        }

        const products = await search({ keyword, page } , type);

        // Let's check the return value from the search function
        console.log('Products returned from the search function:', products);

        // Markalı arama için özel render
        if (type === 'realTimeProductSearch') {
            return res.render('brandProduct', {
                brandProducts: products || [],
                products: [], // Ana arama sonuçlarını boş bırak
                title: 'Marka Ürünleri',
                token: req.session.token,
                idAdmin: req.session.isAdmin,
                activeTab: req.activeTab
            });
        }

        // Normal arama için render
        res.render('brandProduct', {
            products: products || [],
            brandProducts: [], // Markalı ürünleri boş bırak
            title: 'Ürün Sonuçları',
            token: req.session.token,
            idAdmin: req.session.isAdmin,
            activeTab: req.activeTab
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
