import { isEscapeEvent, checkOpenModalClass } from './utils.js';

const MAX_DISPLAYED_COMMENTS_COUNT = 5;

const fullImageSection = document.querySelector('.big-picture');
const fullImageContainer = fullImageSection.querySelector('.big-picture__img');
const fullImageLIkesContainer = fullImageSection.querySelector('.likes-count');
const fullImage = fullImageContainer.querySelector('img');
const commentsBlock = document.querySelector('.social__comments');
const commentCaption = fullImageSection.querySelector('.social__caption');
const commentCount = fullImageSection.querySelector('.social__comment-count');
const commentsLoaderButton = fullImageSection.querySelector('.comments-loader');

const fillFullImage = (picture) => {
  fullImage.src = picture.url;
  fullImageLIkesContainer.textContent = picture.likes;
};

const createCommentMarkup = (item) => {
  const comment = document.createElement('li');
  comment.classList.add('social__comment');
  comment.innerHTML = `<img class="social__picture" src="${item.avatar}" alt="${item.name}" width="35" height="35">
                      <p class="social__text">${item.message}</p>`;
  commentsBlock.appendChild(comment);
}

let startCount = MAX_DISPLAYED_COMMENTS_COUNT;
let comments;

const setComments = (picture) => {
  commentCaption.textContent = picture.description;
  commentsBlock.innerHTML = '';
  const commentsLength = picture.comments.length;
  comments = picture.comments;
  startCount = MAX_DISPLAYED_COMMENTS_COUNT;

  if (commentsLength <= MAX_DISPLAYED_COMMENTS_COUNT) {
    commentsLoaderButton.classList.add('hidden');
  } else {
    commentsLoaderButton.classList.remove('hidden');
  }

  const commentsToRender = commentsLength > MAX_DISPLAYED_COMMENTS_COUNT ? comments.slice(0, MAX_DISPLAYED_COMMENTS_COUNT) : comments;

  commentsToRender.forEach((item) => {
    createCommentMarkup(item);
  })
  commentCount.innerHTML = `${startCount > commentsLength ? commentsLength : startCount} из <span class="comments-count">${commentsLength}</span> комментариев`;
};

commentsLoaderButton.addEventListener('click', () => {
  const nextStep = startCount + MAX_DISPLAYED_COMMENTS_COUNT;
  const nextLoadedComments = comments.slice(startCount, nextStep);
  const commentsLength = comments.length;

  startCount = startCount + MAX_DISPLAYED_COMMENTS_COUNT;

  nextLoadedComments.forEach((item) => {
    createCommentMarkup(item);
  })

  if (startCount >= commentsLength) {
    commentsLoaderButton.classList.add('hidden');
  }

  commentCount.innerHTML = `${startCount > commentsLength ? commentsLength : startCount} из <span class="comments-count">${commentsLength}</span> комментариев`;
})

const cleanComments = () => {
  const commentItems = commentsBlock.querySelectorAll('.social__comment');
  commentItems.forEach((element) => {
    element.remove();
  })
}

const closeFullImageButton = fullImageSection.querySelector('.big-picture__cancel');

const onWindowKeydown = (evt) => {
  if (isEscapeEvent(evt)) {
    evt.preventDefault();
    onCloseFullImageButtonClick();
  }
};

const openFullImageModal = (picture) => {
  checkOpenModalClass();
  window.addEventListener('keydown', onWindowKeydown);
  fullImageSection.classList.remove('hidden');
  fillFullImage(picture);
  setComments(picture);
};

const onCloseFullImageButtonClick = () => {
  fullImageSection.classList.add('hidden');
  window.removeEventListener('keydown', onWindowKeydown);
  checkOpenModalClass();
  cleanComments();
};

closeFullImageButton.addEventListener('click', onCloseFullImageButtonClick);

export { openFullImageModal }
