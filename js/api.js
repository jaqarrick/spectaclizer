const backgroundSearchTerm = 'Police training video';
const audioSearchTerm = 'Creepy ambient music';
const floaterSearchTerm = 'The view show latest';
const makeRequest = async (query, maxResults = 10) => {
  const url = `http://localhost:3000/youtube-search?q=${encodeURIComponent(
    query,
  )}&maxResults=${maxResults}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    // Handle the API response data here
    return data;
  } catch (error) {
    // Handle any errors that occurred during the fetch
    console.error('Fetch error:', error);
  }
};

const fetchInitialData = async () => {
  const backgroundVideoData = await makeRequest(backgroundSearchTerm, 10);
  const backgroundVideoId =
    backgroundVideoData.items[
      [Math.floor(Math.random() * backgroundVideoData.items.length)]
    ].id.videoId;
  const audioVideoData = await makeRequest(audioSearchTerm, 10);
  const audioId =
    audioVideoData.items[
      Math.floor(Math.random() * audioVideoData.items.length)
    ].id.videoId;

  const floaterData = await makeRequest(floaterSearchTerm, 20);

  const floaterVideos = floaterData.items.map((item) => {
    return {
      videoId: item.id.videoId,
      type: 'floater',
    };
  });

  return [
    {
      videoId: backgroundVideoId,
      type: 'background',
    },
    {
      videoId: audioId,
      type: 'audio',
    },

    ...getRandomItemsFromArray(floaterVideos, 1),
  ];
};
