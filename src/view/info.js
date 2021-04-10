import dayjs from 'dayjs';

const createInfoTitleMarkup = (points) => {
  let route = ``;
  if (points.length > 3) {
    route =
      points[0].destinationInfo.destination +
      `&nbsp;&mdash;&nbsp;&hellip;&nbsp;&mdash;&nbsp;` +
      points[points.length - 1].destinationInfo.destination;
  } else {
    route = points.map((point) => point.destinationInfo.destination).join(`&nbsp;&mdash;&nbsp;`);
  }
  return route;
};

const createInfoDatesMarkup = (points) => {
  const startDate = dayjs(points[0].startTime);
  const endDate = dayjs(points[points.length - 1].endTime);
  if (startDate.month() === endDate.month()) {
    return (
      startDate.format("MMM DD") + `&nbsp;&mdash;&nbsp;` + endDate.format("DD")
    );
  } else {
    return (
      startDate.format("MMM DD") +
      `&nbsp;&mdash;&nbsp;` +
      endDate.format("MMM DD")
    );
  }
};

export const createInfoTemplate = (points) => {

  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${createInfoTitleMarkup(points)}</h1>

    <p class="trip-info__dates">${createInfoDatesMarkup(points)}</p>
  </div>
</section>`;
};
