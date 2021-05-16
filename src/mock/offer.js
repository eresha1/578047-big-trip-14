import {getRandomInteger} from '../utils/random.js';
import {MinCount, MaxCount} from '../mock/const.js';

export const generateOffersList = (allOffers, types) => {
  const offerList = [];
  let j = 1;
  types.map((type) => {
    const offerCount = getRandomInteger(
      MinCount.OFFER_COUNT,
      MaxCount.OFFER_COUNT);

    const offerTypes = {};
    let i = 0;
    const offers = new Array(offerCount).fill('').map(() => ({
      title: allOffers[i][0],
      price: getRandomInteger(MinCount.OFFER_PRICE, MaxCount.OFFER_PRICE) * 10,
      // typeOffer: type.toLowerCase(),
      id: `${allOffers[i][1].toLowerCase()}-${j}`,
      i: i++,
    }));
    offerTypes.type = type;
    offerTypes.offers = offers;
    offerList.push(offerTypes);
    j++;
  });

  return offerList;
};
