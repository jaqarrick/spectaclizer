const containerId = 'container';
const splash = document.querySelector('.splash')
const eyeContainer = document.querySelector('.eye-container')

const onVideoLoaded = async () => Promise.resolve()

const init = async () => {
  const players = await loadVideos()
  
};

window.onload = async () => {
  await init();
};

const displaySplashScreen = () => {
  eyeContainer.classList.add('spin')
  splash.style.display = 'flex'
}

const hideSplashScreen = () => {
  splash.style.display = 'none'
}

const removeSpinAnimation = () => {
  eyeContainer.classList.remove('spin')
}

const loadVideos = async () => {
  displaySplashScreen()
  const videos = await fetchInitialData();
  const spectaclePromises = videos.map(
    async ({ videoId, type }) => {
      const s = new Spectaclizer({
        videoId,
        type,
        containerId,
      })
      await s.playerReadyPromise
      return s
    }
  );
  const spectacles = await Promise.all(spectaclePromises)
  eyeContainer.onclick = () => {
    spectacles.forEach(s => s.start())
    hideSplashScreen()
  }
  removeSpinAnimation()
  return spectacles

}