import {
  isEscapeEvent,
  checkOpenModalClass
} from './utils.js';

import {
  onCommentInputInput,
  onHashtagInputInvalid,
  hashtagsInput,
  commentInput
} from './form-validation.js';

import { resetValues } from './image-scale.js';

const uploadFileInput = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancelButton = imgUploadOverlay.querySelector('#upload-cancel');
const imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview img');
const descriptionFieldset = document.querySelector('.img-upload__text');
const onImageFormEscapeKeydown = (evt) => {
  if (isEscapeEvent(evt)) {
    onimgUploadCancelButtonClick();
  }
}

const onUploadFileInput = () => {
  imgUploadOverlay.classList.remove('hidden');
  checkOpenModalClass();
  window.addEventListener('keydown', onImageFormEscapeKeydown);
  commentInput.addEventListener('input', onCommentInputInput);
  hashtagsInput.addEventListener('input', onHashtagInputInvalid);
  descriptionFieldset.addEventListener('focusin', () => {
    window.removeEventListener('keydown', onImageFormEscapeKeydown);
  });
  descriptionFieldset.addEventListener('focusout', () => {
    window.addEventListener('keydown', onImageFormEscapeKeydown)
  });
  imgUploadCancelButton.addEventListener('click', onimgUploadCancelButtonClick);
  resetValues();
}

const onimgUploadCancelButtonClick = () => {
  imgUploadOverlay.classList.add('hidden');
  checkOpenModalClass();
  window.removeEventListener('keydown', onImageFormEscapeKeydown);
  uploadFileInput.value = '';
  imgUploadPreview.className = '';
  imgUploadPreview.removeAttribute('style');
  commentInput.removeEventListener('input', onCommentInputInput);
  hashtagsInput.removeEventListener('input', onHashtagInputInvalid);
  descriptionFieldset.removeEventListener('focusin', () => {
    window.removeEventListener('keydown', onImageFormEscapeKeydown);
  });
  descriptionFieldset.removeEventListener('focusout', () => {
    window.addEventListener('keydown', onImageFormEscapeKeydown)
  });
  imgUploadCancelButton.removeEventListener('click', onimgUploadCancelButtonClick);
}

uploadFileInput.addEventListener('input', onUploadFileInput);

export { imgUploadPreview }
