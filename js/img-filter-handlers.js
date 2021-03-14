/* global _:readonly */
const RERENDER_DELAY = 500;

const defaultFilterButton = document.querySelector('#filter-default');
const randomFilterButton = document.querySelector('#filter-random');
const discussedFilterButton = document.querySelector('#filter-discussed');
const setDefaultHandler = (cb) => {
  defaultFilterButton.addEventListener('click', _.debounce((evt) => {
    setActiveState(evt);
    cb();
  },
  RERENDER_DELAY,
  ));
};

const setRandomHandler = (cb) => {
  randomFilterButton.addEventListener('click', _.debounce((evt) => {
    setActiveState(evt);
    cb();
  },
  RERENDER_DELAY,
  ));
};

const setDiscussedHandler = (cb) => {
  discussedFilterButton.addEventListener('click', _.debounce((evt) => {
    setActiveState(evt);
    cb();
  },
  RERENDER_DELAY,
  ));
};

const setActiveState = (evt) => {
  const button = evt.target;
  const activeButton = document.querySelector('.img-filters__button--active');
  activeButton.classList.remove('img-filters__button--active');
  button.classList.add('img-filters__button--active');
};

export { setDefaultHandler, setRandomHandler, setDiscussedHandler }
