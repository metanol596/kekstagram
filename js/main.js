import './utils.js';
import {
  createPhotoDescFunction
} from './data.js';

// Отрисовка миниатюр

const thumbnailsListFragment = document.createDocumentFragment();

export {
  createPhotoDescFunction,
  thumbnailsListFragment
}

import {
  getThumbnailsFunction
} from './image-thumbnails.js'

getThumbnailsFunction();

// Полноразмерное изображение

import {
  getFullImageSection
} from './full-image.js'

getFullImageSection();

import {
  getFullImageFunction
} from './full-image.js'

getFullImageFunction();
