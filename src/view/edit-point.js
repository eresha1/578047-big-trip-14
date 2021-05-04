import SmartView from '../view/smart.js';
import { typePoints, DESTINATION } from '../mock/const.js';
import { humanizeFullDate } from '../utils/time-format';
import { getPossibleOffers, getDestinationsList } from '../mock/point.js';
import {
  createInputTypeItemMarkup,
  createOptionValueMarkup,
  offersType,
  createDestinationMarkup,
} from '../utils/points.js';

const getTypeImage = (type) =>
  type
    ? `<img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon ${type}">`
    : "";

const createEditPointTemplate = (data) => {
  const {
    id,
    type,
    startTime,
    endTime,
    basePrice,
    destinationInfo,
    offers,
    isOffers,
    isDestinationInfo,
  } = data;
  const destinations = DESTINATION;
  const icon = type.toLowerCase();

  console.log(destinationInfo.destination);

  const timeStartValue = humanizeFullDate(startTime);
  const timeEndValue = humanizeFullDate(endTime);

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
          <span class="visually-hidden">Choose event type</span>
          ${getTypeImage(icon)}
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${createInputTypeItemMarkup(typePoints, type)}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-${id}">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${
          destinationInfo.destination
        }" list="destination-list-${id}">
        <datalist id="destination-list-${id}">
        ${createOptionValueMarkup(destinations)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-${id}">From</label>
        <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${timeStartValue}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-${id}">To</label>
        <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${timeEndValue}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-${id}">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
        ${offersType(offers, isOffers)}
        ${createDestinationMarkup(destinationInfo, isDestinationInfo)}
  </form>;
  </li>`;
};

export default class EditPoint extends SmartView {
  constructor(point) {
    super();
    this._data = EditPoint.parsePointToState(point);

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formClickHandler = this._formClickHandler.bind(this);
    this._radioInputHandler = this._radioInputHandler.bind(this);
    this._destinationInputHandler = this._destinationInputHandler.bind(this);
    this._priceChangeHandler = this._priceChangeHandler.bind(this);

    this._setInnerHandlers();
    console.log(this._data);
    console.log(this.getElement().querySelector(".event__save-btn"));
  }

  reset(point) {
    this.updateData(EditPoint.parsePointToState(point));
  }

  getTemplate() {
    return createEditPointTemplate(this._data);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormRollupBtnClickHandler(this._callback.formClick);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelectorAll(`input[type=radio]`)
      .forEach((item) =>
        item.addEventListener(`change`, this._radioInputHandler)
      );

    this.getElement()
      .querySelector(".event__input--destination")
      .addEventListener("change", this._destinationInputHandler);

    this.getElement()
      .querySelector(".event__input--price")
      .addEventListener("input", this._priceChangeHandler);
  }

  _radioInputHandler(evt) {
    this._data.type = evt.target.value;
    this.updateData({
      type: evt.target.value,
      // isChecked: (this._data.type === evt.target.value),
      offers: getPossibleOffers(this._data.type),
    });
  }

  _destinationInputHandler(evt) {
    evt.preventDefault();
    const destinationsList = getDestinationsList();

    for (let key of destinationsList) {
      if (key.destination === evt.target.value) {
        this._data.destinationInfo = key;
      }
    }

    this.updateData({
      destination: this._data.destinationInfo.destination,
    });
  }

  _priceChangeHandler(evt) {
    evt.preventDefault();
    console.log(evt.target.value);
    if (!new RegExp(/^-?[1-9]\d{0,5}$/).test(evt.target.value)) {
      evt.target.setCustomValidity("Enter a positive integer.");
      evt.target.reportValidity();
      return;
    }
    this.updateData(
      {
        basePrice: evt.target.value,
      },
      true
    );
    console.log(this._data);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(EditPoint.parseStateToPoint(this._data));
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement()
      .querySelector('form')
      .addEventListener('submit', this._formSubmitHandler);
  }

  _formClickHandler(evt) {
    evt.preventDefault();
    this._callback.formClick();
  }

  setFormRollupBtnClickHandler(callback) {
    this._callback.formClick = callback;
    this.getElement()
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this._formClickHandler);
  }

  static parsePointToState(point) {
    return Object.assign({}, point, {
      isOffers: point.offers.length > 0,
      isDestinationInfo:
        point.destinationInfo.description.length > 0 &&
        point.destinationInfo.photoPlace.length > 0,
    });
  }

  static parseStateToPoint(data) {
    data = Object.assign({}, data);

    delete data.isOffers;
    delete data.isDestinationInfo;

    return data;
  }
}
