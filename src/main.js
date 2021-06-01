import TripPresenter from './presenter/trip.js';
import FilterPresenter from './presenter/filter.js';
import PointsModel from './model/points.js';
import FilterModel from './model/filter.js';
import NavigationView from './view/navigation.js';
import StatsView from './view/stats.js';
import { RenderPosition, render, remove } from './utils/render.js';
import { NavigationItem, UpdateType, FilterType } from './utils/const.js';
import Api from './api.js';
import Storage from './storage';

const AUTHORIZATION = 'Basic ojfg32423husi98adgfn';
const END_POINT = 'https://14.ecmascript.pages.academy/big-trip';

const headerElement = document.querySelector('.trip-main');
const controlsElement = headerElement.querySelector('.trip-controls');
const navigationElement = controlsElement.querySelector('.trip-controls__navigation');
const filtersElement = controlsElement.querySelector('.trip-controls__filters');

const pageContainerElement = document.querySelector('.page-main .page-body__container');

const tripEventsElement = pageContainerElement.querySelector('.trip-events');

const addEventButton = headerElement.querySelector('.trip-main__event-add-btn');

const storage = new Storage();
const api = new Api(END_POINT, AUTHORIZATION, storage);

const pointsModel = new PointsModel();
const filterModel = new FilterModel();

const navigationComponent = new NavigationView();
render(navigationElement, navigationComponent, RenderPosition.BEFORE_END);

const tripPresenter = new TripPresenter(headerElement, tripEventsElement, pointsModel, filterModel, api, storage);
const filterPresenter = new FilterPresenter(filtersElement, pointsModel, filterModel);

filterPresenter.init();
tripPresenter.init();

let statsComponent = null;

const handleMenuClick = (menuItem) => {
  navigationComponent.setMenuItem(menuItem);
  switch (menuItem) {
    case NavigationItem.TABLE:
      remove(statsComponent);
      tripPresenter.show();
      filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
      break;
    case NavigationItem.STATS:
      tripPresenter.hide();
      filterPresenter.disable();
      statsComponent = new StatsView(pointsModel.getPoints());
      render(pageContainerElement, statsComponent, RenderPosition.BEFORE_END);
      statsComponent.show('visually-hidden');
      break;
  }
};

navigationComponent.setMenuClickHandler(handleMenuClick);

addEventButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  if (NavigationItem.STATS) {
    navigationComponent.setMenuItem(NavigationItem.TABLE);
    tripPresenter.show();
    remove(statsComponent);
  }
  filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);

  tripPresenter.createPoint();
  evt.target.disabled = true;
});

api
  .getAllData()
  .then((points) => {
    pointsModel.setPoints(UpdateType.INIT, points);
  })
  .catch(() => {
    pointsModel.setPoints(UpdateType.INIT, []);
  });

