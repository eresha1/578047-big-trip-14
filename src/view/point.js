import dayjs from 'dayjs';

import {humanizeShortDate, humanizeFullDate, humanizeAttributeDate, humanizeTime, getDuration, getDurationFormat} from '../utils/utils';


export const createPointTemplate = (point) => {
  const {type, startTime, endTime,  price, destinationInfo, offers, isFavorite} = point;

  const createOffersTemplate = (offers) => {
    return offers.map((offer) => {
        return `<li class="event__offer">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.priceOffer}</span>
        </li>`;
      }).join(`\n`);
  };

  const isActive = (status) => {
    return status ? `event__favorite-btn--active` : ``;
  };

  const icon = type.toLowerCase();
  const dateStart = humanizeShortDate(startTime);
  const dateStartAttribute = humanizeAttributeDate(startTime);

  const timeStartAttribute = humanizeTime(startTime);

  const dateEndAttribute = humanizeAttributeDate(endTime);

  const timeEndAttribute = humanizeTime(endTime);
  const duration = getDurationFormat(getDuration(startTime, endTime));

  return ` <li class="trip-events__item">
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
      &euro;&nbsp;<span class="event__price-value">${price}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${createOffersTemplate(offers)}
    </ul>
    <button class="event__favorite-btn ${isActive(isFavorite)}" type="button">
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