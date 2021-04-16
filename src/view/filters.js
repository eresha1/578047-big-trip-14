import {createElement} from '../utils/utils.js';

const createFilterMarkup = (filter, isChecked) => {
  const {title} = filter;

  return `<div class="trip-filters__filter">
    <input id="filter-${title}" class="trip-filters__filter-input visually-hidden" type="radio" name="trip-filter" value="${title}"  ${isChecked ? 'checked' : ''}>
    <label class="trip-filters__filter-label" for="filter-${title}">${title}</label>
   </div>`;
};

const createFiltersTemplate = (filtersTitle) => {
  const filtersTemplate = filtersTitle.map((filter, index) => createFilterMarkup(filter, index === 0))
    .join('\n');
  return `<form class="trip-filters" action="#" method="get">
  ${filtersTemplate}
  <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
};

export default class Filters {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createFiltersTemplate(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

