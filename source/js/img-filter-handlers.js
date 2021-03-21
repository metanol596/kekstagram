import { getThumbnailsMarkup, removePictureNodes } from './img-thumbnails.js';
import {shufflePhotos} from './utils.js';
import { openFullImageModal } from './full-img-modal.js';
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

const onThumbnailsContainerMouseover = (evt) => {
  if (evt.target && evt.target.closest('.picture__info')) {
    evt.target.style.pointerEvents = 'none';
  }
}

const onThumbnailsContainerClick = (evt) => {
  const targetPicture = evt.target.closest('.picture');
  if (evt.target && targetPicture) {
    evt.preventDefault();
    const currentImage = parseInt(evt.target.dataset.number);
    const photo = originalPhotos[currentImage];
    openFullImageModal(photo);
    thumbnailsContainer.removeEventListener('click', onThumbnailsContainerClick);
  }
}

const applyPhotosFilter = _.debounce((evt) => {
  const button = evt.target.closest('.img-filters__button');
  const filterType = button.id;
  const filter = filters[filterType];
  originalPhotos = filter();
  const thumbnailsMarkup = getThumbnailsMarkup(originalPhotos);
  thumbnailsContainer.appendChild(thumbnailsMarkup);
  thumbnailsContainer.addEventListener('click', onThumbnailsContainerClick);
  thumbnailsContainer.addEventListener('mouseover', onThumbnailsContainerMouseover);
},
RERENDER_DELAY);

const onImgFiltersButtonsContainerClick = (evt) => {
  const button = evt.target.closest('.img-filters__button');
  const activeButton = document.querySelector('.img-filters__button--active');
  activeButton.classList.remove('img-filters__button--active');
  button.classList.add('img-filters__button--active');
  applyPhotosFilter(evt);
  removePictureNodes();
}

export {
  applyPhotosFilter,
  setOriginalPhotos,
  onImgFiltersButtonsContainerClick,
  onThumbnailsContainerClick,
  onThumbnailsContainerMouseover
}
