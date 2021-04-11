import { position } from './const.js';

export const render = (container, template, place = position.BEFORE_END) => {
  container.insertAdjacentHTML(place, template);
};

export const getTotalCost = (points) => {
  return points.reduce((sum, element) => {
    return sum + element.price;
  }, 0);
};

export const getSortStartDates = (points) => {
  return points.slice().sort((a, b) => a.startTime - b.startTime);
};

