const { load, loadByType } = require('./apiSource.service.js');

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

const search = async (query, type = null) => {
    console.log('search function incoming query:', query);

    const sources = type ? await loadByType(type) : await load();

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
    console.log(`normalize function incoming data (${src}):`, JSON.stringify(raw, null, 2));
    console.log(`normalize function incoming data (${src}) type:`, typeof raw);

    const normalizedSrcKey = src.toLowerCase(); // Just make it lower case

    if (src.toLowerCase().includes('aliexpress')) {
        // Existing AliExpress normalization code
        const items = raw.result?.resultList || [];
        console.log(`found array 'items' in normalize. Length: ${items.length}`);

        if (items.length === 0) {
            console.warn('AliExpress reply "result.resultList" No products found or empty under');
            return [];
        }

        const normalizedProducts = items.map((entry, index) => {
            const item = entry.item;
            if (!item) {
                console.warn(`[${index}] AliExpress reply one "entry" inside "item" object not found, This item has been discarded:`, entry);
                return null;
            }

            let price = '';
            if (item.sku && item.sku.def) {
                price = item.sku.def.promotionPrice !== null && item.sku.def.promotionPrice !== undefined
                    ? item.sku.def.promotionPrice
                    : item.sku.def.price;
            }

            const product = {
                name: item.title || 'Title No',
                brand: item.brandName || 'Brand No',
                price: price || 'Price No',
                currency: 'USD',
                imageURL: item.image || 'Image No',
                source: 'aliexpress',
                originalData: item
            };
            console.log(`[${index}] Normalized product:`, product);
            return product;
        });

        console.log('Normalized array of products (before filter):');
        normalizedProducts.slice(0, 5).forEach((p, i) => console.log(`  [${i}]`, p ? p.name : 'NULL'));
        if (normalizedProducts.length > 5) console.log(`  ... and ${normalizedProducts.length - 5} other items.`);
        console.log(`Total normalized products (before filter): ${normalizedProducts.length}`);

        const filteredProducts = normalizedProducts.filter(Boolean);
        console.log('Normalized and filtered products (normalized final output):');
        filteredProducts.slice(0, 5).forEach((p, i) => console.log(`  [${i}]`, p ? p.name : 'NULL'));
        if (filteredProducts.length > 5) console.log(`  ... and ${filteredProducts.length - 5} other items.`);
        console.log(`Total filtered products (normalized final output): ${filteredProducts.length}`);

        return filteredProducts;
    }
    else if (
        normalizedSrcKey.includes("realtimeproductsearch") ||
        normalizedSrcKey.includes("rapidapi")
    ) {
        let products = [];

        if (raw.organic_results?.organic_products) {
            products = raw.organic_results.organic_products;
        } else if (raw.data?.products) {
            products = raw.data.products;
        } else if (Array.isArray(raw)) {
            products = raw;
        }

        return products
            .map((p) => {
                if (!p) return null;

                // USD Price information
                let priceValue = null;
                if (p.offer?.price || p.price) {
                    const priceStr = (p.offer?.price || p.price).toString();
                    priceValue = parseFloat(priceStr.replace(/[^\d.]/g, ""));
                }

                //Original price (numeric only, USD assumption) //* Orijinal fiyat (sadece sayısal, USD varsayımı)
                let originalPrice = null;
                if (p.offer?.original_price || p.original_price) {
                    const originalStr = (p.offer?.original_price || p.original_price).toString();
                    originalPrice = parseFloat(originalStr.replace(/[^\d.]/g, ""));
                }

                // Fetch Variant fields (array -> string list) //* Variant alanlarını çek (dizi -> string listesi)
                const getVariantNames = (variantArray) =>
                    Array.isArray(variantArray)
                        ? variantArray.map((v) => v.name).filter(Boolean)
                        : [];

                // Let's process videos properly  //* Videoları düzgün biçimde işleyelim
                const videoList = Array.isArray(p.product_videos)
                    ? p.product_videos.map((v) => ({
                        title: v.title || null,
                        url: v.url || null,
                        source: v.source || null,
                        publisher: v.publisher || null,
                        thumbnail: v.thumbnail || null,
                        durationMs: v.duration_ms || null,
                    }))
                    : [];

                return {
                    id: p.product_id || Math.random().toString(36).substr(2, 9),
                    name: p.product_title || "no product name",
                    productTitle: p.product_title || "no product name",
                    description: p.product_description || "no product description",
                    productPhotos: p.product_photos || [],
                    productVideos: videoList,
                    productAttributes: p.product_attributes || {},
                    productPageURL: p.product_page_url || "#",
                    productCarrierVariants: getVariantNames(p.product_variants?.Carrier),
                    productStorageCapacity: getVariantNames(p.product_variants?.["Storage Capacity"]),
                    productColor: getVariantNames(p.product_variants?.Colour || p.product_variants?.Color),
                    productRam: getVariantNames(p.product_variants?.RAM),
                    offerTitle: p.offer?.offer_title || "offer title not found",
                    offerPageURL: p.offer?.offer_page_url || "#",
                    price: priceValue || "no found price",
                    currency: "USD",
                    originalPrice,
                    storeName: p.offer?.store_name || "shopping store not found",
                    storeFavicon: p.offer?.store_favicon || "/images/no-image.jpg",
                    rating: p.product_rating || null,
                    reviewCount: p.product_num_reviews || 0,
                    offerURL: p.offer?.offer_page_url || p.product_offer_page_url || "#",
                    store: p.offer?.store_name || null,
                    shipping: p.offer?.shipping || null,
                    onSale: p.offer?.on_sale || false,
                    source: normalizedSrcKey.includes("realtimeproductsearch")
                        ? "realtimeproductsearch"
                        : "rapidapi",
                };
            })
            .filter(Boolean);
    }

    return [];
}

module.exports = { search };
