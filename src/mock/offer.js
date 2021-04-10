import {getRandomElement, getRandomInteger, generateRandomBoolean} from '../utils/random.js';

export const generateOffersList = (offers, min, max, type) => {

  let i = 0;
  return new Array(offers.length).fill('').map(() => ({
    typeOffer: getRandomElement(type),
    title: offers[i],
    priceOffer: getRandomInteger(min, max) * 10,
    id: i++,
  }));
};

// export const generateOffersList = (offers, min, max, types) => {


// const isOffer = generateRandomBoolean();

//   let i = 0;
//   if (isOffer) {
//     return new Array(getRandomInteger(1, offers.length)).fill('').map(() => ({
//       title: offers[i],
//       priceOffer: getRandomInteger(min, max) * 10,
//       id: i++,
//     }))

// }

  // return offerList;
// };
