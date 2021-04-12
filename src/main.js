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
import { typePoints } from './mock/const.js';
import { render, getSortStartDates } from './utils/utils.js';
import { position, filtersTitle, navigationTitle, sortingTitle } from './utils/const.js';

const POINTS_COUNT = 3;
const points = new Array(POINTS_COUNT).fill().map(generateRoutePoint);
const sortPoints = getSortStartDates(points);

const headerMainElement = document.querySelector('.trip-main');

render(headerMainElement, createInfoTemplate(sortPoints), position.AFTER_BEGIN);

const infoElement = headerMainElement.querySelector('.trip-info');
render(infoElement, createCostTemplate(points));

const controlsElement = headerMainElement.querySelector('.trip-controls');

const navigationElement = controlsElement.querySelector('.trip-controls__navigation');

render(navigationElement, createNavigationTemplate(navigationTitle));

const filtersElement = controlsElement.querySelector('.trip-controls__filters');
render(filtersElement, createFiltersTemplate(filtersTitle));

const pageMainElement = document.querySelector('.page-main .trip-events');

render(pageMainElement, createSortingTemplate(sortingTitle));
render(pageMainElement, createPointsListTemplate());

const pointsList = document.querySelector('.trip-events__list');

render(pointsList, createEditPointTemplate(points[0], typePoints));

for (let i = 0; i < POINTS_COUNT; i++) {
  render(pointsList, createPointTemplate(sortPoints[i]));
}

render(pointsList, createAddPointTemplate(points[0]));
