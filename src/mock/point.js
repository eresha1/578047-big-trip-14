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
  getRandomQuantityElements,
  generateRandomBoolean,
  generateID
} from '../utils/random.js';

import { generateOffersList } from './offer.js';

import {getPossibleOffers} from '../utils/common.js'

const getDestinationImages = (arrayLength, destination) => {
  return new Array(arrayLength).fill('').map(() => ({
    src: `http://picsum.photos/248/152?r=${Math.random()}`,
    alt: `${destination} photo`,
  }));
};

const getDestination = () => {
  const destination = getRandomElement(DESTINATION);
  const description = getRandomQuantityElements(
    DESCRIPTION,
    MinCount.DESCRIPTION_COUNT,
    MaxCount.DESCRIPTION_COUNT,
  );
  const photoPlace = getDestinationImages(
    getRandomInteger(MinCount.IMG_COUNT, MaxCount.IMG_COUNT),
    destination,
  );
  return {
    destination,
    description,
    photoPlace,
  };
};

export const getDestinationsList = () => {
  const destinationsList = [];

  for (let i = 0; i < DESTINATION.length; i++) {
    destinationsList.push(getDestination());
  }
  return destinationsList;
};

const getStartDate = () => {
  const daysGap = getRandomInteger(-7, 7);
  const hour = getRandomInteger(0, 23);
  const min = getRandomInteger(0, 59);
  return dayjs().add(daysGap, 'day').add(hour, 'hours').add(min, 'm').toDate();
};

export const offersList = generateOffersList(OFFERS, typePoints);
console.log(offersList)


export const generateRoutePoint = () => {
  const type = getRandomElement(typePoints);
  const id = generateID();

  const destinationInfo = getDestination();
  const startTime = getStartDate();
  const endTime = dayjs(startTime)
    .add(getRandomInteger(10, 2000), 'minute')
    .toDate();
  const basePrice = getRandomInteger(MinCount.PRICE, MaxCount.PRICE) * 10;
  const offers = getPossibleOffers(type.toLowerCase(), offersList);

  const isFavorite = generateRandomBoolean();
  return {
    id,
    type,
    startTime,
    endTime,
    basePrice,
    destinationInfo,
    offers,
    isFavorite,
  };
};
