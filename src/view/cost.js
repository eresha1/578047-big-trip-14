import {getTotalCost} from '../utils/utils.js';
import {createElement} from '../utils/utils.js';

const createCostTemplate = (points) => {
  const totalCost = getTotalCost(points);

  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
  </p>`;
};

export default class Cost {
  constructor(points) {
    this._points = points;
    this._element = null;
  }

  getTemplate() {
    return createCostTemplate(this._points);
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

