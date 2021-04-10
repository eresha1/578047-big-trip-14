const filtersTitle = [
  {
    title: `Everything`,
    isChecked: true,
  },
  {
    title: `Future`,
  },
  {
    title: `Past`,
  }
];

const createFilterMarkup = (filters) => {
  // const {title, isChecked} = filter;
  return filters.map((filter) =>  {

  const {title, isChecked} = filter;
    return `<div class="trip-filters__filter">
    <input id="filter-${filter.title}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.title}"  ${filter.isChecked === true ? `checked` : ``}>
    <label class="trip-filters__filter-label" for="filter-everything">${filter.title}</label>
  </div>`;
  }).join(`\n`);
};


export const createFiltersTemplate = () => {
  return `<form class="trip-filters" action="#" method="get">
${createFilterMarkup(filtersTitle)}
<button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
};
