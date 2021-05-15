import dayjs from 'dayjs';

export const getTotalCost = (points) => {
  return points.reduce((sum, element) => {
    return sum + element.basePrice;
  }, 0);
};

export const getSortStartDates = (points) => {
  return points.slice().sort((a, b) => a.startTime - b.startTime);
};

export const sortPointsByDate = (a, b) => {
  return dayjs(a.startTime).diff(b.startTime);
};

export const sortPointsByTime = (a, b) => {
  return dayjs(a.endTime).diff(a.startTime) - dayjs(b.endTime).diff(b.startTime);
};

export const sortPointsByPrice = (a, b) => {
  return a.basePrice - b.basePrice;
};

// export const updateItem = (items, update) => {
//   const index = items.findIndex((item) => {
//     item.id === update.id;
//   });

//   if(index === -1) {
//     return items;
//   }

//   return [...items.slice(0, index), update, ...items.slice(index + 1)];
// };
