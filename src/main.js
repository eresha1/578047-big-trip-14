import InfoView from './view/info.js';
import CostView from './view/cost.js';
import NavigationView from './view/navigation.js';
import FiltersView from './view/filters.js';
import SortingView from './view/sorting.js';
import PointsListView from './view/points-list.js';
import ListEmptyView from './view/list-empty.js';

import PointView from './view/point.js';
// import AddPointView from './view/add-point.js';
import EditPointView from './view/edit-point.js';
import { generateRoutePoint } from './mock/point.js';
import { render, getSortStartDates } from './utils/utils.js';
import { RenderPosition, filtersTitle, navigationItemsTitle, sortsTitle } from './utils/const.js';

const POINTS_COUNT = 3;
const points = new Array(POINTS_COUNT).fill().map(generateRoutePoint);
const sortPoints = getSortStartDates(points);

const renderPoint = (pointListElement, point) => {
  const pointComponent = new PointView(point);
  const editPointComponent = new EditPointView(point);

  const replacePointToForm = () => {
    pointListElement.replaceChild(editPointComponent.getElement(), pointComponent.getElement());
  };

  const replaceFormToPoint = () => {
    pointListElement.replaceChild(pointComponent.getElement(), editPointComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  pointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replacePointToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  editPointComponent.getElement().addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  editPointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceFormToPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(pointListElement, pointComponent.getElement(), RenderPosition.BEFORE_END);
};

const headerMainElement = document.querySelector('.trip-main');

const controlsElement = headerMainElement.querySelector('.trip-controls');

const navigationElement = controlsElement.querySelector('.trip-controls__navigation');

render(navigationElement, new NavigationView(navigationItemsTitle).getElement(), RenderPosition.BEFORE_END);

const filtersBlock = controlsElement.querySelector('.trip-controls__filters');

render(filtersBlock, new FiltersView(filtersTitle).getElement(), RenderPosition.BEFORE_END);

const pageMainElement = document.querySelector('.page-main .trip-events');

if (points.length === 0) {
  render(pageMainElement, new ListEmptyView().getElement(), RenderPosition.BEFORE_END);
} else {

  render(headerMainElement, new InfoView(sortPoints).getElement(), RenderPosition.AFTER_BEGIN);

  const infoElement = headerMainElement.querySelector('.trip-info');
  render(infoElement, new CostView(points).getElement(), RenderPosition.BEFORE_END);

  render(pageMainElement, new SortingView(sortsTitle).getElement(), RenderPosition.BEFORE_END);

  const pointsListComponent = new PointsListView();

  render(pageMainElement, pointsListComponent.getElement(), RenderPosition.BEFORE_END);

  for (let i = 0; i < POINTS_COUNT; i++) {
    renderPoint(pointsListComponent.getElement(), sortPoints[i]);
  }
}

// render(pointsListComponent.getElement(), new AddPointView(points[0]).getElement(), RenderPosition.BEFORE_END);

