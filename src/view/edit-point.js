import { typePoints, DESTINATION } from '../mock/const.js';
import {humanizeFullDate} from '../utils/utils';

const createInputTypeItemMarkup = (types) => {
  return types.map((typePoint) => {
    const typeLowerCase = typePoint.toLowerCase();
      return `<div class="event__type-item">
        <input id="event-type-${typeLowerCase}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeLowerCase}">
        <label class="event__type-label  event__type-label--${typeLowerCase}" for="event-type-${typeLowerCase}-1">${typePoint}</label>
    </div>`;
    }).join(`\n`);
};

const createOptionValueMarkup = (destinations) => {
  return destinations.map((destination) => {
    return `
    <option value="${destination}"></option>`;
  })
    .join(`\n`);
  };


const createOffersMarkup = (offers) => {
  return offers.map((offer) => {
    return `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-1" type="checkbox" name="event-offer-meal">
    <label class="event__offer-label" for="event-offer-meal-1">
      <span class="event__offer-title">${offer.title}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${offer.priceOffer}</span>
    </label>
    </div>`;
  })
  .join(`\n`);
};

const isOffers = (offers) => {
  console.log(offers)
  return offers.length > 0 ?
`<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
        ${createOffersMarkup(offers)}
        </div>
      </section>`: ``;
    };


const createPhotoListMarkup = (photosList) => {
  return photosList.map((photo, index) => {
    return `<img class="event__photo" src="${photo.src}" alt="${photo.alt}${index + 1}">`;
  })
    .join(`\n`);
};


    const createDestinationMarkup = (destination) => {
        const {description, photoPlace} = destination;
        return `
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>
        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${createPhotoListMarkup(photoPlace)}
          </div>
        </div>
      </section>`;
      };

export const createEditPointTemplate = (point) => {
  const {type, startTime, endTime, duration, price, destinationInfo, offers} = point;
  const destinations = DESTINATION;
  const icon = type.toLowerCase();

  const timeStartValue = humanizeFullDate(startTime);
  const timeEndValue = humanizeFullDate(endTime);
  console.log(offers)

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${icon}.png" alt="${icon} icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${createInputTypeItemMarkup(typePoints)}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Chamonix" list="destination-list-1">
        <datalist id="destination-list-1">
        ${createOptionValueMarkup(destinations)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${timeStartValue}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${timeEndValue}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
        ${isOffers(offers)}
        ${createDestinationMarkup(destinationInfo)}
  </form>
</li>`;
};
