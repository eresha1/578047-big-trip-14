import { createInfoTemplate } from './view/info.js';
import { createCostTemplate } from './view/cost.js';
import { createNavigationTemplate } from './view/navigation.js';
import { createFiltersTemplate } from './view/filters.js';
import { createSortingTemplate } from './view/sorting.js';
import { createPointsListTemplate } from './view/points-list';

import { createPointTemplate } from './view/point';
import { createAddPointTemplate } from './view/add-point';
import { createEditPointTemplate } from './view/edit-point';
import { generateRoutePoint } from './mock/point.js';


const POINTS_COUNT = 10;
const points = new Array(POINTS_COUNT).fill().map(generateRoutePoint);
console.log(points)


const position = {
  BEFORE_BEGIN: 'beforebegin',
  AFTER_BEGIN: 'afterbegin',
  BEFORE_END: 'beforeend',
  AFTER_END: 'afterend',
};

const render = (container, template, place = position.BEFORE_END) => {
  container.insertAdjacentHTML(place, template);
};

const headerMainElement = document.querySelector('.trip-main');

render(headerMainElement, createInfoTemplate(), position.AFTER_BEGIN);

const infoElement = headerMainElement.querySelector('.trip-info');
render(infoElement, createCostTemplate());

const controlsElement = headerMainElement.querySelector('.trip-controls');

const navigationElement = controlsElement.querySelector('.trip-controls__navigation');
render(navigationElement, createNavigationTemplate());

const filtersElement = controlsElement.querySelector('.trip-controls__filters');
render(filtersElement, createFiltersTemplate());

const pageMainElement = document.querySelector('.page-main .trip-events');

render(pageMainElement, createSortingTemplate());
render(pageMainElement, createPointsListTemplate());

const pointsList = document.querySelector('.trip-events__list');

render(pointsList, createEditPointTemplate());

for (let i = 0; i < POINTS_COUNT; i++) {
  render(pointsList, createPointTemplate(points[i]));
}

render(pointsList, createAddPointTemplate());

console.log(generateRoutePoint());
