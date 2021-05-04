export const getTotalCost = (points) => {
  return points.reduce((sum, element) => {
    return sum + element.basePrice;
  }, 0);
};

export const getSortStartDates = (points) => {
  return points.slice().sort((a, b) => a.startTime - b.startTime);
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => {
    item.id === update.id;
  });
  
  if (index === -1) {
    return items;
  }

  return [...items.slice(0, index), update, ...items.slice(index + 1)];
};
