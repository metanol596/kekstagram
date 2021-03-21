import './img-scale.js';
import './upload-img-form.js';
import './img-effects.js';
import './form-validation.js';
import { getData } from './api.js';
import './insert-image.js';
import {
  setOriginalPhotos,
  onImgFiltersButtonsContainerClick,
  onThumbnailsContainerClick,
  onThumbnailsContainerMouseover
} from './img-filter-handlers.js';
import { getThumbnailsMarkup } from './img-thumbnails.js';

const DOWNLOAD_DATA_URL = 'https://22.javascript.pages.academy/kekstagram/data' ;

const imgFiltersButtonsContainer = document.querySelector('.img-filters__form');
const thumbnailsContainer = document.querySelector('.pictures');
const imgFiltersBlock = document.querySelector('.img-filters');
getData(DOWNLOAD_DATA_URL, (photos) => {
  setOriginalPhotos(photos);
  const thumbnailsMarkup = getThumbnailsMarkup(photos);
  thumbnailsContainer.appendChild(thumbnailsMarkup);
  imgFiltersBlock.classList.remove('img-filters--inactive');
  imgFiltersButtonsContainer.addEventListener('click', onImgFiltersButtonsContainerClick);
  // applyPhotosFilter();
  thumbnailsContainer.addEventListener('mouseover', onThumbnailsContainerMouseover);
  thumbnailsContainer.addEventListener('click', onThumbnailsContainerClick);
});

