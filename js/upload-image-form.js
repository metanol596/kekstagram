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

import { resetScaleValues } from './image-scale.js';
import {
  onImgEffectsListChange,
  resetFilters
} from './image-effects.js';

const uploadFileInput = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancelButton = imgUploadOverlay.querySelector('#upload-cancel');
const imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview img');
const descriptionFieldset = document.querySelector('.img-upload__text');
const imgEffectsList = document.querySelector('.effects__list');
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

const resetUploadImgValues = () => {
  uploadFileInput.value = '';
  imgUploadPreview.className = '';
}

uploadFileInput.addEventListener('input', onUploadFileInput);

export {
  imgUploadPreview,
  imgEffectsList
}
