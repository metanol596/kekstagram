import  './image-form.js';

let IMAGE_SCALE = 1;
const imgUploadScaleContainer = document.querySelector('.img-upload__scale');
const scaleControlBigger = imgUploadScaleContainer.querySelector('.scale__control--bigger');
const scaleControlSmaller = imgUploadScaleContainer.querySelector('.scale__control--smaller');
let scaleControlValue = imgUploadScaleContainer.querySelector('.scale__control--value');
const imgUploadPreviewContainer = document.querySelector('.img-upload__preview');

scaleControlValue.defaultValue = '100%';

let convertScaleControlValue = parseInt(scaleControlValue.value);

const isBorderControlValue = () => {
  if (convertScaleControlValue === 100) {
    scaleControlBigger.disabled = true;
    scaleControlSmaller.disabled = false;
  }

  if (convertScaleControlValue === 25) {
    scaleControlSmaller.disabled = true;
    scaleControlBigger.disabled = false;
  }
}

const onImgUploadScaleContainerClick = (evt) => {
  if (evt.target && evt.target.closest('.scale__control--bigger')) {
    isBorderControlValue();
    scaleControlSmaller.disabled = false;
    if (convertScaleControlValue < 100) {
      convertScaleControlValue += 25;
      IMAGE_SCALE += 0.25;
      imgUploadPreviewContainer.style.transform = 'scale(' + IMAGE_SCALE + ')';
    }
    scaleControlValue.value = convertScaleControlValue + '%';
  }

  if (evt.target && evt.target.closest('.scale__control--smaller')) {
    isBorderControlValue();
    scaleControlBigger.disabled = false;
    if (convertScaleControlValue > 25) {
      convertScaleControlValue -= 25;
      IMAGE_SCALE -= 0.25;
      imgUploadPreviewContainer.style.transform = 'scale(' + IMAGE_SCALE + ')';
    }
    scaleControlValue.value = convertScaleControlValue + '%';
  }
}

imgUploadScaleContainer.addEventListener('click', onImgUploadScaleContainerClick);
