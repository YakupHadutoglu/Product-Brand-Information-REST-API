// productAggregator.service.js
const { load } = require('./apiSource.service.js');

function mapParams(userParams, paramMap) {
    const mapped = {};
    for (const key in paramMap) {
        if (userParams[key] !== undefined && userParams[key] !== null) {
            mapped[paramMap[key]] = userParams[key];
        }
    }
    return mapped;
}

function buildPath(path, userParams) {
    return path.replace(/\{(\w+)\}/g, (match, p1) => {
        if (!userParams[p1]) throw new Error(`missing required path parameter: ${p1}`);
        return encodeURIComponent(userParams[p1]);
    });
}

const search = async (query) => {
    console.log('search function incoming query:', query);
    const sources = await load();
    console.log('Resources returned from the load function (sources):', sources);

    const jobs = sources.map(async (source) => {
        console.log(`Processing the source: ${source.name}`);
        const requiredParams = (source.path.match(/\{(\w+)\}/g) || []).map(p => p.replace(/[{}]/g, ''));
        console.log(`Required path parameters (${source.name}):`, requiredParams);

        const missingParams = requiredParams.filter(p => !query[p]);
        if (missingParams.length > 0) {
            console.warn(`${source.name} API call skipped. Missing parameters: ${missingParams.join(', ')}`);
            return [];
        }

        const payload = mapParams(query, source.paramMap || {});
        console.log(`Payload (${source.name}):`, payload);
        const fullPath = buildPath(source.path, query);
        console.log(`fullPath API path (${source.name}):`, fullPath);

        try {
            let response;
            if (source.method.toUpperCase() === 'GET') {
                console.log(`Sending GET request (${source.name}) - URL: ${source.client.defaults.baseURL}${fullPath}, Parametreler:`, payload);
                response = await source.client.get(fullPath, { params: payload });
            } else {
                console.log(`Sending POST request (${source.name}) - URL: ${source.client.defaults.baseURL}${fullPath}, Veri:`, payload);
                response = await source.client.post(fullPath, payload);
            }

            console.log(`API response received (${source.name}). Durum kodu: ${response.status}`);
            return normalize(source.name, response.data);
        } catch (error) {
            console.error(`${source.name} API error:`, {
                message: error.message,
                status: error.response?.status,
                config: error.config?.url,
                data: error.response?.data,
                stack: error.stack
            });
            return [];
        }
    });

    const results = await Promise.all(jobs);
    console.log('Results from all API calls (before flatten):', results);
    return results.flat();
};

/**
 * Normalizes raw API response data into a consistent product format.
 * This function is crucial for handling different API response structures.
 * @param {string} src - The name of the API source (e.g., 'aliexpress').
 * @param {Object} raw - The raw data received from the API.
 * @returns {Array} An array of normalized product objects.
 */
function normalize(src, raw) {
    console.log(`normalize function incomming data (${src}):`, JSON.stringify(raw, null, 2));
    console.log(`normalize function incomming data (${src}) type:`, typeof raw);
    if (src.toLowerCase().includes('aliexpress')) {
        const items = raw.result?.resultList || [];
        console.log(`found array 'items' in normalize. Length: ${items.length}`); // new critical log

        if (items.length === 0) {
            console.warn('AliExpress reply "result.resultList" No products found or empty under');
            return [];
        }

        const normalizedProducts = items.map((entry, index) => {
            const item = entry.item;
            if (!item) {
                console.warn(`[${index}] AliExpress reply one "entry" inside "item" object not found, This item has been discarded:`, entry);
                return null; // If the item object does not exist, return null
            }

            let price = '';
            if (item.sku && item.sku.def) {
                price = item.sku.def.promotionPrice !== null && item.sku.def.promotionPrice !== undefined
                    ? item.sku.def.promotionPrice
                    : item.sku.def.price;
            }

            const product = {
                name: item.title || 'Title No',
                brand: item.brandName || 'Brand No', // brandName does not come directly, it will remain blank
                price: price || 'Price No',
                currency: 'USD',
                imageURL: item.image || 'İmage No',
                source: 'aliexpress',
                originalData: item
            };
            console.log(`[${index}] Normalized product:`, product); // Logging each product may result in too much output, use with caution
            return product;
        });

        console.log('Normalized array of products (before filter):');
        // Sadece ilk birkaç öğeyi veya null olanları göstermek için kısaltalım // Let's shorten it to show only the first few items or null ones
        normalizedProducts.slice(0, 5).forEach((p, i) => console.log(`  [${i}]`, p ? p.name : 'NULL'));
        if (normalizedProducts.length > 5) console.log(`  ... and ${normalizedProducts.length - 5} other item.`);
        console.log(`Total normalized product (before filter): ${normalizedProducts.length}`);


        const filteredProducts = normalizedProducts.filter(Boolean);
        console.log('Normalized and filtered products (normalized final output):');
        filteredProducts.slice(0, 5).forEach((p, i) => console.log(`  [${i}]`, p ? p.name : 'NULL'));
        if (filteredProducts.length > 5) console.log(`  ... ve ${filteredProducts.length - 5} diğer öğe.`);
        console.log(`Total filtered product (normalized final output): ${filteredProducts.length}`);


        return filteredProducts;
    }
    return [];
}

module.exports = { search };
