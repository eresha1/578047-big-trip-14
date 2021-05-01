import {getRandomInteger} from '../utils/random.js';
import {MinCount, MaxCount} from '../mock/const.js';

export const generateOffersList = (allOffers, types) => {
  const offerList = [];
  types.map((type) => {
    const offerCount = getRandomInteger(
      MinCount.OFFER_COUNT,
      MaxCount.OFFER_COUNT);

    const offerTypes = {};
    let i = 0;
    const offers = new Array(offerCount).fill("").map(() => ({
      title: allOffers[getRandomInteger(0, offerCount - 1)],
      price: getRandomInteger(MinCount.OFFER_PRICE, MaxCount.OFFER_PRICE) * 10,
      id: i++,
    }));
    offerTypes.type = type;
    offerTypes.offers = offers;
    offerList.push(offerTypes);
  });
  return offerList;
};

// export const generateOffersList = (offers, min, max, type) => {

//   let i = 0;
//   return new Array(offers.length).fill('').map(() => ({
//     typeOffer: getRandomElement(type),
//     title: offers[i],
//     priceOffer: getRandomInteger(min, max) * 10,
//     id: i++,
//   }));
// };


// {
//   "type": "taxi",
//   "offers": [
//     {
//       "title": "Upgrade to a business class",
//       "price": 120
//     }, {
//       "title": "Choose the radio station",
//       "price": 60
//     }
//   ]
// }
