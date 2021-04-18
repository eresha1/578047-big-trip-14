import MainInfoView from './view/main-info.js';
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
import { getSortStartDates } from './utils/common.js';
import { RenderPosition, render, replace } from './utils/render.js';
import { filtersTitle, navigationItemsTitle, sortsTitle } from './utils/const.js';

const POINTS_COUNT = 5;
const points = new Array(POINTS_COUNT).fill().map(generateRoutePoint);
const sortPoints = getSortStartDates(points);
const headerMainElement = document.querySelector('.trip-main');
const controlsElement = headerMainElement.querySelector('.trip-controls');
const navigationElement = controlsElement.querySelector('.trip-controls__navigation');
const filtersBlock = controlsElement.querySelector('.trip-controls__filters');

const pageMainElement = document.querySelector('.page-main .trip-events');


const renderTripInfo = () => {
  const infoComponent = new MainInfoView();
  render(headerMainElement, infoComponent, RenderPosition.AFTER_BEGIN);

  render(infoComponent, new InfoView(sortPoints), RenderPosition.BEFORE_END);
  render(infoComponent, new CostView(points), RenderPosition.BEFORE_END);
};

const renderPoint = (pointListElement, point) => {
  const pointComponent = new PointView(point);
  const editPointComponent = new EditPointView(point);

  const replacePointToForm = () => {
    replace(editPointComponent, pointComponent);
  };

  const replaceFormToPoint = () => {
    replace(pointComponent, editPointComponent);
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

  render(pointListElement, pointComponent, RenderPosition.BEFORE_END);
};

const renderPointsSection = () => {
  render(pageMainElement, new SortingView(sortsTitle), RenderPosition.BEFORE_END);

  const pointsListComponent = new PointsListView();

  render(pageMainElement, pointsListComponent, RenderPosition.BEFORE_END);

  sortPoints.forEach((point) => renderPoint(pointsListComponent, point));
};

render(navigationElement, new NavigationView(navigationItemsTitle), RenderPosition.BEFORE_END);
render(filtersBlock, new FiltersView(filtersTitle), RenderPosition.BEFORE_END);

if (points.length > 0) {
  renderTripInfo();
  renderPointsSection();
} else {
  render(pageMainElement, new ListEmptyView(), RenderPosition.BEFORE_END);
}
