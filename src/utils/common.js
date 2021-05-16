import dayjs from 'dayjs';

export const getTotalCost = (points) => {
  let totalCoast = 0;
  if (points.length) {
    const totalPrice = points.reduce((sum, point) => {
    return sum + +point.basePrice;
  }, 0);

  const totalPriceOffers = points.reduce((sumAll, {offers}) =>  sumAll + offers.filter(({isChecked}) => isChecked).reduce((sum, {price}) => sum + price, 0), 0);
  console.log(totalPriceOffers)
  totalCoast = totalPrice + totalPriceOffers;
  }
  return totalCoast
};

export const getOffers = (point) => {
  if (point.offers) {
    const checkedOffers = point.offers.filter(({isChecked}) => isChecked)
    return checkedOffers
  }
};


// export const getTotalCost = (points) => {
//   return points.reduce((sum, element) => {
//     return sum + +element.basePrice;
//   }, 0);
// };

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


export const getPointFuture = (startTime) => {
 const aaa = dayjs().diff(dayjs(startTime)) < 0;
 console.log(aaa)
 return aaa
};

export const getPointPast = (endTime) => {
  return dayjs().diff(dayjs(endTime)) > 0;
};

