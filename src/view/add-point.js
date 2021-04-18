import AbstractView  from '../view/abstract.js';
import { typePoints, DESTINATION } from '../mock/const.js';
import { humanizeFullDate } from '../utils/time-format';
import {
  createInputTypeItemMarkup,
  createOptionValueMarkup,
  isOffers,
  createDestinationMarkup
} from '../utils/points.js';

const createAddPointTemplate = (point) => {
  const {
    type,
    startTime,
    endTime,
    destinationInfo,
    offers,
  } = point;
  const destinations = DESTINATION;
  const icon = type.toLowerCase();

  const timeStartValue = humanizeFullDate(startTime);
  const timeEndValue = humanizeFullDate(endTime);

  return `<form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${icon}.png" alt="Event ${icon} icon">
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
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Geneva" list="destination-list-1">
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
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>
    <section class="event__details">
    ${isOffers(offers)}
    ${createDestinationMarkup(destinationInfo)}
  </form>`;
};

export default class AddPoint extends AbstractView {
  constructor(point) {
    super();
    this._point = point;
  }

  getTemplate() {
    return createAddPointTemplate(this._point);
  }
}

