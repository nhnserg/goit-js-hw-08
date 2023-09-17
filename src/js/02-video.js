import Player from '@vimeo/player';
import { async } from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.getElementById('vimeo-player');
const player = new Player(iframe);
// Функция, которая сохраняет текущее время воспроизведения
const saveCurrentTime = throttle(async () => {
  const currentTime = await player.getCurrentTime();
  localStorage.setItem('videoplayer-current-time', currentTime);
}, 1000); //Ограничиваем вызов функции не чаще, чем раз в секунду

// Слушаем событие Timeupdate
player.on('timeupdate', saveCurrentTime);

// Получаем время локального хранилища и устанавливаем его при загрузке страницы
const savedTime = localStorage.getItem('videoplayer-current-time');
if (savedTime !== null) {
  player.setCurrentTime(savedTime).then(() => {
    player.play();
  });
}
