const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');
const cors = require('cors');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.API_KEY;

app.use(cors());

app.get('/youtube-search', async (req, res) => {
  const { q, maxResults } = req.query;
  if (!q) res.status(400).send('Bad Request: Include query param');
  const baseUrl = 'https://www.googleapis.com/youtube/v3/search';

  const queryParams = {
    part: 'snippet',
    q,
    maxResults: maxResults ?? 10,
    key: apiKey,
  };

  try {
    const response = await axios.get(baseUrl, {
      params: queryParams,
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
