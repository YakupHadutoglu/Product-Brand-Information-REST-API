// apiSource.service.js
const axios = require('axios');
const ApiSource = require('../models/Apisource.js'); // Assuming this path is correct for your Mongoose model

let cachedSources = null; // Cache to store loaded API sources

/**
 * Loads and caches enabled API sources from the database.
 * Initializes an Axios client for each source with appropriate headers.
 * @returns {Array} An array of API source objects with attached Axios clients.
 */
const load = async () => {
    // If sources are already cached, return them to avoid redundant database calls
    if (cachedSources) return cachedSources;

    // Fetch enabled API sources from the database and convert them to plain JavaScript objects
    const docs = await ApiSource.find({ enabled: true }).lean();

    // Map each database document to a source object with an Axios client
    cachedSources = docs.map(d => {
        // Determine if the base URL belongs to RapidAPI
        const isRapidAPI = d.baseURL.includes('rapidapi.com');
        let rapidAPIHost = '';
        if (isRapidAPI) {
            try {
                rapidAPIHost = new URL(d.baseURL).hostname;
            } catch (e) {
                console.error(`Invalid baseURL for RapidAPI source ${d.name}: ${d.baseURL}`, e);
                // Fallback or skip this source if URL is malformed
                return null;
            }
        }

        // Prepare headers, including RapidAPI specific headers if applicable
        const headers = {
            ...d.headers, // Spread existing headers from the database
            ...(isRapidAPI && { // Conditionally add RapidAPI headers
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY, // Ensure RAPIDAPI_KEY is set in your environment variables
                'X-RapidAPI-Host': rapidAPIHost,
                'Content-Type': 'application/json', // Often required for RapidAPI
            })
        };

        // Create and configure an Axios client for the source
        return {
            ...d, // Spread all properties from the database document
            client: axios.create({
                baseURL: d.baseURL,
                headers: headers,
                timeout: 8000, // Set a timeout for API requests (8 seconds)
            }),
        };
    }).filter(Boolean); // Filter out any null entries if URL parsing failed

    return cachedSources;
};

const loadByType = async (type) => {
    const docs = await ApiSource.find({ enabled: true, sourceType: type }).lean();

    return docs.map(d => {
        const isRapidAPI = d.baseURL.includes('rapidapi.com');
        let rapidAPIHost = '';
        if (isRapidAPI) {
            try {
                rapidAPIHost = new URL(d.baseURL).hostname;
            } catch (e) {
                console.error(`Invalid baseURL for RapidAPI source ${d.name}: ${d.baseURL}`, e);
                return null;
            }
        }

        const headers = {
            ...d.headers,
            ...(isRapidAPI && {
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
                'X-RapidAPI-Host': rapidAPIHost,
                'Content-Type': 'application/json',
            })
        };

        return {
            ...d,
            client: axios.create({
                baseURL: d.baseURL,
                headers: headers,
                timeout: 15000,
            }),
        };
    }).filter(Boolean);
};

module.exports = { load, loadByType };
