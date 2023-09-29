var player
const onPlayerReady = (event) => {
  player.playVideo();
};
var playButton = document.querySelector("#play-btn")


playButton.onclick = () => {
  document.getElementById('video-overlay').style.display = 'none';

  onYouTubeIframeAPIReady()
}

const onPlayerStateChange = (event) => {
  console.log(event);
  console.log(YT.PlayerState)
  const { BUFFERING, UNSTARTED } = YT.PlayerState
  if(event.data === UNSTARTED){
    console.log('playing video')
   player.playVideo()
  }

};
const onYouTubeIframeAPIReady = () => {
  console.log('ready')
  player = new YT.Player("player", {
    videoId: "KbJ7gDML4pA", // Replace with your YouTube video ID.
    playerVars: {
      autoplay: 1, // Set to 1 to autoplay the video.
      controls: 0, // Show video controls.
      rel: 0, // Don't show related videos after playback.
      mute: 0,
      showinfo: 0
    },
    events: {
      onReady: onPlayerReady, // Function to call when the player is ready.
      onStateChange: onPlayerStateChange, // Function to call when the player's state changes.
    },
  });
};


  // Add event listeners to prevent cascading mouse events
  const playerDiv = document.getElementById("player");

  playerDiv.addEventListener("mouseenter", (event) => {
    event.preventDefault(); // Prevent default mouseenter behavior
  });

  playerDiv.addEventListener("mouseleave", (event) => {
    event.preventDefault(); // Prevent default mouseleave behavior
  });