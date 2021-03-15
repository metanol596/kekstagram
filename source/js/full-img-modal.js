import { isEscapeEvent, checkOpenModalClass } from './utils.js';

const MAX_DISPLAYED_COMMENTS_COUNT = 5;

const fullImageSection = document.querySelector('.big-picture');
const fullImageContainer = fullImageSection.querySelector('.big-picture__img');
const fullImageLIkesContainer = fullImageSection.querySelector('.likes-count');
const fullImageCommentsContainer = fullImageSection.querySelector('.comments-count');
const fullImage = fullImageContainer.querySelector('img');
const commentsBlock = document.querySelector('.social__comments');
const commentCaption = fullImageSection.querySelector('.social__caption');
const commentCount = fullImageSection.querySelector('.social__comment-count');
const commentsLoaderButton = fullImageSection.querySelector('.comments-loader');
let renderedCommentsCount = MAX_DISPLAYED_COMMENTS_COUNT;

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

const setComments = (picture) => {
  const startLoadedComments = commentsBlock.childElementCount;
  const commentsLength = picture.comments.length;
  const comments = picture.comments;
  commentCaption.textContent = picture.description;
  commentsBlock.innerHTML = '';

  if (commentsLength > 0 && commentsLength <= MAX_DISPLAYED_COMMENTS_COUNT) {
    commentsLoaderButton.classList.add('hidden');
    comments.forEach((item) => {
      createCommentMarkup(item);
      commentCount.innerHTML = `${commentsLength} из <span class="comments-count">${commentsLength}</span> комментариев`;
    })
  }

  if (commentsLength > MAX_DISPLAYED_COMMENTS_COUNT) {
    commentsLoaderButton.classList.remove('hidden');
    const previousLoadedComments = comments.slice(0, MAX_DISPLAYED_COMMENTS_COUNT);
    previousLoadedComments.forEach((item) => {
      createCommentMarkup(item);
      commentCount.innerHTML = `${commentsBlock.childElementCount} из <span class="comments-count">${commentsLength}</span> комментариев`;
    })
    commentsLoaderButton.addEventListener('click', ()=> {
      const nextLoadedCommemnts = comments.slice(startLoadedComments, (startLoadedComments + MAX_DISPLAYED_COMMENTS_COUNT));
      nextLoadedCommemnts.forEach((item) => {
        createCommentMarkup(item);
        commentCount.innerHTML = `${commentsBlock.childElementCount} из <span class="comments-count">${commentsLength}</span> комментариев`;
      })
      const remainderLoadedComments = comments.slice(-1, (commentsLength - commentsBlock.childElementCount));
      remainderLoadedComments.forEach((item) => {
        createCommentMarkup(item);
        commentCount.innerHTML = `${commentsBlock.childElementCount} из <span class="comments-count">${commentsLength}</span> комментариев`;
      })
      if (commentsBlock.childElementCount === commentsLength) {
        commentsLoaderButton.classList.add('hidden');
      }
    });
  }
};

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
