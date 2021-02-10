const NAMES = [
  'Екатерина',
  'Иван',
  'Александр',
  'Николай',
  'Владимир',
];

const PHOTO_DESCRIPTIONS = [
  'Горячие ванны',
  'Купил новую машинуу',
  'Отлично отдохнула',
  'Бабушкин компот',
  'Красивый закат',
];

const MESSAGES_FOR_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NUMBER_OF_AUTHORS = 25;

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
checkStringLength('Мама мыла раму', 15);

const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

const createPhotoDescFunc = () => {
  let photoAuthorsArr = [];
  for (let i = 0; i < NUMBER_OF_AUTHORS; i++) {
    const id = i + 1;
    photoAuthorsArr.push({
      id,
      url: 'photos/' + id + '.jpg',
      description: getRandomArrayElement(PHOTO_DESCRIPTIONS),
      likes: getRandomInteger(20, 200),
      comments: {
        commentId: id + 1,
        avatar: 'img/avatar-' + getRandomInteger(1,6) + '.svg',
        name: getRandomArrayElement(NAMES),
        message: getRandomArrayElement(MESSAGES_FOR_COMMENTS),
      },
    });
  }
  return photoAuthorsArr;
}
createPhotoDescFunc();
