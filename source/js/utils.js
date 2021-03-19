const checkStringLength = (checkedString, maxStringLength) => {
  const stringLength = checkedString.textLength;
  const WARNING_MESSAGE = `Длина сообщения - ${stringLength} / ${maxStringLength}`;
  if (stringLength > maxStringLength) {
    checkedString.setCustomValidity(WARNING_MESSAGE);
  } else {
    checkedString.setCustomValidity('');
  }
  checkedString.reportValidity();
};

const isEscapeEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

const checkOpenModalClass = () => {
  const body = document.querySelector('body');
  body.classList.contains('modal-open') ? body.classList.remove('modal-open') : body.classList.add('modal-open');
};

const setErrorIndicator = (input) => {
  input.style.outline = '2px auto red';
};

const shufflePhotos = (photos, randomPhotosCount) => {
  let currentElement = photos.length;
  while (currentElement !== 0) {
    let randomElement = Math.floor(Math.random() * currentElement);
    currentElement -= 1;
    let swap = photos[currentElement];
    photos[currentElement] = photos[randomElement];
    photos[randomElement] = swap;
  }
  return photos.slice(0, randomPhotosCount);
};

export {
  checkStringLength,
  isEscapeEvent,
  checkOpenModalClass,
  setErrorIndicator,
  shufflePhotos
};
