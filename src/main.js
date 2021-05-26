import TripPresenter from './presenter/trip.js';
import FilterPresenter from './presenter/filter.js';
import PointsModel from './model/points.js';
import FilterModel from './model/filter.js';
import NavigationView from './view/navigation.js';
import StatsView from './view/stats.js';
import { RenderPosition, render } from './utils/render.js';
import { NavigationItem, UpdateType, FilterType } from './utils/const.js';
import Api from './api.js';

const AUTHORIZATION = 'Basic ojfg32423husi98adgfn';
const END_POINT = 'https://14.ecmascript.pages.academy/big-trip';


const headerElement = document.querySelector('.trip-main');
const controlsElement = headerElement.querySelector('.trip-controls');
const navigationElement = controlsElement.querySelector('.trip-controls__navigation');
const filtersElement = controlsElement.querySelector('.trip-controls__filters');

const pageContainerElement = document.querySelector('.page-main .page-body__container');

const tripEventsElement = pageContainerElement.querySelector('.trip-events');

const addEventButton = headerElement.querySelector('.trip-main__event-add-btn');

const navigationComponent = new NavigationView();
render(navigationElement, navigationComponent, RenderPosition.BEFORE_END);

const api = new Api(END_POINT, AUTHORIZATION);


const pointsModel = new PointsModel();
const filterModel = new FilterModel();


const statsComponent = new StatsView(pointsModel.getPoints());

render(pageContainerElement, statsComponent, RenderPosition.BEFORE_END);



const tripPresenter = new TripPresenter(headerElement, tripEventsElement, pointsModel, filterModel, api);
const filterPresenter = new FilterPresenter(filtersElement, pointsModel, filterModel);

filterPresenter.init();
tripPresenter.init();


const handleMenuClick = (menuItem) => {
  navigationComponent.setMenuItem(menuItem);
  switch (menuItem) {
    case NavigationItem.TABLE:
      tripPresenter.init();
      tripPresenter.show();
      statsComponent.hide('visually-hidden');
      filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
      break;
    case NavigationItem.STATS:
      tripPresenter.destroy();
      tripPresenter.hide();
      statsComponent.show('visually-hidden');
      filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
      break;
  }
};


navigationComponent.setMenuClickHandler(handleMenuClick);

addEventButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  if (NavigationItem.STATS) {
    navigationComponent.setMenuItem(NavigationItem.TABLE);
    tripPresenter.show();
    statsComponent.hide('visually-hidden');
  }
  filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);

  tripPresenter.createPoint();
  evt.target.disabled = true;
});


api.getDestinations()
  .then((destination) => {
    pointsModel.setDestination(UpdateType.INIT, destination);
  })
  .catch(() => {
    pointsModel.setDestination(UpdateType.INIT, []);
  });

api.getOffers()
  .then((offers) => {
    pointsModel.setOffers(UpdateType.INIT, offers);
  })
  .catch(() => {
    pointsModel.setOffers(UpdateType.INIT, []);
  });

api.getPoints()
  .then((points) => {
  console.log(pointsModel);
  console.log(points);
  pointsModel.setPoints(UpdateType.INIT, points);

  // navigationComponent.setMenuClickHandler(handleMenuClick);

// render(pageContainerElement, statsComponent, RenderPosition.BEFORE_END);
// render(navigationElement, navigationComponent, RenderPosition.BEFORE_END);

})
.catch(() => {
  pointsModel.setPoints(UpdateType.INIT, []);
});
