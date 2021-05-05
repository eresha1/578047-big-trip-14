export const createInputTypeItemMarkup = (types, currentType) => {

  return types
    .map((typePoint, id) => {
      // console.log(typePoint, currentType)
      return `<div class="event__type-item">
        <input id="event-type-${id + 1}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typePoint.toLowerCase()}" ${typePoint === currentType ? 'checked' : ''} >
        <label class="event__type-label  event__type-label--${typePoint.toLowerCase()}
        " for="event-type-${id + 1}">${typePoint}</label>
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
    .map((offer) => {
      return `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title}-1" type="checkbox" name="event-offer-${offer.title}">
        <label class="event__offer-label" for="event-offer-${offer.title}-1">
        <span class="event__offer-title">${offer.title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
        </label>
    </div>`;
    })
    .join('\n');
};

export const offersType = (offers, isOffers) => {
  return `${isOffers
    ? `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
        ${createOffersMarkup(offers)}
        </div>
      </section>`
    : ''}`;
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

export const createDestinationMarkup = (destination, isDestinationInfo) => {
  const { description, photoPlace } = destination;
  return `${isDestinationInfo
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
