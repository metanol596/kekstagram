const fullImageSection = document.querySelector('.big-picture');
const fullImageContainer = fullImageSection.querySelector('.big-picture__img');
const fullImageLIkesContainer = fullImageSection.querySelector('.likes-count');
const fullImageCommentsContainer = fullImageSection.querySelector('.comments-count');
const fullImage = fullImageContainer.querySelector('img');

fullImageSection.classList.remove('hidden');

const getFullImageSection = () => {
  return fullImageSection;
}

export {
  getFullImageSection
}

import {
  createPhotoDescFunction
} from './data.js'

const getFullImageFunction = () => {
  const photoAuthorsArray = createPhotoDescFunction();

  photoAuthorsArray.forEach((picture) => {
    fullImage.src = picture.url;
    fullImageLIkesContainer.textContent = picture.likes;
    fullImageCommentsContainer.textContent = picture.comments.length;
  })
}

export {
  getFullImageFunction
}
