import {
  isEscapeEvent,
  checkOpenModalClass
} from './utils.js';

import {
  onCommentInputInput,
  onHashtagInputInvalid,
  hashtagsInput,
  commentInput,
  resetFormInputs
} from './form-validation.js';

import { resetScaleValues } from './image-scale.js';
import {
  onImgEffectsListChange,
  resetFilters
} from './image-effects.js';

import { sendData } from './api.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const uploadFileInput = imgUploadForm.querySelector('#upload-file');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadCancelButton = imgUploadForm.querySelector('#upload-cancel');
const imgUploadPreview = imgUploadForm.querySelector('.img-upload__preview img');
const descriptionFieldset = imgUploadForm.querySelector('.img-upload__text');
const imgEffectsList = imgUploadForm.querySelector('.effects__list');
const onImageFormEscapeKeydown = (evt) => {
  if (isEscapeEvent(evt)) {
    onimgUploadCancelButtonClick();
  }
}

const onUploadFileInput = () => {
  imgUploadOverlay.classList.remove('hidden');
  checkOpenModalClass();
  window.addEventListener('keydown', onImageFormEscapeKeydown);
  imgUploadCancelButton.addEventListener('click', onimgUploadCancelButtonClick);

  commentInput.addEventListener('input', onCommentInputInput);
  hashtagsInput.addEventListener('input', onHashtagInputInvalid);
  descriptionFieldset.addEventListener('focusin', () => {
    window.removeEventListener('keydown', onImageFormEscapeKeydown);
  });
  descriptionFieldset.addEventListener('focusout', () => {
    window.addEventListener('keydown', onImageFormEscapeKeydown)
  });

  imgEffectsList.addEventListener('change', onImgEffectsListChange);
  resetFilters();

}

const onimgUploadCancelButtonClick = () => {
  imgUploadOverlay.classList.add('hidden');
  checkOpenModalClass();
  window.removeEventListener('keydown', onImageFormEscapeKeydown);

  resetScaleValues();
  resetUploadImgValues();
  resetFormInputs();

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

  imgEffectsList.removeEventListener('change', onImgEffectsListChange);
}

sendData(onimgUploadCancelButtonClick);

const resetUploadImgValues = () => {
  uploadFileInput.value = '';
  imgUploadPreview.className = '';
}

uploadFileInput.addEventListener('input', onUploadFileInput);

export {
  imgUploadPreview,
  imgEffectsList,
  imgUploadForm
}
