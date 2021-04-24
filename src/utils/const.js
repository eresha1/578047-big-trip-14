export const filtersTitle = [
  {
    title: 'Everything',
  },
  {
    title: 'Future',
  },
  {
    title: 'Past',
  },
];

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
    // isChecked: true,
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

