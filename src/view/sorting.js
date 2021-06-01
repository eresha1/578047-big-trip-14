import AbstractView  from '../view/abstract.js';
import {SortsTitle}  from '../utils/const.js';

const createSortingItemMarkup = (sortType, currentSortType) => {
  const {title, type, isDisabled} = sortType;
  const dataAtr = `data-sort-type="${type}"`;

  return `<div class="trip-sort__item    trip-sort__item--${title}">
      <input id="sort-${title}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort"
      ${!isDisabled ? dataAtr : ''} value="sort-${title}" ${currentSortType === type ? 'checked' : ''}${isDisabled ? 'disabled' : ''}>
      <label class="trip-sort__btn" for="sort-${title}">${title}</label>
      </div>`;
};

const createSortingTemplate = (currentSortType) => {

  const sortsTemplate = SortsTitle.map((item) => createSortingItemMarkup(item, currentSortType))
    .join('\n');
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sortsTemplate}
  </form>`;
};

export default class Sorting extends AbstractView {
  constructor(currentSortType) {
    super();

    this._currentSortType = currentSortType;
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);

  }

  getTemplate() {
    return createSortingTemplate(this._currentSortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }

  _sortTypeChangeHandler(evt) {
    if (!evt.target.dataset.sortType) {
      return;
    }
    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }
}

