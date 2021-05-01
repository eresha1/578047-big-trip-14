import SmartView  from '../view/smart.js';
import { typePoints, DESTINATION } from '../mock/const.js';
import { humanizeFullDate } from '../utils/time-format';
import { getPossibleOffers } from '../mock/point.js';
import {
  createInputTypeItemMarkup,
  createOptionValueMarkup,
  offersType,
  createDestinationMarkup
} from '../utils/points.js';


const getTypeImage = (type) =>
  type
    ? `<img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon ${type}">`
    : '';


const createEditPointTemplate = (point) => {
  const {
    type,
    startTime,
    endTime,
    price,
    destinationInfo,
    offers,
  } = point;
  const destinations = DESTINATION;
  const icon = type.toLowerCase();

  console.log(typePoints, type, offers)

  const timeStartValue = humanizeFullDate(startTime);
  const timeEndValue = humanizeFullDate(endTime);

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          ${getTypeImage(icon)}
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${createInputTypeItemMarkup(typePoints, type)}
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
        ${offersType(offers)}
        ${createDestinationMarkup(destinationInfo)}
  </form>;
  </li>`;
};

export default class EditPoint extends SmartView {
  constructor(point) {
    super();
    // this._point = point;
    this._data = EditPoint.parsePointToState(point);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formClickHandler = this._formClickHandler.bind(this);
    this._handleInputRadio = this._handleInputRadio.bind(this);

    this._setInnerHandlers();
    console.log(this._data.offers)
    console.log(getPossibleOffers(this._data.type.toLowerCase()))
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
      .forEach((item) => item.addEventListener(`change`, this._handleInputRadio));


    // this.getElement()
    //   .querySelector('.event__input--destination')
    //   .addEventListener('blur', this._destinationToggleHandler);
    // this.getElement()
    //   .querySelector('.event__input--price')
    //   .addEventListener('input', this._priceChangeHAndler);
    // if (this._state.hasOffers) {
    //   this.getElement()
    //     .querySelector('.event__available-offers')
    //     .addEventListener('click', this._offersSelectionHandler);
    }


    _handleInputRadio(evt) {
      console.log(this._data)
      console.log(this._data.type)
      console.log(this._data.offers)
      console.log(evt.target.value)
      console.log( getPossibleOffers(this._data.offers))
      // console.log(getPossibleOffers)
    // console.log(evt.target.checked)
    this._data.type = evt.target.value
      this.updateData({
        type: evt.target.value,
        isChecked: evt.target.value = this._data.type ,
        offers: ( getPossibleOffers(this._data.type)),
      });

    }


  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(EditPoint.parseStateToPoint(this._data));

  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().addEventListener('submit', this._formSubmitHandler);
  }

  _formClickHandler(evt) {
    evt.preventDefault();
    this._callback.formClick();
  }

  setFormRollupBtnClickHandler(callback) {
    this._callback.formClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._formClickHandler);
  }

  static parsePointToState(point) {
    return Object.assign(
      {},
      point,
      {
        // isOffers: offers.length > 0,
      },
    );

  }

  static parseStateToPoint(data) {
    data = Object.assign({}, data);
    delete data.pointId;
    return data;
  }

}

