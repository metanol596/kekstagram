const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAGS = 5;
const VALID_SYMBOLS = /^#[a-z\dа-я]+$/i;
// str.match(regexp) - возвращает совпадения с рег выраж
// regexp.test(str) - проверяет есть ли совпадения = труе или фалсе
// startsWith/endsWith методы строк
const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const isValidHashtag = (item) => {
  return item !== '' && !(item.match(VALID_SYMBOLS));
}

const isDoubledHastag = (array) => {
  return new Set(array).size !== array.length;
}
const onHashtagInputInvalid = () => {
  const hashtags = hashtagsInput.value.trim().split(' ');
  hashtags.forEach((item, i, array) => {
    if (array.length > 1 && array[i - 1] === '') {
      hashtagsInput.setCustomValidity('Удалите пробелы');
    } else if (array.length > MAX_HASHTAGS) {
      hashtagsInput.setCustomValidity('Не более 5 хэштегов');
    } else if (item.length > MAX_HASHTAG_LENGTH) {
      hashtagsInput.setCustomValidity(`Хэштег должен быть короче ${MAX_HASHTAG_LENGTH} символов`);
    } else if (isDoubledHastag(array)) {
      hashtagsInput.setCustomValidity('Такой хэштег уже есть');
    } else if (isValidHashtag(item)) {
      hashtagsInput.setCustomValidity('Хэштег должен начинаться с # и содержать только буквы и цифры');
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

const getDescriptionFieldset = () => {
  return document.querySelector('.img-upload__text');
}

export {
  onCommentInputInput,
  onHashtagInputInvalid,
  getDescriptionFieldset,
  hashtagsInput,
  commentInput
};
