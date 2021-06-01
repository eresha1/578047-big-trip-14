import AbstractView  from '../view/abstract.js';
import {getInfoDate} from '../utils/time-format.js';

const createInfoTitleMarkup = (points) => {
  return points.length > 3
    ? points[0].destinationInfo.name +
        "&nbsp;&mdash;&nbsp;&hellip;&nbsp;&mdash;&nbsp;" +
        points[points.length - 1].destinationInfo.name
    : points
        .map((point) => point.destinationInfo.name)
        .join("&nbsp;&mdash;&nbsp;");
};

const createInfoDatesMarkup = (points) => {
  return getInfoDate(points[0].startTime, points[points.length - 1].endTime);
};

const createInfoTemplate = (points) => {
  return `<div class="trip-info__main">
    <h1 class="trip-info__title">${createInfoTitleMarkup(points)}</h1>

    <p class="trip-info__dates">${createInfoDatesMarkup(points)}</p>
  </div>`;
};

export default class Info extends AbstractView {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createInfoTemplate(this._points);
  }
}

