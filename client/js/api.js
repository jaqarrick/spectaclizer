const BACKGROUND_KEY = 'background';
const AUDIO_KEY = 'audio';
const FLOATERS_KEY = 'floaters';
const NUM_OF_FLOATERS = 8 ;

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

const getVideoIdsFromParams = ()  => {
  const params = new URLSearchParams(window.location.search)
  if(params.size < 5) return null
  const videos = []
 
  videos.push({
      type: 'background',
      videoId: params.get('b')
  })
  videos.push({
    type: 'audio',
    videoId: params.get('a')
  })
  params.getAll('f').forEach(id => {
    videos.push({
      type: 'floater',
      videoId: id
    })
  })

  return videos
}
const fetchInitialData = async () => {  
  const videosFromParams = getVideoIdsFromParams()
  if(videosFromParams){
    return videosFromParams
  }

  const allVideoData = await makeRequest();
  const videoList = [];

  for (const key in allVideoData) {
    const l = allVideoData[key];
    // We can only have 1 audio / background video
    if (key === BACKGROUND_KEY || key === AUDIO_KEY) {
      const videoId = getRandomItemFromArray(l);
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

