import { createPhotos } from './data.js';
import { getThumbnailsMarkup } from './image-thumbnails.js';
import { openFullImageModal } from './full-image-modal.js';
import './image-scale.js';
import './image-effects.js';
import './upload-image-form.js';
import './form-validation.js';

// Отрисовка миниатюр

const thumbnailsContainer = document.querySelector('.pictures');
const photos = createPhotos();

const thumbnailsMarkup = getThumbnailsMarkup(photos);
thumbnailsContainer.appendChild(thumbnailsMarkup);

// Модальное окно с полноразмерным изображением

const onThumbnailsContainerClick = (evt) => {
  if (evt.target && evt.target.closest('.picture')) {
    evt.preventDefault();
    const currentImage = parseInt(evt.target.dataset.number);
    const photo = photos[currentImage];
    openFullImageModal(photo);
  }
}

thumbnailsContainer.addEventListener('click', onThumbnailsContainerClick);
