import { filterEffects } from './filter-effects.js';

const sliderElementContainer = document.querySelector('.effect-level');
const sliderElement = sliderElementContainer.querySelector('.effect-level__slider');
const effectLevelValue = sliderElementContainer.querySelector('.effect-level__value');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview img');
const defaultFilterRadio = document.querySelector('#effect-none');

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
    sliderElementContainer.style.display = 'block';
    imgUploadPreview.classList = 'effects__preview--' + selectedFilter;
    const options = filterEffects[selectedFilter].sliderOptions;
    sliderElement.noUiSlider.updateOptions(options);
    setEffectValues(filterEffects[selectedFilter].filter, filterEffects[selectedFilter].unit);
  }
  if (selectedFilter === 'none') {
    sliderElementContainer.style.display = 'none';
    imgUploadPreview.removeAttribute('style');
    imgUploadPreview.removeAttribute('class');
  }
};

const resetFilters = () => {
  defaultFilterRadio.checked = true;
  sliderElementContainer.style.display = 'none';
  imgUploadPreview.removeAttribute('style');
}

export {
  onImgEffectsListChange,
  resetFilters
}
