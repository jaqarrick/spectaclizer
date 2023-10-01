class Spectaclizer {
  constructor({ videoId, containerId, type }) {
    const playerId = `player-${videoId}`;
    this.playerId = playerId;
    this.containerId = containerId;
    this.videoId = videoId;
    this.type = type;

    this.render();
    this.initPlayer();
  }

  render = () => {
    const containerElement = document.querySelector(`#${this.containerId}`);
    this.container = containerElement;
    if (!containerElement) {
      throw new Error('Container element not defined.');
    }
    this.playerElement = document.createElement('div');
    this.playerElement.id = this.playerId;
    containerElement.appendChild(this.playerElement);

    if (this.type === 'background') {
      this.playerElement.classList.add('background');
    } else if (this.type === 'audio') {
      this.playerElement.style.position = 'absolute';
      this.playerElement.style.opacity = 0;
    } else if (this.type === 'floater') {
      const wrapper = document.createElement('div');
      wrapper.classList.add('floater-wrapper');
      wrapper.appendChild(this.playerElement);
      containerElement.appendChild(wrapper);
      const initialPosition = getRandomPosition(container, wrapper);
      const xDirection = getRandomDirection();
      const yDirection = getRandomDirection();

      // Set the initial position and move with the random directions
      wrapper.style.left = initialPosition.x + 'px';
      wrapper.style.top = initialPosition.y + 'px';
      const speed = Math.random() * 2 + 0.2;
      moveFloatingElement(
        this.container,
        wrapper,
        xDirection,
        yDirection,
        speed,
      );
      this.playerElement.classList.add('floater');
    }
  };

  initPlayer = () => {
    this.player = new YT.Player(this.playerId, {
      videoId: this.videoId,
      playerVars: {
        autoplay: 1,
        controls: 0,
        rel: 0,
        mute: 1,
        showinfo: 0,
        loop: 1,
        disablekb: 1,
        cc_load_policy: 0,
      },
      events: {
        onReady: this.onPlayerReady, // Function to call when the player is ready.
        onStateChange: function (event) {
          if (event.data === YT.PlayerState.ENDED) {
            event.target.playVideo();
          }
        },
      },
    });
  };

  applyVisualEffects = (element) => {
    if (this.type === 'floater') {
      element.style.filter =
        'hue-rotate(1deg) saturate(300%) contrast(150%) brightness(300%)';
    } else {
      element.style.filter =
        'hue-rotate(1deg) saturate(1%) contrast(150%) brightness(300%)';
      element.style.transform = 'scale(4, 2)'; // This example scales by a factor of 1.5 in both directions
    }
  };

  onPlayerReady = (event) => {
    if (this.type !== 'background') {
      this.player.unMute();
    }

    if (this.type === 'background') {
      this.player.setPlaybackRate(2);
    }

    if (this.type === 'floater') {
      this.player.setPlaybackRate(0.5);
    }
    this.applyVisualEffects(event.target.g);
  };

  start = () => {
    if (!this.player) {
      throw new Error('Player has not been initialized');
    }
    this.player.playVideo();
  };
}
