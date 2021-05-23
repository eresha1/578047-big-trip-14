import AbstractView  from '../view/abstract.js';
import { NavigationItem } from '../utils/const.js';

// const createNavigationItemMarkup = (item, isActive) => {
//   const {title} = item;

//   return `<a class="trip-tabs__btn ${
//     isActive ? 'trip-tabs__btn--active' : ''
//   }" href="#">${title}</a>`;
// };

// const createNavigationTemplate = () => {
//   const navigationItemsTemplate = NavigationItems
//     .map((item, index) => createNavigationItemMarkup(item, index === 0))
//     .join('\n');

//   return `<nav class="trip-controls__trip-tabs  trip-tabs">
//   ${navigationItemsTemplate}
//   </nav>`;
// };


const createNavigationTemplate = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" data-menu-item="${NavigationItem.TABLE}">${NavigationItem.TABLE}</a>
    <a class="trip-tabs__btn" href="#" data-menu-item="${NavigationItem.STATS}">${NavigationItem.STATS}</a>
  </nav>`;
};

// const LINK_TAG_NAME = `A`;
// const ACTIVE_MENU_CLASS = `trip-tabs__btn--active`;

export default class Navigation extends AbstractView {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createNavigationTemplate();
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.dataset.menuItem);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener('click', this._menuClickHandler);
  }

  setMenuItem(menuItem) {
    const activeItem = this.getElement().querySelector('.trip-tabs__btn--active');
    const item = this.getElement().querySelector(`a[data-menu-item=${menuItem}]`);

    if (activeItem !== item) {
      activeItem.classList.remove('trip-tabs__btn--active');
      item.classList.add('trip-tabs__btn--active');
    }
  }
}

