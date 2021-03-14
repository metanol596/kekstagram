import { imgUploadForm, resetStates } from './upload-img-form.js';
import { showMessagePopup } from './data-request-status.js';

const UPLOAD_DATA_URL = 'https://22.javascript.pages.academy/kekstagram';
const DOWNLOAD_DATA_POPUP = 'Ошибка загрузки страницы';
const POPUP_CLOSE_BUTTON = 'Закрыть';

const getData = (url, onSuccess) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => onSuccess(data))
    .catch(() => showMessagePopup('error', {
      text: DOWNLOAD_DATA_POPUP,
      buttonText: POPUP_CLOSE_BUTTON,
    }));
};

const addFormSubmitListener = (onSuccess) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);

    fetch(UPLOAD_DATA_URL, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          onSuccess();
          showMessagePopup('success');
        } else {
          showMessagePopup('error');
          resetStates();
        }
      })
      .catch(() => showMessagePopup('error'));
  });
};

export { getData, addFormSubmitListener }
