import {
  isEscapeEvent,
  checkOpenModalClass
} from './utils.js';
import {onCommentInputInput, onHashtagInputInvalid, getDescriptionFieldset, hashtagsInput, commentInput} from './form-validation.js';

const uploadFileInput = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancelButton = imgUploadOverlay.querySelector('#upload-cancel');
const imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview img');
const onImageFormEscapeKeydown = (evt) => {
  if (isEscapeEvent(evt)) {
    onimgUploadCancelButtonClick();
  }
}

const onUploadFileInput = () => {
  if (uploadFileInput.value) {
    imgUploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onImageFormEscapeKeydown);
    checkOpenModalClass();
    commentInput.addEventListener('input', onCommentInputInput);
    hashtagsInput.addEventListener('input', onHashtagInputInvalid);
    getDescriptionFieldset().addEventListener('focusin', () => {
      document.removeEventListener('keydown', onImageFormEscapeKeydown);
    })
    getDescriptionFieldset().addEventListener('focusout', () => {
      document.addEventListener('keydown', onImageFormEscapeKeydown)
    })
  }
}

const onimgUploadCancelButtonClick = () => {
  imgUploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onImageFormEscapeKeydown);
  uploadFileInput.value = '';
  imgUploadPreview.className = '';
  imgUploadPreview.removeAttribute('style');
  checkOpenModalClass();
  commentInput.removeEventListener('input', onCommentInputInput);
  hashtagsInput.removeEventListener('input', onHashtagInputInvalid);
  getDescriptionFieldset().removeEventListener('focusin', () => {
    document.removeEventListener('keydown', onImageFormEscapeKeydown);
  })
  getDescriptionFieldset().removeEventListener('focusout', () => {
    document.addEventListener('keydown', onImageFormEscapeKeydown)
  })
}

uploadFileInput.addEventListener('input', onUploadFileInput);
imgUploadCancelButton.addEventListener('click', onimgUploadCancelButtonClick);
