import { getThumbnailsMarkup } from './img-thumbnails.js';
import {shufflePhotos} from './utils.js';
/* global _:readonly */
const RERENDER_DELAY = 2000;
const PHOTOS_COUNT = 25;
const RANDOM_PHOTOS_COUNT = 10;

const thumbnailsContainer = document.querySelector('.pictures');

let originalPhotos = [];

const setOriginalPhotos = (photos) => {
  originalPhotos = [...photos];
};

const filters = {
  'filter-default': () => originalPhotos.slice(0, PHOTOS_COUNT),
  'filter-random': () => shufflePhotos(originalPhotos, RANDOM_PHOTOS_COUNT),
  'filter-discussed': () => originalPhotos.slice(0, PHOTOS_COUNT).sort((a, b) => {
    return b.comments.length - a.comments.length;
  }),
}

const renderPhotosMarkup = (photos) => {
  const thumbnailsMarkup = getThumbnailsMarkup(photos);
  thumbnailsContainer.appendChild(thumbnailsMarkup);
}

const applyPhotosFilter = _.debounce((evt) => {
  const button = evt.target.closest('.img-filters__button');
  const filterType = button.id;
  const filter = filters[filterType];
  const filteredPhotos = filter();
  renderPhotosMarkup(filteredPhotos);
},
RERENDER_DELAY);

const onImgFiltersButtonsContainerClick = (evt) => {
  const button = evt.target.closest('.img-filters__button');
  const activeButton = document.querySelector('.img-filters__button--active');
  activeButton.classList.remove('img-filters__button--active');
  button.classList.add('img-filters__button--active');
  applyPhotosFilter(evt);
}

export {
  applyPhotosFilter,
  setOriginalPhotos,
  onImgFiltersButtonsContainerClick,
  renderPhotosMarkup
}
