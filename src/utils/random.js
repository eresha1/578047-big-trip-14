export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomElement = (elements) => {
  const randomIndex = getRandomInteger(0, elements.length - 1);
  return elements[randomIndex];
};

export const generateRandomBoolean = () => Math.random() > 0.5;

export const getRandomIntegerInterval = (a, b, interval) => {
  return Math.floor(getRandomInteger(a, b) / interval) * interval;
};

export const getMixedArray = (elements) => {
  const result = [];
  while (elements.length > 0) {
    const random = getRandomInteger(0, elements.length - 1);
    result.push(elements.splice(random, 1)[0]);
  }
  return result;
};

export const getRandomQuantityElements = (elements, min, max) => {
  const arr = elements.slice();
  return getMixedArray(arr).splice(0, getRandomInteger(min, max));
};

export const generateID = () => {
  return  Date.now() * Math.random()
}
