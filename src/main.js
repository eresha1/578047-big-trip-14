import TripPresenter from './presenter/trip.js';
import FilterPresenter from './presenter/filter.js';
import PointsModel from './model/points.js';
import FilterModel from './model/filter.js';
import NavigationView from './view/navigation.js';
import { generateRoutePoint } from './mock/point.js';
import { RenderPosition, render } from './utils/render.js';
import { navigationItemsTitle } from './utils/const.js';

const POINTS_COUNT = 4;
const points = new Array(POINTS_COUNT).fill().map(generateRoutePoint);

const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const filterModel = new FilterModel();

const headerMainElement = document.querySelector('.trip-main');
const controlsElement = headerMainElement.querySelector('.trip-controls');
const navigationElement = controlsElement.querySelector('.trip-controls__navigation');
const filtersBlock = controlsElement.querySelector('.trip-controls__filters');

const pageMainElement = document.querySelector('.page-main .trip-events');

render(navigationElement, new NavigationView(navigationItemsTitle), RenderPosition.BEFORE_END);

const tripPresenter = new TripPresenter(headerMainElement, pageMainElement, pointsModel, filterModel);

const filterPresenter = new FilterPresenter(filtersBlock, pointsModel, filterModel);

filterPresenter.init();
tripPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
  evt.target.disabled = true;
});
