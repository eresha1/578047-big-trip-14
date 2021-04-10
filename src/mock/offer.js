import {getRandomElement, getRandomInteger} from '../utils/random.js';

export const generateOffersList = (offers, min, max, type) => {
  let i = 0;
  return new Array(offers.length).fill('').map(() => ({
    typeOffer: getRandomElement(type),
    title: offers[i],
    priceOffer: getRandomInteger(min, max) * 10,
    id: i++,
  }));
};

