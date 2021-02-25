import  './image-form.js';

/* global noUiSlider:readonly */
const imgUploadPreview = document.querySelector('img');
const imgEffectsList = document.querySelector('.effects__list');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const filterEffects = {
  chrome: {
    filter: 'grayscale',
    unit: '',
  },
  sepia: {
    filter: 'sepia',
    unit: '',
  },
  marvin: {
    filter: 'invert',
    unit: '%',
  },
  phobos: {
    filter: 'blur',
    unit: 'px',
  },
  heat: {
    filter: 'brightness',
    unit: '',
  },
  original: {
    filter: '',
    unit: '',
  },
};

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 0,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const setEffectValues = (filter, unit) => {
  sliderElement.noUiSlider.on('update', (values, handle) => {
    effectLevelValue.value = values[handle];
    imgUploadPreview.style.filter = `${filter}(${effectLevelValue.value}${unit})`;
  });
}


if (imgEffectsList.querySelector('[value="none"]').checked === true) {
  sliderElement.setAttribute('disabled', true);
} else {
  sliderElement.removeAttribute('dsabled');
}

const onImgEffectsListClick = (evt) => {
  sliderElement.setAttribute('disabled', true);
  if (evt.target && evt.target.closest('.effects__radio') && !evt.target.closest('[value="none"]')) {
    sliderElement.removeAttribute('disabled');
    imgUploadPreview.classList = 'effects__preview--' + evt.target.value;
  }

  if (evt.target.value === 'none') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      step: 0,
    });
    sliderElement.noUiSlider.set(0);
  }
  if (evt.target.value === 'chrome') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1,
    });
    sliderElement.noUiSlider.set(0);
    setEffectValues(filterEffects.chrome.filter, filterEffects.chrome.unit);
  }
  if (evt.target.value === 'sepia') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1,
    });
    sliderElement.noUiSlider.set(0);
    setEffectValues(filterEffects.sepia.filter, filterEffects.sepia.unit);
  }
  if (evt.target.value === 'marvin') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      step: 1,
    });
    sliderElement.noUiSlider.set(0);
    setEffectValues(filterEffects.marvin.filter, filterEffects.marvin.unit);
  }
  if (evt.target.value === 'phobos') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      step: 0.1,
    });
    sliderElement.noUiSlider.set(0);
    setEffectValues(filterEffects.phobos.filter, filterEffects.phobos.unit);
  }
  if (evt.target.value === 'heat') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      step: 0.1,
    });
    sliderElement.noUiSlider.set(1);
    setEffectValues(filterEffects.heat.filter, filterEffects.heat.unit);
  }
};

imgEffectsList.addEventListener('click', onImgEffectsListClick);
