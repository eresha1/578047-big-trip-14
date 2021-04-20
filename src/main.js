import TripPresenter from './presenter/trip.js';
import NavigationView from './view/navigation.js';
import FiltersView from './view/filters.js';
import { generateRoutePoint } from './mock/point.js';
import { getSortStartDates } from './utils/common.js';
import { RenderPosition, render } from './utils/render.js';
import { filtersTitle, navigationItemsTitle, sortsTitle } from './utils/const.js';

const POINTS_COUNT = 5;
const points = new Array(POINTS_COUNT).fill().map(generateRoutePoint);
const sortPoints = getSortStartDates(points);
const headerMainElement = document.querySelector('.trip-main');
const controlsElement = headerMainElement.querySelector('.trip-controls');
const navigationElement = controlsElement.querySelector('.trip-controls__navigation');
const filtersBlock = controlsElement.querySelector('.trip-controls__filters');

const pageMainElement = document.querySelector('.page-main .trip-events');

render(navigationElement, new NavigationView(navigationItemsTitle), RenderPosition.BEFORE_END);
render(filtersBlock, new FiltersView(filtersTitle), RenderPosition.BEFORE_END);

const tripPresenter = new TripPresenter(headerMainElement, pageMainElement);
tripPresenter.init(sortPoints, sortsTitle);
