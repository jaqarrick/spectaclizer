class Spectaclizer {
  constructor({
    videoId,
    containerId,
    type }) {
    const playerId = `player-${videoId}`
    this.playerId = playerId
    this.containerId = containerId
    this.videoId = videoId
    this.type = type

    this.render()
    this.initPlayer()
  }

  render = () => {
    const containerElement = document.querySelector(`#${this.containerId}`)
    if (!containerElement) {
      throw new Error('Container element not defined.')
    }
    this.playerElement = document.createElement('div')
    this.playerElement.id = this.playerId
    containerElement.appendChild(this.playerElement)

    if (this.type === 'background') {
      this.renderAsBackground()
    } else if (this.type === 'audio') {
      this.renderAsAudioOnly()
    } else if (this.type === 'floater'){
      this.renderAsFloater()
    }
  }

  renderAsBackground = () => {
    //  todo, create style tag w class declarations
    this.playerElement.classList.add('background')
  }

  renderAsFloater = () => {
    this.playerElement.classList.add('floater')
  }

  renderAsAudioOnly = () => {
    this.playerElement.style.position = 'absolute'
    this.playerElement.style.opacity = 0
  }

  initPlayer = () => {
    this.player = new YT.Player(this.playerId, {
      videoId: this.videoId,
      playerVars: {
        autoplay: 0, // Set to 1 to autoplay the video.
        controls: 0, // Show video controls.
        rel: 0, // Don't show related videos after playback.
        mute: 1,
        showinfo: 0,
        loop: 1,
        disablekb: 1,
        cc_load_policy: 0
      },
      events: {
        onReady: this.onPlayerReady, // Function to call when the player is ready.
        // onStateChange: onPlayerStateChange, // Function to call when the player's state changes.
      },
    });
  }

  applyVisualEffects = (element) => {

    if(this.type === 'floater'){
      element.style.filter = 'hue-rotate(1deg) saturate(300%) contrast(150%) brightness(300%)';

    } else {
      element.style.filter = 'hue-rotate(1deg) saturate(1%) contrast(150%) brightness(300%)';
      element.style.transform = 'scale(4, 2)'; // This example scales by a factor of 1.5 in both directions
    }
  
  }

  onPlayerReady = (event) => {

    if (this.type !== 'background') {
      this.player.unMute()
    }

    if (this.type === 'background') {
      this.player.setPlaybackRate(2)
    }

    if(this.type === 'floater'){
      this.player.setPlaybackRate(0.5)
    }
    this.applyVisualEffects(event.target.g)
  }

  start = () => {
    if (!this.player) {
      throw new Error('Player has not been initialized')
    }
    this.player.playVideo()
  }
}

