import AbstractView  from '../view/abstract.js';
import { NavigationItem } from '../utils/const.js';

const createNavigationTemplate = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" data-menu-item="${NavigationItem.TABLE}">${NavigationItem.TABLE}</a>
    <a class="trip-tabs__btn" href="#" data-menu-item="${NavigationItem.STATS}">${NavigationItem.STATS}</a>
  </nav>`;
};

export default class Navigation extends AbstractView {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createNavigationTemplate();
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

  _menuClickHandler(evt) {
    evt.preventDefault();
    if (evt.target.classList.contains('trip-tabs__btn--active') ||
      !evt.target.classList.contains('trip-tabs__btn')) {
      return;
    }
    this._callback.menuClick(evt.target.dataset.menuItem);
  }
}

