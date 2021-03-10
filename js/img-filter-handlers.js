const defaultFilterButton = document.querySelector('#filter-default');
const randomFilterButton = document.querySelector('#filter-random');
const discussedFilterButton = document.querySelector('#filter-discussed');
const setDefaultHandler = (cb) => {
  defaultFilterButton.addEventListener('click', () => {
    if (discussedFilterButton.classList.contains('img-filters__button--active') || randomFilterButton.classList.contains('img-filters__button--active')) {
      discussedFilterButton.classList.remove('img-filters__button--active');
      randomFilterButton.classList.remove('img-filters__button--active');
    }
    defaultFilterButton.classList.add('img-filters__button--active');
    cb();
  })
}

const setRandomHandler = (cb) => {
  randomFilterButton.addEventListener('click', () => {
    if (defaultFilterButton.classList.contains('img-filters__button--active') || discussedFilterButton.classList.contains('img-filters__button--active')) {
      defaultFilterButton.classList.remove('img-filters__button--active');
      discussedFilterButton.classList.remove('img-filters__button--active');
    }

    randomFilterButton.classList.add('img-filters__button--active');
    cb();
  })
}

const setDiscussedHandler = (cb) => {
  discussedFilterButton.addEventListener('click', () => {
    if (defaultFilterButton.classList.contains('img-filters__button--active') || randomFilterButton.classList.contains('img-filters__button--active')) {
      defaultFilterButton.classList.remove('img-filters__button--active');
      randomFilterButton.classList.remove('img-filters__button--active');
    }

    discussedFilterButton.classList.add('img-filters__button--active');
    cb();
  })
}

export {setDefaultHandler, setRandomHandler, setDiscussedHandler}
