import { sorting } from '../utils/const.js';

const createSortingItem = (sorts) => {
  return sorts
    .map((item) => {
      const { title, isChecked, isDisabled } = item;

      return `<div class="trip-sort__item  trip-sort__item--${title}">
        <input id="sort-${title}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${title}" ${isChecked === true ? 'checked' : ''}${isDisabled === true ? 'disabled' : ''}>
        <label class="trip-sort__btn" for="sort-${title}">${title}</label>
       </div>`;
    })
    .join('\n');
};

export const createSortingTemplate = () => {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${createSortingItem(sorting)}
  </form>`;
};
