import { navigationTitle } from '../utils/const.js';

const createNavigationItem = (items) => {
  return items
    .map((item) => {
      const { title, isActive } = item;

      return `<a class="trip-tabs__btn ${
        isActive === true ? 'trip-tabs__btn--active' : ''
      }" href="#">${title}</a>`;
    })
    .join('\n');
};

export const createNavigationTemplate = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
  ${createNavigationItem(navigationTitle)}
</nav>`;
};
