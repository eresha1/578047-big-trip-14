export const FilterType = {
  EVERYTHING: 'Everything',
  FUTURE: 'Future',
  PAST: 'Past',
};

export const navigationItemsTitle = [
  {
    title: 'Table',
  },
  {
    title: 'Stats',
  },
];

export const SortType = {
  DEFAULT: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};


export const SortsTitle = [
  {
    title: 'day',
    type: SortType.DEFAULT,
  },
  {
    title: 'event',
    isDisabled: true,
    type: SortType.EVENT,
  },
  {
    title: 'time',
    type: SortType.TIME,
  },
  {
    title: 'price',
    type: SortType.PRICE,
  },
  {
    title: 'offers',
    isDisabled: true,
    type: SortType.OFFERS,
  },
];

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export const EMPTY_POINT = {
  type: 'bus',
  offers: [],
  destinationInfo: {
    destination: '',
    description: '',
    photoPlace: [],
  },
  dateFrom: new Date,
  dateTo: new Date,
  basePrice: '',
  isFavorite: false,
};
