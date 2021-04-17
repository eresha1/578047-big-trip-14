import AbstractView  from '../view/abstract.js';

const createSortingItemMarkup = (sort, isChecked) => {
  const {title, isDisabled} = sort;

  return `<div class="trip-sort__item    trip-sort__item--${title}">
      <input id="sort-${title}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${title}" ${isChecked ? 'checked' : ''}${isDisabled ? 'disabled' : ''}>
      <label class="trip-sort__btn" for="sort-${title}">${title}</label>
      </div>`;
};

const createSortingTemplate = (sortsTitle) => {

  const sortsTemplate = sortsTitle.map((item, index) => createSortingItemMarkup(item, index === 0))
    .join('\n');
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sortsTemplate}
  </form>`;
};

export default class Sorting extends AbstractView {
  constructor(sorts) {
    super();
    this._sorts = sorts;
  }

  getTemplate() {
    return createSortingTemplate(this._sorts);
  }
}

