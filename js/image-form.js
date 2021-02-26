import {
  isEscapeEvent,
  isOpenModalClass
} from './utils.js';

const uploadFileForm = document.querySelector('#upload-select-image');
const uploadFileInput = uploadFileForm.querySelector('#upload-file');
const imgUploadOverlay = uploadFileForm.querySelector('.img-upload__overlay');
const imgUploadCancelButton = uploadFileForm.querySelector('#upload-cancel');
const imgUploadPreview = document.querySelector('img');
const onImageFormEscapeKeydown = (evt) => {
  if (isEscapeEvent(evt)) {
    onimgUploadCancelButtonClick();
  }
}

const onUploadFileInput = () => {
  if (uploadFileInput.value) {
    imgUploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onImageFormEscapeKeydown);
    isOpenModalClass();
  }
}

const onimgUploadCancelButtonClick = () => {
  imgUploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onImageFormEscapeKeydown);
  uploadFileInput.value = '';
  imgUploadPreview.className = '';
  isOpenModalClass();
}

uploadFileInput.addEventListener('input', onUploadFileInput);
imgUploadCancelButton.addEventListener('click', onimgUploadCancelButtonClick);
