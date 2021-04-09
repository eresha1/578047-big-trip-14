import dayjs from 'dayjs';

import {
  typePoints,
  DESCRIPTION,
  DESTINATION,
  MinCount,
  MaxCount,
  OFFERS
} from './const.js';

import {
  getRandomInteger,
  getRandomElement,
  getRandomQuantityElements
} from '../utils/random.js';

import { generateOffersList } from './offer.js';

const getDestinationImages = (arrayLength) => {
  return new Array(arrayLength).fill('').map(() => ({
    src: 'http://picsum.photos/248/152?r=${Math.random()}',
    alt: 'route-point photo',
  }));
};

const getDestination = () => {
  const destination = getRandomElement(DESTINATION);
  const description = getRandomQuantityElements(
    DESCRIPTION, MinCount.DESCRIPTION_COUNT, MaxCount.DESCRIPTION_COUNT).join(' ');

  const photo = getDestinationImages(
    getRandomInteger(MinCount.IMG_COUNT, MaxCount.IMG_COUNT));
  return {
    destination,
    description,
    photo,
  };
};

const getStartDate = () => {
  const daysGap = getRandomInteger(0, 7);
  const hour = getRandomInteger(0, 23);
  const min = getRandomInteger(0, 59);
  return dayjs().add(daysGap, 'day').add(hour, 'hours').add(min, 'm').toDate();
};

const offersList = generateOffersList(OFFERS, MinCount.OFFER_PRICE, MaxCount.OFFER_PRICE, MaxCount.PRICE_GAP, typePoints);

const getPossibleOffers = (offersList, type) => {
  return offersList.filter((item) => item.typeOffer === type);
};

export const generateRoutePoint = () => {
  const type = getRandomElement(typePoints);
  const icon = type.toLowerCase();

  const destinationInfo = getDestination();
  const startTime = getStartDate();
  const endTime = dayjs(startTime)
    .add(getRandomInteger(10, 2000), 'minute')
    .toDate();
  const duration = endTime - startTime;
  const price = getRandomInteger(MinCount.PRICE, MaxCount.PRICE) * 10;
  const offers = getPossibleOffers(offersList, type);

  return {
    type,
    icon,
    startTime,
    endTime,
    duration,
    price,
    destinationInfo,
    offers,
  };
};
