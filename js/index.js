const init = () => {
  const background = new Spectaclizer({ videoId: "XkfOebBYm-U", containerId: "container", type: 'background' })
  const audio = new Spectaclizer({videoId: '529wVt6Yg5I', containerId: "container", type: 'audio'})
  const floater = new Spectaclizer({videoId: 'crPoQKuP4pI', containerId: "container", type: 'floater'})
  document.querySelector('#play-btn').onclick = () => {
    background.start()
    audio.start()
    floater.start()
  }
  
};

window.onload = () => {
  init();
};


