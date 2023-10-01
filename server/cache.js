const logger = require('./logger');

const map = new Map();

const setData = (key, data) => {
  logger.info(`Setting key ${key}`);
  return map.set(key, data);
};

const getData = (key) => {
  return map.get(key);
};

const getCachedDataAsJson = () => Object.fromEntries(map);

const clearData = () => {
  logger.info('Clearing cache');
  map.clear();
};

module.exports = { setData, getData, clearData, getCachedDataAsJson };
