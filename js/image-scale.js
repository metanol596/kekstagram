
const DEFAULT_SCALE = 1;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE_VALUE = '100%';
const SCALE_INPUT_VALUE_STEP = 25;

const imgUploadScaleContainer = document.querySelector('.img-upload__scale');
const scaleControlBigger = imgUploadScaleContainer.querySelector('.scale__control--bigger');
const scaleControlSmaller = imgUploadScaleContainer.querySelector('.scale__control--smaller');
let scaleControlValue = imgUploadScaleContainer.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview img');

scaleControlValue.defaultValue = DEFAULT_SCALE_VALUE;

let convertScaleControlValue = parseInt(scaleControlValue.value);

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

let imageScale = DEFAULT_SCALE;

const onImgUploadScaleContainerClick = (evt) => {
  if (evt.target && evt.target.closest('.scale__control--bigger')) {
    toggleControlState();
    if (convertScaleControlValue < MAX_SCALE) {
      convertScaleControlValue += SCALE_INPUT_VALUE_STEP;
      imageScale += SCALE_INPUT_VALUE_STEP / 100;
      imgUploadPreview.style.transform = 'scale(' + imageScale + ')';
    }
  }

  if (evt.target && evt.target.closest('.scale__control--smaller')) {
    toggleControlState();
    if (convertScaleControlValue > MIN_SCALE) {
      convertScaleControlValue -= SCALE_INPUT_VALUE_STEP;
      imageScale -= SCALE_INPUT_VALUE_STEP / 100;
      imgUploadPreview.style.transform = 'scale(' + imageScale + ')';
    }
  }
  scaleControlValue.value = convertScaleControlValue + '%';
}

imgUploadScaleContainer.addEventListener('click', onImgUploadScaleContainerClick);
