import {
  createPhotoDescFunction,
  thumbnailsListFragment
} from './main.js'

const thumbnailsContainer = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content;
const thumbnailTemplateItem = thumbnailTemplate.querySelector('.picture');

const getThumbnailsContainer = () => {
  return thumbnailsContainer;
}

export {
  getThumbnailsContainer
}

const getThumbnailsFunction = () => {
  createPhotoDescFunction();

  const photoAuthorsArray = createPhotoDescFunction();

  photoAuthorsArray.forEach((picture) => {
    const cloneThumbnailTemplateItem = thumbnailTemplateItem.cloneNode(true);
    const imageTemplate = cloneThumbnailTemplateItem.querySelector('.picture__img');
    const likesTemplate = cloneThumbnailTemplateItem.querySelector('.picture__likes');
    const commentsTemplate = cloneThumbnailTemplateItem.querySelector('.picture__comments');

    imageTemplate.src = picture.url;
    likesTemplate.textContent = picture.likes;
    commentsTemplate.textContent = picture.comments.length;

    thumbnailsListFragment.appendChild(cloneThumbnailTemplateItem);
  });

  return thumbnailsContainer.appendChild(thumbnailsListFragment);
}

export {
  getThumbnailsFunction
}
