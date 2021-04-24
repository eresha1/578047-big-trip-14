import AbstractView  from '../view/abstract.js';
import {SortsTitle}  from '../utils/const.js';

const createSortingItemMarkup = (sort, isChecked) => {
  const {title, type, isDisabled} = sort;
  const dataAtr = `data-sort-type="${type}"`;

  return `<div class="trip-sort__item    trip-sort__item--${title}">
      <input id="sort-${title}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort"
      ${!isDisabled ? dataAtr : ''} value="sort-${title}" ${isChecked ? 'checked' : ''}${isDisabled ? 'disabled' : ''}>
      <label class="trip-sort__btn" for="sort-${title}">${title}</label>
      </div>`;
};

const createSortingTemplate = () => {

  const sortsTemplate = SortsTitle.map((item, index) => createSortingItemMarkup(item, index === 0))
    .join('\n');
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sortsTemplate}
  </form>`;
};

export default class Sorting extends AbstractView {
  constructor() {
    super();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortingTemplate();
  }

  _sortTypeChangeHandler(evt) {
    if (!evt.target.dataset.sortType) {
      return;
    }
    evt.preventDefault();
    // console.log(evt.target.dataset.sortType)
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }
}

