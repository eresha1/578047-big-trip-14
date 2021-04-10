const sorting = [
    {
      title: `day`,
      isChecked: true,
    },
    {
      title: `event`,
      isDisabled: true,
    },
    {
      title: `time`,
    },
    {
      title: `price`,
    },
    {
      title: `offers`,
      isDisabled: true,
    },
  ];

const createSortingItem = (sorts) => {
  return sorts.map((item) => {
  const {title, isChecked, isDisabled} = item;
    return `<div class="trip-sort__item  trip-sort__item--${item.title}">
    <input id="sort-${item.title}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${item.title}" ${item.isChecked === true ? `checked` : ``}${item.isDisabled === true ? `disabled` : ``}>
    <label class="trip-sort__btn" for="sort-${item.title}">${item.title}</label>
  </div>`;
}).join(`\n`);
};


export const createSortingTemplate = () => {
 return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${createSortingItem(sorting)}
  </form>`;
};
