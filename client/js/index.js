const containerId = 'container';
const splash = document.querySelector('.splash');
const eyeContainer = document.querySelector('.eye-container');
const linkButton = document.querySelector('#get-link-button');
const reloadButton = document.querySelector('#reload-button');
const onVideoLoaded = async () => Promise.resolve();

const init = async () => {
  const players = await loadVideos();
  reloadButton.onclick = async () => {
    const newPlayers = await loadVideos();
    return newPlayers;
  };
};

const getUrlWithIds = (videos) => {
  const currentURL = window.location.href;
  const url = new URL(currentURL);

  videos.forEach(({ videoId, type }) => {
    const key = type === 'floater' ? 'f' : type === 'background' ? 'b' : 'a';
    url.searchParams.append(key, videoId);
  });
  const updatedURL = url.toString();
  return updatedURL;
};

window.onload = async () => {
  await init();
};

const displaySplashScreen = () => {
  eyeContainer.classList.add('spin');
  splash.style.display = 'flex';
};

const hideSplashScreen = () => {
  splash.style.display = 'none';
};

const removeSpinAnimation = () => {
  eyeContainer.classList.remove('spin');
};

const loadVideos = async () => {
  displaySplashScreen();
  const videos = await fetchInitialData();

  const spectaclePromises = videos.map(async ({ videoId, type }) => {
    const delay = Math.random() * 100;
    const s = new Spectaclizer({
      videoId,
      type,
      containerId,
      animationDelay: delay,
    });
    await s.playerReadyPromise;
    return s;
  });
  const spectacles = await Promise.all(spectaclePromises);
  eyeContainer.onclick = () => {
    spectacles.forEach((s) => s.start());
    hideSplashScreen();
  };

  window.addEventListener('keydown', (event) => {
    if (event.metaKey && event.key === 'l') {
      event.preventDefault();
      const url = getUrlWithIds(videos);
      navigator.clipboard.writeText(url).then(
        () => {
          console.log('Content copied to clipboard');
        },
        () => {
          console.error('Failed to copy');
        },
      );
    }
  });
  linkButton.onclick = () => {
    const url = getUrlWithIds(videos);
    navigator.clipboard.writeText(url).then(
      () => {
        console.log('Content copied to clipboard');
        /* Resolved - text copied to clipboard successfully */
      },
      () => {
        console.error('Failed to copy');
        /* Rejected - text failed to copy to the clipboard */
      },
    );
  };
  removeSpinAnimation();
  return spectacles;
};
