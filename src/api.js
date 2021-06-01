import PointsModel from './model/points.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299,
};

const Url = {
  POINTS: 'points',
  OFFERS: 'offers',
  DESTINATIONS: 'destinations',
};

export default class Api {
  constructor(endPoint, authorization, storage) {
    this._endPoint = endPoint;
    this._authorization = authorization;
    this._storage = storage;
  }

  getPoints() {
    return this._load({url: Url.POINTS})
      .then(Api.toJSON)
      .then((points) => points.map(PointsModel.adaptToClient));
  }

  getOffers() {
    return this._load({url: Url.OFFERS})
      .then(Api.toJSON);
  }

  getDestinations() {
    return this._load({url: Url.DESTINATIONS})
      .then(Api.toJSON);
  }

  getAllData() {
    return Promise.all([
      this.getDestinations(),
      this.getOffers(),
      this.getPoints(),
    ])
      .then(([destinations, offers, points]) => {
        this._storage.setDestinations(destinations);
        this._storage.setOffers(offers);
        return points;
      })
      .catch(() => {
        this._storage.setDestinations([]);
        this._storage.setOffers([]);
        document
          .querySelector('.trip-main__event-add-btn')
          .setAttribute('disabled', 'disabled');
      });
  }

  updatePoint(point) {
    return this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(PointsModel.adaptToServer(point)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    })
      .then(Api.toJSON)
      .then(PointsModel.adaptToClient);
  }

  addPoint(point) {
    return this._load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(PointsModel.adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(Api.toJSON)
      .then(PointsModel.adaptToClient);
  }

  deletePoint(point) {
    return this._load({
      url: `points/${point.id}`,
      method: Method.DELETE,
    });
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers() }) {
    headers.append('Authorization', this._authorization);

    return fetch(
      `${this._endPoint}/${url}`,
      { method, body, headers })
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatusRange.MIN ||
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}
