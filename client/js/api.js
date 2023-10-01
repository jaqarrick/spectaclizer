const backgroundSearchTerm = 'Police training video';
const audioSearchTerm = 'Creepy ambient music';
const floaterSearchTerm = 'The view show latest';

const BACKGROUND_KEY = 'background';
const AUDIO_KEY = 'audio';
const FLOATERS_KEY = 'floaters';
const NUM_OF_FLOATERS = 3;

const makeRequest = async () => {
  const url = `http://localhost:3000/videos`;
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
  const allVideoData = await makeRequest();
  const videoList = [];

  for (const key in allVideoData) {
    const l = allVideoData[key];
    // We can only have 1 audio / background video
    if (key === BACKGROUND_KEY || key === AUDIO_KEY) {
      const videoId = getRandomItemFromArray(l);
      console.log(videoId, 'videoId');
      videoList.push({
        videoId,
        type: key,
      });
    } else {
      const videoIdList = getRandomItemsFromArray(l, NUM_OF_FLOATERS);
      videoIdList.forEach((id) => {
        videoList.push({
          videoId: id,
          type: 'floater',
        });
      });
    }
  }
  console.log(videoList);
  return videoList;
};
