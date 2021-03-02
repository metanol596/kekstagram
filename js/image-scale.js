import { imgUploadPreview } from './upload-image-form.js'

const DEFAULT_SCALE = 1;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE_INPUT = '100%';
const SCALE_INPUT_STEP = 25;

const imgUploadScaleContainer = document.querySelector('.img-upload__scale');
const scaleControlBigger = imgUploadScaleContainer.querySelector('.scale__control--bigger');
const scaleControlSmaller = imgUploadScaleContainer.querySelector('.scale__control--smaller');
const scaleControlValue = imgUploadScaleContainer.querySelector('.scale__control--value');

scaleControlValue.defaultValue = DEFAULT_SCALE_INPUT;

let convertScaleControlValue = parseInt(scaleControlValue.value);
let imageScale = DEFAULT_SCALE;

const toggleControlState = () => {
  if (convertScaleControlValue === MAX_SCALE - 1) {
    scaleControlBigger.disabled = true;
    scaleControlSmaller.disabled = false;
  }

  if (convertScaleControlValue === MIN_SCALE + 1) {
    scaleControlSmaller.disabled = true;
    scaleControlBigger.disabled = false;
  }
  scaleControlBigger.disabled = false;
}

const onImgUploadScaleContainerClick = (evt) => {
  if (evt.target && evt.target.closest('.scale__control--bigger')) {
    toggleControlState();
    if (convertScaleControlValue < MAX_SCALE) {
      convertScaleControlValue += SCALE_INPUT_STEP;
      imageScale += SCALE_INPUT_STEP / 100;
      imgUploadPreview.style.transform = 'scale(' + imageScale + ')';

    }
  }

  if (evt.target && evt.target.closest('.scale__control--smaller')) {
    toggleControlState();
    if (convertScaleControlValue > MIN_SCALE) {
      convertScaleControlValue -= SCALE_INPUT_STEP;
      imageScale -= SCALE_INPUT_STEP / 100;
      imgUploadPreview.style.transform = 'scale(' + imageScale + ')';
    }
  }
  scaleControlValue.value = convertScaleControlValue + '%';
}

const resetScaleValues = () => {
  scaleControlValue.value = MAX_SCALE;
  convertScaleControlValue = parseInt(scaleControlValue.value);
  imageScale = DEFAULT_SCALE;
  scaleControlValue.value = convertScaleControlValue + '%';
}

imgUploadScaleContainer.addEventListener('click', onImgUploadScaleContainerClick);

export { resetScaleValues }
