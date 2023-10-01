const containerId = 'container';

// const videos = [
//   { videoId: 'XkfOebBYm-U', type: 'background' },
//   { videoId: '529wVt6Yg5I', type: 'audio' },
//   { videoId: 'crPoQKuP4pI', type: 'floater' },
//   { videoId: 'RIDJitRNpAU', type: 'floater' },
//   { videoId: 'GbG9Ov-0wBQ', type: 'floater' },
//   { videoId: 'JOCRo97NoJ8', type: 'floater' },
// ];

const init = async () => {
  const videos = await fetchInitialData();
  const spectacles = videos.map(
    ({ videoId, type }) =>
      new Spectaclizer({
        videoId,
        type,
        containerId,
      }),
  );
  document.querySelector('#play-btn').onclick = () => {
    console.log('play');
    spectacles.forEach((s) => s.start());
  };
};

window.onload = async () => {
  await init();
};
