const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAGS = 5;
const VALID_SYMBOLS = /^#[a-z\dа-я]+$/i;

const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const isValidHashtag = (item) => {
  return item !== '' && !(item.match(VALID_SYMBOLS));
}

const isDoubledHashtag = (array) => {
  return new Set(array).size !== array.length;
}

const onHashtagInputInvalid = () => {
  const hashtags = hashtagsInput.value.toLowerCase().trim().split(' ');
  hashtags.forEach((item, i, array) => {
    if (array.length > 1 && array[i - 1] === '') {
      hashtagsInput.setCustomValidity('Удалите пробелы');
    } else if (array.length > MAX_HASHTAGS) {
      hashtagsInput.setCustomValidity(`Не более ${MAX_HASHTAGS} хэштегов`);
    } else if (item.length > MAX_HASHTAG_LENGTH) {
      hashtagsInput.setCustomValidity(`Хэштег должен быть короче ${MAX_HASHTAG_LENGTH} символов`);
    } else if (isDoubledHashtag(array)) {
      hashtagsInput.setCustomValidity('Такой хэштег уже есть');
    } else if (isValidHashtag(item)) {
      hashtagsInput.setCustomValidity('Хэштег должен начинаться с #, содержать только буквы и цифры и не может быть пустым');
    } else if (array.length === 1 && item === '') {
      hashtagsInput.setCustomValidity('');
    } else {
      hashtagsInput.setCustomValidity('');
    }
  })
  hashtagsInput.reportValidity();
}

const onCommentInputInput = () => {
  const commentLength = commentInput.textLength;
  const WARNING_MESSAGE = `Длина комментария - ${commentLength} / ${MAX_COMMENT_LENGTH}`;
  if (commentLength > MAX_COMMENT_LENGTH) {
    commentInput.setCustomValidity(WARNING_MESSAGE);
  } else {
    commentInput.setCustomValidity('');
  }
  commentInput.reportValidity();
}

export {
  onCommentInputInput,
  onHashtagInputInvalid,
  hashtagsInput,
  commentInput
};
