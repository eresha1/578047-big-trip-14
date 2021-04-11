import {filtersTitle} from '../utils/const.js';

const createFilterMarkup = (filters) => {
  return filters
    .map((filter) => {
      const { title, isChecked } = filter;
      return `<div class="trip-filters__filter">
    <input id="filter-${title}" class="trip-filters__filter-input visually-hidden" type="radio" name="trip-filter" value="${title}"  ${isChecked === true ? 'checked' : ''}>
    <label class="trip-filters__filter-label" for="filter-${title}">${title}</label>
  </div>`;
    })
    .join('\n');
};

export const createFiltersTemplate = () => {
  return `<form class="trip-filters" action="#" method="get">
${createFilterMarkup(filtersTitle)}
<button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
};
