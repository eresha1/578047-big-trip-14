const createNavigationItemMarkup = (item, isActive) => {
  const {title} = item;

  return `<a class="trip-tabs__btn ${
    isActive ? 'trip-tabs__btn--active' : ''
  }" href="#">${title}</a>`;
};

export const createNavigationTemplate = (itemsTitle) => {
  const navigationItemsTemplate = itemsTitle
    .map((item, index) => createNavigationItemMarkup(item, index === 0))
    .join('\n');

  return `<nav class="trip-controls__trip-tabs  trip-tabs">
  ${navigationItemsTemplate}
  </nav>`;
};
