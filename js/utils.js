const getRandomInteger = (minValue, maxValue) => {
  if (maxValue - minValue < 0) {
    return 'Диапазон должен быть положительным!';
  }

  // https://learn.javascript.ru/number#sluchaynoe-tseloe-chislo-ot-min-do-max
  return Math.floor(Math.random() * (maxValue + 1 - minValue) + minValue);
}

const checkStringLength = (checkedString, maxStringLength) => {
  return (checkedString.length <= maxStringLength) ? true : false;
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
