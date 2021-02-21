import {
  isEscapeEvent
} from './utils.js';
import {
  createPhotos
} from './data.js';
import {
  getThumbnailsMarkup
} from './image-thumbnails.js';
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

const body = document.querySelector('body');

const onModalEscapeKeydown = (evt) => {
  if (isEscapeEvent(evt)) {
    evt.preventDefault();
    closeFullImageModal();
  }
};

const closeFullImageButton = fullImageSection.querySelector('.big-picture__cancel');

const openFullImageModal = (evt) => {

  if (evt.target && evt.target.closest('.picture')) {
    evt.preventDefault();
    fullImageSection.classList.remove('hidden');
    body.classList.add('modal-open');
    document.addEventListener('keydown', onModalEscapeKeydown);
    commentsLoader.classList.add('hidden');
    commentCount.classList.add('hidden');
    const currentImage = parseInt(evt.target.dataset.number);
    fillFullImage(photos[currentImage]);
    setComments(photos[currentImage]);
  }
}

const closeFullImageModal = () => {
  fullImageSection.classList.add('hidden');
  document.removeEventListener('keydown', onModalEscapeKeydown);
  body.classList.remove('modal-open');
}
thumbnailsContainer.addEventListener('click', openFullImageModal);

closeFullImageButton.addEventListener('click', closeFullImageModal);
