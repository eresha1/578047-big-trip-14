import InfoView from './view/info.js';
import CostView from './view/cost.js';
import NavigationView from './view/navigation.js';
import FiltersView from './view/filters.js';
import SortingView from './view/sorting.js';
import PointsListView from './view/points-list.js';
import ListEmptyView from './view/list-empty.js';
import PointView from './view/point.js';
import EditPointView from './view/edit-point.js';
import { generateRoutePoint } from './mock/point.js';
import { render, getSortStartDates } from './utils/utils.js';
import { RenderPosition, filtersTitle, navigationItemsTitle, sortsTitle } from './utils/const.js';

const POINTS_COUNT = 5;
const points = new Array(POINTS_COUNT).fill().map(generateRoutePoint);
const sortPoints = getSortStartDates(points);
const headerMainElement = document.querySelector('.trip-main');
const controlsElement = headerMainElement.querySelector('.trip-controls');
const navigationElement = controlsElement.querySelector('.trip-controls__navigation');
const filtersBlock = controlsElement.querySelector('.trip-controls__filters');

const pageMainElement = document.querySelector('.page-main .trip-events');

const renderTripInfo = () => {
  render(headerMainElement, new InfoView(sortPoints).getElement(), RenderPosition.AFTER_BEGIN);

  const infoElement = headerMainElement.querySelector('.trip-info');
  render(infoElement, new CostView(points).getElement(), RenderPosition.BEFORE_END);
};

const renderPointsSection = () => {
  render(pageMainElement, new SortingView(sortsTitle).getElement(), RenderPosition.BEFORE_END);

  const pointsListComponent = new PointsListView();

  render(pageMainElement, pointsListComponent.getElement(), RenderPosition.BEFORE_END);

  sortPoints.forEach((point) => renderPoint(pointsListComponent.getElement(), point));
};

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

  pointComponent.setRollupBtnClickHandler(() => {
    replacePointToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  editPointComponent.setFormSubmitHandler(() => {
    replaceFormToPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  editPointComponent.setFormRollupBtnClickHandler(() => {
    replaceFormToPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(pointListElement, pointComponent.getElement(), RenderPosition.BEFORE_END);
};

render(navigationElement, new NavigationView(navigationItemsTitle).getElement(), RenderPosition.BEFORE_END);
render(filtersBlock, new FiltersView(filtersTitle).getElement(), RenderPosition.BEFORE_END);

if (points.length > 0) {
  renderTripInfo();
  renderPointsSection();
} else {
  render(pageMainElement, new ListEmptyView().getElement(), RenderPosition.BEFORE_END);
}
