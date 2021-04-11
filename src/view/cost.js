import {getTotalCost} from '../utils/utils.js';

export const createCostTemplate = (points) => {
  const totalCost = getTotalCost(points);

  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
  </p>`;
};
