/* global _:readonly */
import './upload-img-form.js';
import './img-scale.js';
import './img-effects.js';
import './form-validation.js';
import { getData } from './api.js';
import { getThumbnailsMarkup } from './img-thumbnails.js';
import { openFullImageModal } from './full-img-modal.js';
import {setDefaultHandler, setRandomHandler, setDiscussedHandler} from './img-filter-handlers.js';
import {shufflePhotos} from './utils.js';

const PHOTOS_COUNT = 25;
const RANDOM_PHOTOS_COUNT = 10;
const RERENDER_DELAY = 500;
const DOWNLOAD_DATA_URL = 'https://22.javascript.pages.academy/kekstagram/data' ;

const thumbnailsContainer = document.querySelector('.pictures');
const imgFiltersBlock = document.querySelector('.img-filters');
getData(DOWNLOAD_DATA_URL, (photos) => {
  imgFiltersBlock.classList.remove('img-filters--inactive');
  const thumbnailsMarkup = getThumbnailsMarkup(photos.slice(0, PHOTOS_COUNT));
  thumbnailsContainer.appendChild(thumbnailsMarkup);
  setDefaultHandler(_.debounce(() => {
    const thumbnailsMarkup = getThumbnailsMarkup(photos.slice(0, PHOTOS_COUNT));
    thumbnailsContainer.appendChild(thumbnailsMarkup);
  },
  RERENDER_DELAY,
  ));
  setRandomHandler(_.debounce(() => {
    const randomPhotos = shufflePhotos(photos, RANDOM_PHOTOS_COUNT);
    const thumbnailsMarkup = getThumbnailsMarkup(randomPhotos);
    thumbnailsContainer.appendChild(thumbnailsMarkup);
  },
  RERENDER_DELAY,
  ));
  setDiscussedHandler(_.debounce(() => {
    const thumbnailsMarkup = getThumbnailsMarkup(photos.slice(0, PHOTOS_COUNT).sort((a, b) => {
      return b.comments.length - a.comments.length;
    }));
    thumbnailsContainer.appendChild(thumbnailsMarkup);
  },
  RERENDER_DELAY,
  ));
  thumbnailsContainer.addEventListener('click', (evt) => {
    if (evt.target && evt.target.closest('.picture')) {
      evt.preventDefault();
      const currentImage = parseInt(evt.target.dataset.number);
      const photo = photos[currentImage];
      openFullImageModal(photo);
    }
  });
});




