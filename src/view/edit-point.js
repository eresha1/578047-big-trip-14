import SmartView from './smart.js';
import { humanizeFullDate } from '../utils/time-format';
import { getPossibleOffers, getDestinationNames,  gettypePoints} from '../utils/common.js';
import { Mode } from '../utils/const.js';
import {createInputTypeItemMarkup, createOptionValueMarkup, offersType, createDestinationMarkup} from './points.js';
import he from 'he';
import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const getTypeImage = (type) =>
  `<img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon ${type}">`;

const createEditPointTemplate = (data, destinationNames, typePoints, mode) => {
  const {id, type, startTime, endTime, basePrice, destinationInfo, offers, isDisabled, isSaving, isDeleting} = data;

  const icon = type.toLowerCase();
  const timeStartValue = humanizeFullDate(startTime);
  const timeEndValue = humanizeFullDate(endTime);
  const isEditMode = mode !== Mode.ADDING;

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
          <span class="visually-hidden">Choose event type</span>
          ${getTypeImage(icon)}
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox" ${isDisabled ? 'disabled' : ''}>
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
        <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${he.encode(destinationInfo.name)}" list="destination-list-${id}" ${isDisabled ? 'disabled' : ''} required>
        <datalist id="destination-list-${id}">
        ${createOptionValueMarkup(destinationNames)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-${id}">From</label>
        <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${timeStartValue}" ${isDisabled ? 'disabled' : ''}>
        &mdash;
        <label class="visually-hidden" for="event-end-time-${id}">To</label>
        <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${timeEndValue}" ${isDisabled ? 'disabled' : ''}>
      </div>
      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-${id}">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${basePrice}" ${isDisabled ? 'disabled' : ''} required>
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>

      ${isEditMode ? `<button class="event__reset-btn" type="reset"${isDisabled ? 'disabled' : ''}>${isDeleting ? 'Deleting...' : 'Delete'}</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>` : '<button class="event__reset-btn" type="reset">Cancel</button>'}

    </header>
    <section class="event__details">
      ${offersType(offers, isDisabled)}
      ${createDestinationMarkup(destinationInfo)}
    </form>
  </li>`;
};

export default class EditPoint extends SmartView {
  constructor(point, storage, mode) {
    super();
    this._data = EditPoint.parsePointToState(point);
    this._mode = mode;
    this._startDatepicker = null;
    this._endDatepicker = null;

    this._storage = storage;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._formClickHandler = this._formClickHandler.bind(this);
    this._radioInputHandler = this._radioInputHandler.bind(this);
    this._destinationInputHandler = this._destinationInputHandler.bind(this);
    this._priceChangeHandler = this._priceChangeHandler.bind(this);
    this._offersChangeHandler = this._offersChangeHandler.bind(this);
    this._startTimeChangeHandler = this._startTimeChangeHandler.bind(this);
    this._endTimeChangeHandler = this._endTimeChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setStartDatepicker();
    this._setEndDatepicker();
  }

  getTemplate() {
    const destinationNames = getDestinationNames(
      this._storage.getDestinations(),
    );

    const typePoints = gettypePoints(this._storage.getOffers());

    return createEditPointTemplate(this._data, destinationNames, typePoints, this._mode);
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement()
      .querySelector('.event__reset-btn')
      .addEventListener('click', this._formDeleteClickHandler);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement()
      .querySelector('form')
      .addEventListener('submit', this._formSubmitHandler);
  }

  setFormRollupBtnClickHandler(callback) {
    if (this._mode === Mode.ADDING) {
      return;
    }

    this._callback.formClick = callback;
    this.getElement()
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this._formClickHandler);
  }

  _setStartDatepicker() {
    if (this._startDatepicker) {
      this._startDatepicker.destroy();
      this._startDatepicker = null;
    }

    this._startDatepicker = flatpickr(
      this.getElement().querySelector('input[name=event-start-time]'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        defaultDate: this._data.startTime,
        onChange: this._startTimeChangeHandler,
      },
    );
  }

  _setEndDatepicker() {
    if (this._endDatepicker) {
      this._endDatepicker.destroy();
      this._endDatepicker = null;
    }

    this._endDatepicker = flatpickr(
      this.getElement().querySelector('input[name=event-end-time]'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        default: this._data.endTime,
        minDate: this._data.startTime,
        onChange: this._endTimeChangeHandler,
      },
    );
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelectorAll('input[type=radio]')
      .forEach((item) => item.addEventListener('change', this._radioInputHandler),
      );

    this.getElement()
      .querySelector('.event__input--destination')
      .addEventListener('change', this._destinationInputHandler);

    this.getElement()
      .querySelector('.event__input--price')
      .addEventListener('input', this._priceChangeHandler);

    if (this._data.offers.length) {
      this.getElement()
        .querySelector('.event__available-offers')
        .addEventListener('change', this._offersChangeHandler);
    }
  }

  removeElement() {
    super.removeElement();

    if (this._startDatepicker) {
      this._startDatepicker.destroy();
      this._startDatepicker = null;
    }
    if (this._endDatepicker) {
      this._endDatepicker.destroy();
      this._endDatepicker = null;
    }
  }

  reset(point) {
    this.updateData(EditPoint.parsePointToState(point));
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setStartDatepicker();
    this._setEndDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormRollupBtnClickHandler(this._callback.formClick);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  _offersChangeHandler(evt) {
    evt.preventDefault();
    this._data.offers.forEach((item, index) => {
      item.id = index + 1;
    });

    const changedOfferIndex = this._data.offers.findIndex(
      (offer) => offer.id === +evt.target.id,
    );

    const update = this._data.offers.slice();
    update[changedOfferIndex] = Object.assign(
      {},
      this._data.offers[changedOfferIndex],
      { isChecked: evt.target.checked },
    );

    this.updateData(
      {
        offers: update,
      },
      true,
    );
  }

  _startTimeChangeHandler([userDate]) {
    this.updateData(
      {
        startTime: userDate,
      },
      true,
    );
  }

  _endTimeChangeHandler([userDate]) {
    this.updateData(
      {
        endTime: userDate,
      },
      true,
    );
  }

  _radioInputHandler(evt) {
    const newType = evt.target.value;
    const newOffers = getPossibleOffers(newType, this._storage.getOffers());

    this.updateData({
      type: newType,
      isChecked: evt.target.checked,
      offers: newOffers,
    });
  }

  _destinationInputHandler(evt) {
    if (
      !getDestinationNames(this._storage.getDestinations()).includes(
        evt.target.value,
      )
    ) {
      evt.target.setCustomValidity('Choose one of the suggested directions');
    } else {
      evt.target.setCustomValidity('');
      evt.preventDefault();
      const destinationsList = this._storage.getDestinations();
      for (const key of destinationsList) {
        if (key.name === evt.target.value) {
          this._data.destinationInfo = key;
        }
      }
      this.updateData({
        name: this._data.destinationInfo.name,
      });
    }
    evt.target.reportValidity();
  }

  _priceChangeHandler(evt) {
    evt.preventDefault();
    if (
      !new RegExp(/^-?[1-9]\d{0,5}$/).test(evt.target.value) ||
      evt.target.value < 1
    ) {
      evt.target.setCustomValidity('Enter a positive integer.');
    } else {
      evt.target.setCustomValidity('');
      this.updateData(
        {
          basePrice: +evt.target.value,
        },
        true,
      );
    }
    evt.target.reportValidity();
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(EditPoint.parseStateToPoint(this._data));
  }


  _formClickHandler(evt) {
    evt.preventDefault();
    this._callback.formClick();
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(EditPoint.parseStateToPoint(this._data));
  }

  static parsePointToState(point) {
    return Object.assign({}, point, {
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    });
  }

  static parseStateToPoint(data) {
    data = Object.assign({}, data);

    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;

    return data;
  }
}
