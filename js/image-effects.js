

/* global noUiSlider:readonly */
const imgUploadPreview = document.querySelector('.img-upload__overlay img');
const imgEffectsList = document.querySelector('.effects__list');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const filterEffects = {
  none: {
    filter: '',
    unit: '',
    sliderOptions: {
      range: {
        min: 0,
        max: 1,
      },
      start: 0,
      step: 0.1,
    },
  },
  chrome: {
    filter: 'grayscale',
    unit: '',
    sliderOptions: {
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1,
      start: 1,
    },
  },
  sepia: {
    filter: 'sepia',
    unit: '',
    sliderOptions: {
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1,
      start: 1,
    },
  },
  marvin: {
    filter: 'invert',
    unit: '%',
    sliderOptions: {
      range: {
        min: 0,
        max: 100,
      },
      step: 1,
      start: 100,
    },
  },
  phobos: {
    filter: 'blur',
    unit: 'px',
    sliderOptions: {
      range: {
        min: 0,
        max: 3,
      },
      step: 0.1,
      start: 3,
    },
  },
  heat: {
    filter: 'brightness',
    unit: '',
    sliderOptions: {
      range: {
        min: 1,
        max: 3,
      },
      step: 0.1,
      start: 3,
    },
  },
};

const defaultOptions = filterEffects.none.sliderOptions;

noUiSlider.create(sliderElement, {
  ...defaultOptions,
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

sliderElement.setAttribute('disabled', true);
const onImgEffectsListClick = (evt) => {
  const selectedFilter = evt.target.value;
  if (evt.target && evt.target.closest('.effects__radio')) {
    sliderElement.removeAttribute('disabled');
    imgUploadPreview.classList = `effects__preview--${selectedFilter}`;
  }
  if (evt.target.closest('[value="none"]')) {
    imgUploadPreview.classList.remove(`effects__preview--${selectedFilter}`);
    imgUploadPreview.removeAttribute('style');
  }
    console.log(imgUploadPreview);

  const settings = filterEffects[selectedFilter].sliderOptions;
console.log(settings);

  sliderElement.noUiSlider.updateOptions(settings);
  setEffectValues(filterEffects[selectedFilter].filter, filterEffects[selectedFilter].unit);
};

imgEffectsList.addEventListener('change', onImgEffectsListClick);
