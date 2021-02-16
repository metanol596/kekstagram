import {
  createPhotoDescFunction
} from './data.js';

const thumbnailsContainer = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content;
const thumbnailTemplateItem = thumbnailTemplate.querySelector('.picture');

const photoAuthorsArray = createPhotoDescFunction();

const thumbnailsListFragment = document.createDocumentFragment();

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

thumbnailsContainer.appendChild(thumbnailsListFragment);
