import { isEscapeEvent } from './utils.js';

const main = document.querySelector('main');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const showMessagePopup = (status, options) => {
  const message = status === 'error' ? errorTemplate.cloneNode(true) : successTemplate.cloneNode(true);
  const button = message.querySelector(`.${status}__button`);

  if (options) {
    const errorTitle = message.querySelector('.error__title');
    const errorButton = message.querySelector('.error__button');

    errorTitle.textContent = options.text;
    errorButton.textContent = options.buttonText;
  }

  message.style.zIndex = '3';
  message.style.lineHeight = '32px';

  main.appendChild(message);

  button.addEventListener('click', () => {
    message.remove();
  })

  const onWindowClick = () => {
    message.remove();
    window.removeEventListener('click', onWindowClick)
  };

  window.addEventListener('click', onWindowClick);

  const onWindowKeydown = (evt) => {
    if (isEscapeEvent(evt)) {
      message.remove();
      window.removeEventListener('keydown', onWindowKeydown)
    }
  };

  window.addEventListener('keydown', onWindowKeydown);

  setTimeout(() => {
    message.remove();
  }, 5000);
};

export { showMessagePopup }
