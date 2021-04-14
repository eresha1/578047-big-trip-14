import {createElement} from '../utils/utils.js';
import {getInfoDate} from '../utils/time-format.js';

const createInfoTitleMarkup = (points) => {
  let route = '';
  if (points.length > 3) {
    route =
      points[0].destinationInfo.destination +
      '&nbsp;&mdash;&nbsp;&hellip;&nbsp;&mdash;&nbsp;' +
      points[points.length - 1].destinationInfo.destination;
  } else {
    route = points
      .map((point) => point.destinationInfo.destination)
      .join('&nbsp;&mdash;&nbsp;');
  }
  return route;
};

const createInfoDatesMarkup = (points) => {
  return getInfoDate(points[0].startTime, points[points.length - 1].endTime);
};

const createInfoTemplate = (points) => {
  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${createInfoTitleMarkup(points)}</h1>

    <p class="trip-info__dates">${createInfoDatesMarkup(points)}</p>
  </div>
</section>`;
};

export default class Info {
  constructor(points) {
    this._points = points;
    this._element = null;
  }

  getTemplate() {
    return createInfoTemplate(this._points);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

