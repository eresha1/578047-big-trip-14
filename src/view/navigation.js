import {createElement} from '../utils/utils.js';

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

export default class Navigation {
  constructor(navigationItems) {
    this._navigationItems = navigationItems;
    this._element = null;
  }

  getTemplate() {
    return createNavigationTemplate(this._navigationItems);
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

