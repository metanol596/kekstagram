import '../css/normalize.css'
import '../css/style.css';
import '../index.html';

import './img-scale.js';
import './upload-img-form.js';
import './img-effects.js';
import './form-validation.js';
import { getData } from './api.js';
import './insert-image.js';
import {
  setOriginalPhotos,
  onImgFiltersButtonsContainerClick,
  renderPhotosMarkup
} from './img-filter-handlers.js';
import { openFullImageModal } from './full-img-modal.js';

const DOWNLOAD_DATA_URL = 'https://22.javascript.pages.academy/kekstagram/data' ;

const imgFiltersButtonsContainer = document.querySelector('.img-filters__form');
const thumbnailsContainer = document.querySelector('.pictures');
const imgFiltersBlock = document.querySelector('.img-filters');
getData(DOWNLOAD_DATA_URL, (photos) => {
  setOriginalPhotos(photos);
  imgFiltersBlock.classList.remove('img-filters--inactive');
  renderPhotosMarkup(photos);
  imgFiltersButtonsContainer.addEventListener('click', onImgFiltersButtonsContainerClick);
  thumbnailsContainer.addEventListener('click', (evt) => {
    const targetPicture = evt.target.closest('.picture');
    if (evt.target && targetPicture) {
      evt.preventDefault();
      const currentImage = evt.target.id;
      const photo = photos[currentImage];
      openFullImageModal(photo);
    }
  })
});
