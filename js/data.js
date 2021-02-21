import {
  getRandomInteger,
  getRandomArrayElement
} from './utils.js';

const NAMES = [
  'Екатерина',
  'Иван',
  'Александр',
  'Николай',
  'Владимир',
];

const DESCRIPTIONS = [
  'Горячие ванны',
  'Купил новую машинуу',
  'Отлично отдохнула',
  'Бабушкин компот',
  'Красивый закат',
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const AUTHORS_AMOUNT = 25;
const LIKES_MIN = 20;
const LIKES_MAX = 200;


const createPhotos = () => {
  const photos = [];
  for (let i = 0; i < AUTHORS_AMOUNT; i++) {
    const id = i + 1;
    photos.push({
      id,
      url: 'photos/' + id + '.jpg',
      description: getRandomArrayElement(DESCRIPTIONS),
      likes: getRandomInteger(LIKES_MIN, LIKES_MAX),
      number: 'data-number',
      comments: [{
        commentId: id,
        avatar: 'img/avatar-' + getRandomInteger(1, 6) + '.svg',
        name: getRandomArrayElement(NAMES),
        message: getRandomArrayElement(COMMENTS),
      },
      {
        commentId: id + 1,
        avatar: 'img/avatar-' + getRandomInteger(1, 6) + '.svg',
        name: getRandomArrayElement(NAMES),
        message: getRandomArrayElement(COMMENTS),
      }],
    });
  }
  return photos;
}

export { createPhotos };
