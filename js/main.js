const getRandomInteger = (minValue, maxValue) => {
  if (maxValue - minValue < 0) {
    alert('Диапазон должен быть положительным!');
  }

  // https://learn.javascript.ru/number#sluchaynoe-tseloe-chislo-ot-min-do-max
  return Math.floor(Math.random() * (maxValue + 1 - minValue) + minValue);
}

alert(getRandomInteger(-10, 10));

const checkStringLength = (checkedString, maxStringLength) => {
  return (checkedString.length <= maxStringLength) ? true : false;
}

alert(checkStringLength('Мама мыла раму', 15));
