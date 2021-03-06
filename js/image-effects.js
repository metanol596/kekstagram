const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview img');
const defaultFilterRadio = document.querySelector('#effect-none');
const filterEffects = {
  none: {
    filter: '',
    unit: '',
    sliderOptions: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
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

/* global noUiSlider:readonly */
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

const onImgEffectsListChange = (evt) => {
  const selectedFilter = evt.target.value;
  if (evt.target && evt.target.closest('.effects__radio') && selectedFilter !== 'none') {
    sliderElement.style.display = 'block';
    imgUploadPreview.classList = 'effects__preview--' + selectedFilter;
    const options = filterEffects[selectedFilter].sliderOptions;
    sliderElement.noUiSlider.updateOptions(options);
    setEffectValues(filterEffects[selectedFilter].filter, filterEffects[selectedFilter].unit);
  }
  if (selectedFilter === 'none') {
    sliderElement.style.display = 'none';
    imgUploadPreview.removeAttribute('style');
    imgUploadPreview.removeAttribute('class');
  }
};

const resetFilters = () => {
  defaultFilterRadio.checked = true;
  sliderElement.style.display = 'none';
  imgUploadPreview.removeAttribute('style');
}

export {
  onImgEffectsListChange,
  resetFilters
}
