import { isEscapeEvent } from './utils.js';

const main = document.querySelector('main');

const defineUploadStatus = (status) => {
  const template = document.querySelector(`#${status}`).content;
  const message = template.querySelector(`.${status}`).cloneNode(true);
  const button = message.querySelector(`.${status}__button`);

  message.style.zIndex = '3';
  main.appendChild(message);

  button.addEventListener('click', () => {
    message.remove();
  })

  window.addEventListener('click', () =>{
    message.remove();
  })

  window.addEventListener('keydown', (evt) => {
    if (isEscapeEvent(evt)) {
      message.remove();
    }
  })

  setTimeout(() => {
    message.remove();
  }, 2500);
}

const defineDownloadStatus = () =>  {
  const template = document.querySelector('#error').content;
  const message = template.querySelector('.error').cloneNode(true);

  message.style.zIndex = '3';
  message.style.lineHeight = '32px';
  main.appendChild(message);

  const errorTitle = message.querySelector('.error__title');
  const errorButton = message.querySelector('.error__button');

  errorTitle.textContent = 'При загрузке страницы произошла ошибка';
  errorButton.textContent = 'Закрыть';

  errorButton.addEventListener('click', () => {
    message.remove();
  })

  window.addEventListener('click', () =>{
    message.remove();
  })

  window.addEventListener('keydown', (evt) => {
    if (isEscapeEvent(evt)) {
      message.remove();
    }
  })

  setTimeout(() => {
    message.remove();
  }, 2500);
}

export { defineUploadStatus, defineDownloadStatus }
