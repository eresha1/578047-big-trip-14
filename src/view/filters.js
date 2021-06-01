import AbstractView  from '../view/abstract.js';

const createFilterMarkup = (filter, currentFilterType) => {
  const {type, title} = filter;

  return `<div class="trip-filters__filter">
    <input id="filter-${title}" class="trip-filters__filter-input visually-hidden" type="radio" name="trip-filter" value="${title}"  ${type === currentFilterType ? 'checked' : ''}>
    <label class="trip-filters__filter-label" for="filter-${title}">${title}</label>
   </div>`;
};

const createFiltersTemplate = (filtersTitle, currentFilterType) => {
  const filtersTemplate = filtersTitle.map((filter) => createFilterMarkup(filter, currentFilterType))
    .join('\n');
  return `<form class="trip-filters" action="#" method="get">
  ${filtersTemplate}
  <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
};

export default class Filters extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFiltersTemplate(this._filters, this._currentFilter);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('change', this._filterTypeChangeHandler);
  }
  
  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }
}

