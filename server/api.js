const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { getCachedDataAsJson } = require('./cache');
const logger = require('./logger');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const api = () => {
  app.use(cors());

  app.get('/videos', async (req, res) => {
    const data = getCachedDataAsJson();
    res.status(200).send(data);
  });

  app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
  });
};

module.exports = api;
