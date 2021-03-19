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

export { filterEffects }
