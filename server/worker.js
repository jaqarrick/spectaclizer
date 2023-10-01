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
} = require('./constants');

const translateDataToVideosMap = async (key, queryList, maxResults) => {
  const requests = queryList.map((queryString) => {
    return new Promise(async (resolve) => {
      resolve(await fetchData(queryString, maxResults));
    });
  });

  const allSeachResultsList = [];
  Promise.all(requests).then((data) => {
    const results = data;
    results.forEach((result) => {
      result.items.forEach((item) =>
        item.id.videoId ? allSeachResultsList.push(item.id.videoId) : null,
      );
    });
  });
  setData(key, allSeachResultsList);
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
    q: query, // Replace with your desired query
    maxResults,
    key: process.env.API_KEY, // Replace with your API key
  };
  try {
    const response = await axios.get(baseUrl, { params: queryParams });
    logger.info(`'Data fetched for query: ${query}`);
    return response.data;
  } catch (error) {
    logger.error('Fetch error:', error);
  }
};

const fetchAndSetAllData = async () => {
  await Promise.all([
    translateDataToVideosMap(BACKGROUND_KEY, [backgroundVideoSearchTerms]),
    translateDataToVideosMap(AUDIO_KEY, audioSearchTerms),
    translateDataToVideosMap(FLOATERS_KEY, floaterSearchTerms),
  ]);
};
const initWorker = async () => {
  await fetchAndSetAllData();
  // Function to fetch data from the YouTube API and update the cache

  // Schedule the worker to run two times a day (adjust the cron expression as needed)
  cron.schedule('0 0 * * *', async () => {
    console.log('Worker started');
    console.log('Clearing Cache');
    clearData();
    console.log('Fetching data');
    await fetchAndSetAllData()
    console.log('Worker completed');
  });
};

module.exports = initWorker;
