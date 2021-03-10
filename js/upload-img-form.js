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

import { resetScaleValues } from './img-scale.js';
import {
  onImgEffectsListChange,
  resetFilters
} from './img-effects.js';

import { addFormSubmitListener } from './api.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const uploadFileInput = imgUploadForm.querySelector('#upload-file');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadCancelButton = imgUploadForm.querySelector('#upload-cancel');
const imgUploadPreview = imgUploadForm.querySelector('.img-upload__preview img');
const descriptionFieldset = imgUploadForm.querySelector('.img-upload__text');
const imgEffectsList = imgUploadForm.querySelector('.effects__list');
const onImageFormEscapeKeydown = (evt) => {
  if (isEscapeEvent(evt)) {
    resetStates();
  }
}

const onUploadFileInput = () => {
  imgUploadOverlay.classList.remove('hidden');
  checkOpenModalClass();
  window.addEventListener('keydown', onImageFormEscapeKeydown);
  imgUploadCancelButton.addEventListener('click', onImgUploadCancelButtonClick);

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
const resetStates = () => {
  imgUploadOverlay.classList.add('hidden');
  checkOpenModalClass();
  window.removeEventListener('keydown', onImageFormEscapeKeydown);

  resetScaleValues();
  resetUploadImgValues();
  imgUploadForm.reset();

  imgUploadPreview.removeAttribute('style');

  commentInput.removeEventListener('input', onCommentInputInput);
  hashtagsInput.removeEventListener('input', onHashtagInputInvalid);
  hashtagsInput.setCustomValidity('');

  descriptionFieldset.removeEventListener('focusin', () => {
    window.removeEventListener('keydown', onImageFormEscapeKeydown);
  });
  descriptionFieldset.removeEventListener('focusout', () => {
    window.addEventListener('keydown', onImageFormEscapeKeydown)
  });

  imgUploadCancelButton.removeEventListener('click', onImgUploadCancelButtonClick);

  imgEffectsList.removeEventListener('change', onImgEffectsListChange);
}
const onImgUploadCancelButtonClick = () => {
  resetStates();
}

addFormSubmitListener(resetStates);

const resetUploadImgValues = () => {
  uploadFileInput.value = '';
  imgUploadPreview.className = '';
}

uploadFileInput.addEventListener('input', onUploadFileInput);

export {
  imgUploadPreview,
  imgEffectsList,
  imgUploadForm,
  resetStates
}
