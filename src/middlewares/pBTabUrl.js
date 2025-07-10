const productBrandTabURL = (req, res, next) => {
    const { name, url, activeTab } = req.query;

    req.activeTab = activeTab || 'search-screen'; // default sekme

    if (name === 'queryParameters') {
        const queryParameters = new URLSearchParams(url.split('?')[1]);
        const brand = queryParameters.get('brand');
        const category = queryParameters.get('category');
        const page = queryParameters.get('page') || '1';

        req.queryParameters = { brand, category, page };
        return next();
    }

    if (name === 'productSearchForm') {
        const productSearchForm = new URLSearchParams(url.split('?')[1]);
        const query = productSearchForm.get('query');
        const page = productSearchForm.get('page') || '1';
        const category = productSearchForm.get('category') || 'all';

        req.queryParameters = { query, page, category };
        return next();
    }

    next();
};

module.exports = { productBrandTabURL };
