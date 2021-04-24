// import { SortType } from './const.js';

export const getTotalCost = (points) => {
  return points.reduce((sum, element) => {
    return sum + element.price;
  }, 0);
};

export const getSortStartDates = (points) => {
  return points.slice().sort((a, b) => a.startTime - b.startTime);
};

// export const getSortPoints = (points, sortType) => {
//   let sortPoints = [];
//   const shownPoints = points.slice();

//   switch (sortType) {
//     case SortType.DEFAULT:
//       sortPoints = shownPoints.sort((a, b) => a.startTime - b.startTime);
//       break;
//     case SortType.TIME:
//       sortPoints = shownPoints.sort((a, b) => a.duration - b.duration);
//       break;
//     case SortType.PRICE:
//       sortPoints = shownPoints.sort((a, b) => a.price - b.price);
//       break;
//   }
//   return sortPoints;
// };

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};
