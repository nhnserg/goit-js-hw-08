import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Импортируем данные галереи из отдельного файла
import { galleryItems } from './gallery-items.js';

document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.querySelector('.gallery');

  // Функция для создания HTML-структуры галереи
  function createGalleryHTML(items) {
    return items
      .map(
        item => `<li class="gallery__item">
          <a class="gallery__link" href="${item.original}">
            <img
              class="gallery__image"
              src="${item.preview}"
              alt="${item.description}"
            />
          </a>
        </li>`
      )
      .join('');
  }

  // Создание HTML-структуры галереи
  gallery.innerHTML = createGalleryHTML(galleryItems);

  // Активируем SimpleLightbox для галереи
  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionsPosition: 'bottom',
  });
});
