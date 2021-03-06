import { getThumbnailsMarkup } from './image-thumbnails.js';
import { imgUploadForm } from './upload-image-form.js';
import {
  defineUploadStatus, defineDownloadStatus
} from './data-request-status.js';

import { openFullImageModal } from './full-image-modal.js';

const downloadDataUrl = 'https://22.javascript.pages.academy/kekstagram/data' ;
const uploadDataUrl = 'https://22.javascript.pages.academy/kekstagram';

fetch(downloadDataUrl)
  .then((response) => response.json())
  .then((photos) => {
    const thumbnailsContainer = document.querySelector('.pictures');
    const thumbnailsMarkup = getThumbnailsMarkup(photos);
    thumbnailsContainer.appendChild(thumbnailsMarkup);
    const onThumbnailsContainerClick = (evt) => {
      if (evt.target && evt.target.closest('.picture')) {
        evt.preventDefault();
        const currentImage = parseInt(evt.target.dataset.number);
        const photo = photos[currentImage];
        openFullImageModal(photo);
      }
    }
    thumbnailsContainer.addEventListener('click', onThumbnailsContainerClick);
  })
  .catch(defineDownloadStatus);

const sendData = (onSuccess) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);

    fetch(uploadDataUrl, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          onSuccess();
          defineUploadStatus('success');
        } else {
          defineUploadStatus('error');
        }
      })
      .catch(() => defineUploadStatus('error'));
  });
}

export { sendData }
