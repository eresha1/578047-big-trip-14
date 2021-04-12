const createFilterMarkup = (filter, isChecked) => {
  const {title} = filter;

  return `<div class="trip-filters__filter">
    <input id="filter-${title}" class="trip-filters__filter-input visually-hidden" type="radio" name="trip-filter" value="${title}"  ${isChecked ? 'checked' : ''}>
    <label class="trip-filters__filter-label" for="filter-${title}">${title}</label>
   </div>`;
};

export const createFiltersTemplate = (filtersTitle) => {
  const filtersTemplate = filtersTitle.map((filter, index) => createFilterMarkup(filter, index === 0))
    .join('\n');
  return `<form class="trip-filters" action="#" method="get">
  ${filtersTemplate}
  <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
};
