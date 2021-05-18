import AbstractView  from '../view/abstract.js';

import {
  humanizeShortDate,
  humanizeAttributeDate,
  humanizeTime,
  getDuration,
  getDurationFormat
} from '../utils/time-format.js';

import {getOffers} from '../utils/common.js';


const createOffersTemplate = (point) => {
  const offers = getOffers(point);
  return offers
    .map((offer) => {
      return `<li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>`;
    })
    .join('\n');
};

const createPointTemplate = (point) => {
  const {
    type,
    startTime,
    endTime,
    basePrice,
    destinationInfo,
    // offers,
    isFavorite,
  } = point;

  const icon = type.toLowerCase();
  const dateStart = humanizeShortDate(startTime);
  const dateStartAttribute = humanizeAttributeDate(startTime);

  const timeStartAttribute = humanizeTime(startTime);

  const dateEndAttribute = humanizeAttributeDate(endTime);

  const timeEndAttribute = humanizeTime(endTime);
  const duration = getDurationFormat(getDuration(startTime, endTime));

  return `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${dateStartAttribute}">${dateStart}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${icon}.png" alt="Event ${icon} icon">
    </div>
    <h3 class="event__title">${type} ${destinationInfo.destination}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${dateStartAttribute}T${timeStartAttribute}">${timeStartAttribute}</time>
        &mdash;
        <time class="event__end-time" datetime="${dateEndAttribute}T${timeEndAttribute}">${timeEndAttribute}</time>
      </p>
      <p class="event__duration">${duration}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${createOffersTemplate(point)}
    </ul>
    <button class="event__favorite-btn
    ${isFavorite === true ? 'event__favorite-btn--active' : ''}
    type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;
};

export default class Point extends AbstractView {
  constructor(point) {
    super();
    this._point = point;

    this._btnClickHandler = this._btnClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createPointTemplate(this._point);
  }

  _btnClickHandler(evt) {
    evt.preventDefault();
    this._callback.btnClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setRollupBtnClickHandler(callback) {
    this._callback.btnClick = callback;
    this.getElement()
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this._btnClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement()
      .querySelector('.event__favorite-btn')
      .addEventListener('click', this._favoriteClickHandler);
  }
}

