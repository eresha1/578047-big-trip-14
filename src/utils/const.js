export const FilterType = {
  EVERYTHING: 'Everything',
  FUTURE: 'Future',
  PAST: 'Past',
};

export const NavigationItem = {
  TABLE: 'Table',
  STATS: 'Stats',
  NEW_EVENT: 'New event',
};

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
  INIT: 'INIT',
};

export const EMPTY_POINT = {
  id: '',
  type: 'bus',
  offers: [],
  basePrice: '',
  isFavorite: false,
  destinationInfo: {
    name: '',
    description: '',
    pictures: [],
  },
  startTime: new Date,
  endTime: new Date,
};

export const BAR_HEIGHT = 55;

export const SHAKE_ANIMATION_TIMEOUT = 600;
