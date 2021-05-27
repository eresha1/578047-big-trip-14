export default class Store {
  constructor() {
    this._destinations = [];
    this._offers = [];
  }

  setDestinations(destinations) {
    this._destinations = destinations;
    console.log(this._destinations)
  }

  getDestinations() {
    return this._destinations.slice();
  }

  setOffers(offers) {
    this._offers = offers;
    console.log(offers)
    // offers.forEach((offer) => this._offers.set(offer.type, offer.offers));
  }

  getOffers() {
    return this._offers;
  }
}
