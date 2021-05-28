import Observer from '../utils/observer.js';
// import dayjs from 'dayjs';

export default class Points extends Observer {
  constructor() {
    super();
    this._points = [];
  }

  setPoints(updateType, points) {
    this._points = points.slice();

    this._notify(updateType);
  }

  getPoints() {
    return this._points;
  }

  // setDestination(updateType, destinations) {
  //   this._destinationList = destinations.slice();
  // }

  // getDestination() {
  //   return this._destinationList;
  // }

  // setOffers(updateType, offers) {
  //   this._offerList = offers.slice();
  // }

  // getOffers() {
  //   return this._offerList;
  // }

  updatePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this._points = [
      ...this._points.slice(0, index),
      update,
      ...this._points.slice(index + 1),
    ];
    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this._points = [
      update,
      ...this._points,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1),
    ];

    this._notify(updateType);
  }

  static adaptToClient(point) {
    const adaptedPoint = Object.assign(
        {},
        point,
        {
          basePrice: point.base_price,
          isFavourite: point.is_favorite,
          startTime: point.date_from !== null ? new Date(point.date_from) : point.date_from,
          // startTime: dayjs(point.date_from),
          endTime: point.adaptedPoint !== null ? new Date(point.date_to) : point.date_to,
          destinationInfo: point.destination,
          // endTime: dayjs(point.date_to),
          // destinationInfo: {
          //   destination: point.destination.name,
          //   description: point.destination.description,
          //   photoPlace: point.destination.pictures
          // },

        }
    );

    delete adaptedPoint.base_price;
    delete adaptedPoint.is_favorite;
    delete adaptedPoint.date_from;
    delete adaptedPoint.date_to;
    delete adaptedPoint.destination;

    return adaptedPoint;
  }

  static adaptToServer(point) {
    const adaptedPoint = Object.assign(
        {},
        point,
        {
          'base_price': point.basePrice,
          'is_favorite': point.isFavourite,
          'date_from': point.startTime.toISOString(),
          'date_to': point.endTime.toISOString(),
          'destination': point.destinationInfo,
          // 'destination': {
          //   name: point.destinationInfo.destination,
          //   description: point.destinationInfo.description,
          //   pictures: point.destinationInfo.photoPlace
          // }
        }
    );

    delete adaptedPoint.price;
    delete adaptedPoint.isFavourite;
    delete adaptedPoint.startDate;
    delete adaptedPoint.endDate;
    delete adaptedPoint.destinationInfo;

    return adaptedPoint;
  }
}
