import {
  isEscapeEvent,
  isOpenModalClass
} from './utils.js';

const fullImageSection = document.querySelector('.big-picture');
const fullImageContainer = fullImageSection.querySelector('.big-picture__img');
const fullImageLIkesContainer = fullImageSection.querySelector('.likes-count');
const fullImageCommentsContainer = fullImageSection.querySelector('.comments-count');
const fullImage = fullImageContainer.querySelector('img');

const fillFullImage = (picture) => {
  fullImage.src = picture.url;
  fullImageLIkesContainer.textContent = picture.likes;
  fullImageCommentsContainer.textContent = picture.comments.length;
}

const commentsBlock = document.querySelector('.social__comments');
const commentItem = commentsBlock.querySelectorAll('.social__comment');
const commentCaption = fullImageSection.querySelector('.social__caption');
const commentCount = fullImageSection.querySelector('.social__comment-count');
const commentsLoader = fullImageSection.querySelector('.comments-loader');

const setComments = (picture) => {
  commentCaption.textContent = picture.description;
  commentItem.forEach((item, i) => {
    const commentAvatar = item.querySelector('.social__picture');
    const commentText = item.querySelector('.social__text');

    commentAvatar.src = picture.comments[i].avatar;
    commentAvatar.alt = picture.comments[i].name;
    commentText.textContent = picture.comments[i].message;
  })
}

const closeFullImageButton = fullImageSection.querySelector('.big-picture__cancel');

const onModalEscapeKeydown = (evt) => {
  if (isEscapeEvent(evt)) {
    evt.preventDefault();
    onCloseFullImageButtonClick();
  }
}

const openFullImageModal = (picture) => {
  isOpenModalClass();
  document.addEventListener('keydown', onModalEscapeKeydown);
  fullImageSection.classList.remove('hidden');
  commentsLoader.classList.add('hidden');
  commentCount.classList.add('hidden');
  fillFullImage(picture);
  setComments(picture);
}

const onCloseFullImageButtonClick = () => {
  fullImageSection.classList.add('hidden');
  document.removeEventListener('keydown', onModalEscapeKeydown);
  isOpenModalClass();
}

closeFullImageButton.addEventListener('click', onCloseFullImageButtonClick);

export {
  openFullImageModal
};
