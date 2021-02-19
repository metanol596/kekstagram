import { isEscapeEvent } from './utils.js';
import { createPhotos } from './data.js';
import { getThumbnailsMarkup } from './image-thumbnails.js';
import {
  fillFullImage,
  setComments,
  fullImageSection,
  commentCount,
  commentsLoader
} from './full-image-modal.js';

// Отрисовка миниатюр

const thumbnailsContainer = document.querySelector('.pictures');
const photos = createPhotos();

const thumbnailsMarkup = getThumbnailsMarkup(photos);
thumbnailsContainer.appendChild(thumbnailsMarkup);

// Модальное окно с полноразмерным изображением
const thumbnail = thumbnailsContainer.querySelectorAll('.picture');
const body = document.querySelector('body');

const onModalEscapeKeydown = (evt) => {
  if (isEscapeEvent(evt)) {
    evt.preventDefault();
    closeFullImageModal();
  }
};

const openFullImageModal = () => {
  fullImageSection.classList.remove('hidden');
  document.addEventListener('keydown', onModalEscapeKeydown);
  body.classList.add('modal-open');
}

const closeFullImageModal = () => {
  fullImageSection.classList.add('hidden');
  document.removeEventListener('keydown', onModalEscapeKeydown);
  body.classList.remove('modal-open');
}

const closeFullImageButton = fullImageSection.querySelector('.big-picture__cancel');

thumbnail.forEach((item, i) => {
  item.addEventListener('click', (evt) => {
    evt.preventDefault();
    openFullImageModal();
    commentsLoader.classList.add('hidden');
    commentCount.classList.add('hidden');
    fillFullImage(photos[i]);
    setComments(photos[i]);
  });

  closeFullImageButton.addEventListener('click', () => {
    closeFullImageModal();
  });
});
