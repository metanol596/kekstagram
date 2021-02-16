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

export {
  getRandomInteger,
  checkStringLength,
  getRandomArrayElement
};
