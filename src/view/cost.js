import AbstractView  from '../view/abstract.js';
import {getTotalCost} from '../utils/utils.js';

const createCostTemplate = (points) => {
  const totalCost = getTotalCost(points);

  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
  </p>`;
};

export default class Cost extends AbstractView {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createCostTemplate(this._points);
  }
}

