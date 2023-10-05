const axios = require('axios');
const cron = require('node-cron');
const { clearData, setData } = require('./cache');
const logger = require('./logger');
const {
    backgroundVideoSearchTerms,
    BACKGROUND_KEY,
    AUDIO_KEY,
    audioSearchTerms,
    FLOATERS_KEY,
    floaterSearchTerms,
    BACKGROUND_MAX_RESULTS,
    AUDIO_MAX_RESULTS,
    FLOATERS_MAX_RESULTS,
} = require('./constants');

const translateDataToVideosMap = async (key, queryList, maxResults) => {
    const requests = queryList.map(queryString => fetchData(queryString, maxResults));

    const allSearchResultsList = [];

    try {
        const results = await Promise.all(requests);

        results.forEach((result) => {
            result.items.forEach((item) => {
                if (item.id.videoId) {
                    allSearchResultsList.push(item.id.videoId);
                }
            });
        });

        setData(key, allSearchResultsList);
    } catch (error) {
        logger.error('Error during API requests:', error);
    }
};

const fetchData = async (query, maxResults) => {
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
        logger.error('API_KEY undefined');
        return;
    }
    const baseUrl = 'https://www.googleapis.com/youtube/v3/search';
    const queryParams = {
        part: 'snippet',
        q: query,
        maxResults,
        key: process.env.API_KEY,
    };
    try {
        const response = await axios.get(baseUrl, { params: queryParams });
        logger.info(`'Data fetched for query: ${query}`);
        return response.data;
    } catch (error) {
        logger.error('Fetch error:', error);
        throw error;
    }

};

const fetchAndSetAllData = async () => {
    await Promise.all([
        translateDataToVideosMap(BACKGROUND_KEY, backgroundVideoSearchTerms, BACKGROUND_MAX_RESULTS),
        translateDataToVideosMap(AUDIO_KEY, audioSearchTerms, AUDIO_MAX_RESULTS),
        translateDataToVideosMap(FLOATERS_KEY, floaterSearchTerms, FLOATERS_MAX_RESULTS),
    ]);
};
const initWorker = async () => {
    await fetchAndSetAllData();
    cron.schedule('0 0 * * *', async () => {
        logger.info('Worker started');
        logger.info('Clearing Cache');
        clearData();
        logger.info('Fetching data');
        await fetchAndSetAllData();
        logger.info('Worker completed');
    });
};

module.exports = initWorker;
