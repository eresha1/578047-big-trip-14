import AbstractView  from '../view/abstract.js';

const createNavigationItemMarkup = (item, isActive) => {
  const {title} = item;

  return `<a class="trip-tabs__btn ${
    isActive ? 'trip-tabs__btn--active' : ''
  }" href="#">${title}</a>`;
};

const createNavigationTemplate = (itemsTitle) => {
  const navigationItemsTemplate = itemsTitle
    .map((item, index) => createNavigationItemMarkup(item, index === 0))
    .join('\n');

  return `<nav class="trip-controls__trip-tabs  trip-tabs">
  ${navigationItemsTemplate}
  </nav>`;
};

export default class Navigation extends AbstractView {
  constructor(navigationItems) {
    super();
    this._navigationItems = navigationItems;
  }

  getTemplate() {
    return createNavigationTemplate(this._navigationItems);
  }
}

