import { isEscapeEvent, checkOpenModalClass } from './utils.js';

const MAX_COMMENTS_COUNT = 5;

let renderedCommentsCount = MAX_COMMENTS_COUNT;
const fullImageSection = document.querySelector('.big-picture');
const fullImageContainer = fullImageSection.querySelector('.big-picture__img');
const fullImageLIkesContainer = fullImageSection.querySelector('.likes-count');
const fullImageCommentsContainer = fullImageSection.querySelector('.comments-count');
const fullImage = fullImageContainer.querySelector('img');
const commentsBlock = document.querySelector('.social__comments');
const commentItems = commentsBlock.querySelectorAll('.social__comment');
const commentCaption = fullImageSection.querySelector('.social__caption');
const commentCount = fullImageSection.querySelector('.social__comment-count');
const commentsLoaderButton = fullImageSection.querySelector('.comments-loader');
let comments = [];

const fillFullImage = (picture) => {
  fullImage.src = picture.url;
  fullImageLIkesContainer.textContent = picture.likes;
  fullImageCommentsContainer.textContent = picture.comments.length;
  commentsBlock.innerHTML = '';
  comments = picture.comments;

  if (comments.length > 0) {
    renderCommentsMarkup();
  }

  if (comments.length > MAX_COMMENTS_COUNT) {
    commentsLoaderButton.classList.remove('hidden');
    commentsLoaderButton.addEventListener('click', oncommentsLoaderButtonClick);
  } else if (comments.length <= MAX_COMMENTS_COUNT) {
    commentsLoaderButton.classList.add('hidden');
  }
  // oncommentsLoaderButtonClick(picture);
};



const setComments = (picture) => {
  commentCaption.textContent = picture.description;
  commentItems.forEach((item, i) => {
    const commentAvatar = item.querySelector('.social__picture');
    const commentText = item.querySelector('.social__text');

    commentAvatar.src = picture.comments[i].avatar;
    commentAvatar.alt = picture.comments[i].name;
    commentText.textContent = picture.comments[i].message;
    // comments = picture.comments;
  })
};

const cleanComments = () => {
  commentItems.forEach((item) => {
    item.remove();
  })
}

const closeFullImageButton = fullImageSection.querySelector('.big-picture__cancel');

const onWindowKeydown = (evt) => {
  if (isEscapeEvent(evt)) {
    evt.preventDefault();
    onCloseFullImageButtonClick();
  }
};

const oncommentsLoaderButtonClick = () => {
  cleanComments();
  renderedCommentsCount += MAX_COMMENTS_COUNT;
  renderCommentsMarkup();
  commentCount.innerHTML = `${commentsBlock.children.length} из <span class="comments-count">${comments.length}</span> комментариев`;
}

const renderCommentsMarkup = () => {
  comments.slice(0, renderedCommentsCount).forEach((element) => {
    const item = document.createElement('li');
    item.classList.add('social__comment');
    item.innerHTML = `<img class="social__picture" src="${element.avatar}" alt="${element.name}" width="35" height="35">
    <p class="social__text">${element.message}</p>`;
    commentsBlock.appendChild(item);
    if (commentItems.length === comments.length) {
      commentsLoaderButton.classList.add('hidden');
    }
  })
}

const openFullImageModal = (picture) => {
  checkOpenModalClass();
  window.addEventListener('keydown', onWindowKeydown);
  fullImageSection.classList.remove('hidden');
  fillFullImage(picture);
  setComments(picture);
  commentsLoaderButton.addEventListener('click', oncommentsLoaderButtonClick);
};

const onCloseFullImageButtonClick = () => {
  fullImageSection.classList.add('hidden');
  window.removeEventListener('keydown', onWindowKeydown);
  checkOpenModalClass();
  cleanComments();
  commentsLoaderButton.classList.add('hidden');
  renderedCommentsCount = MAX_COMMENTS_COUNT;
};

closeFullImageButton.addEventListener('click', onCloseFullImageButtonClick);

export { openFullImageModal, fillFullImage }
