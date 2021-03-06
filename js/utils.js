const getRandomInteger = (minValue, maxValue) => {
  if (maxValue - minValue < 0) {
    return 'Диапазон должен быть положительным!';
  }

  // https://learn.javascript.ru/number#sluchaynoe-tseloe-chislo-ot-min-do-max
  return Math.floor(Math.random() * (maxValue + 1 - minValue) + minValue);
}

const checkStringLength = (checkedString, maxStringLength) => {
  const stringLength = checkedString.textLength;
  const WARNING_MESSAGE = `Длина сообщения - ${stringLength} / ${maxStringLength}`;
  if (stringLength > maxStringLength) {
    checkedString.setCustomValidity(WARNING_MESSAGE);
  } else {
    checkedString.setCustomValidity('');
  }
  checkedString.reportValidity();
}

const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

const isEscapeEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

const checkOpenModalClass = () => {
  const body = document.querySelector('body');
  body.classList.contains('modal-open') ? body.classList.remove('modal-open') : body.classList.add('modal-open');
}

export {
  getRandomInteger,
  checkStringLength,
  getRandomArrayElement,
  isEscapeEvent,
  checkOpenModalClass
};
