import {getRandomElement, getRandomIntegerInterval} from '../utils/random.js';

export const generateOffersList = (offers, min, max, gap, type) => {
  let i = 0;
  return new Array(offers.length).fill('').map(() => ({
    typeOffer: getRandomElement(type),
    title: offers[i],
    price: getRandomIntegerInterval(min, max, gap),
    id: i++,
  }));
};

