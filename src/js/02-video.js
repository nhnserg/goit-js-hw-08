import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const saveCurrentTime = throttle(() => {
  const iframe = document.getElementById('vimeo-player');
  const player = new Player(iframe);

  player.getCurrentTime().then(currentTime => {
    localStorage.setItem('videoplayer-current-time', currentTime);
  });
}, 1000);

function initializePlayer() {
  const iframe = document.getElementById('vimeo-player');
  const player = new Player(iframe);

  player.on('timeupdate', () => {
    saveCurrentTime();
  });

  const savedTime = localStorage.getItem('videoplayer-current-time', '120');
  if (savedTime !== null) {
    player.setCurrentTime(savedTime).then(() => {
      return;
    });
  }
}

initializePlayer();
