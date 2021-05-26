export const createInputTypeItemMarkup = (types, currentType) => {

  return types
    .map((type, id) => {
      const isChecked = (type === currentType)? 'checked':'';
      return `<div class="event__type-item">
        <input id="event-type-${id + 1}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}" ${isChecked} >
        <label class="event__type-label  event__type-label--${type.toLowerCase()}
        " for="event-type-${id + 1}">${type}</label>
    </div>`;
    })
    .join('\n');
};

export const createOptionValueMarkup = (destinations) => {
  return destinations
    .map((destination) => {
      return `
    <option value="${destination}"></option>`;
    })
    .join('\n');
};

export const createOffersMarkup = (offers) => {
  return offers
    .map((offer, id) => {
      const {title, price} = offer;
      const isOfferChecked = offer.isChecked ? 'checked' : '';

      return `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="${id + 1}" type="checkbox" name="event-offer-${id + 1}" ${isOfferChecked ? 'checked' : ''}>
        <label class="event__offer-label" for="${id + 1}">
        <span class="event__offer-title">${title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${price}</span>
        </label>
    </div>`;
    })
    .join('\n');
};

export const offersType = (offers) => {
  return `${offers.length > 0 ? `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
    ${createOffersMarkup(offers)}
    </div>
  </section>` :  ''}`;
};

export const createPhotoListMarkup = (photosList) => {
  return photosList
    .map((photo, index) => {
      return `<img class="event__photo" src="${photo.src}" alt="${photo.alt}${
        index + 1
      }">`;
    })
    .join('\n');
};

export const createDestinationMarkup = (destination) => {
  const { description, photoPlace } = destination;
  return `${description.length > 0 &&
    photoPlace.length > 0
    ? `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>
        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${createPhotoListMarkup(photoPlace)}
          </div>
        </div>
      </section>`
    : ''}`;
};
