import dayjs from 'dayjs';

const castomizeTimeFormat = (time) => {
  return time < 10 ? '0' + time : time;
};

export const humanizeShortDate = (date) => {
  return dayjs(date).format('MMM DD');
};

export const humanizeAttributeDate = (date) => {
  return dayjs(date).format('DD-MM-YYYY');
};

export const humanizeFullDate = (date) => {
  return dayjs(date).format('DD/MM/YY HH:mm');
};

export const humanizeTime = (date) => {
  return dayjs(date).format('HH:mm');
};

export const getDuration = (startTime, endTime) => {
  return dayjs(endTime).diff(startTime, 'minute');
};

export const getDurationFormat = (duration) => {
  const days = castomizeTimeFormat(Math.trunc(duration / 1440));
  const hours = castomizeTimeFormat(Math.trunc((duration % 1440) / 60));

  const minutes = castomizeTimeFormat((duration % 1440) % 60);

  if (duration >= 1440) {
    return (`${days}D ${hours}H ${minutes}M`);
  } else if (duration >= 60) {
    return `${hours}H ${minutes}M`;
  } else {
    return `${minutes}M`;
  }
};

export const getInfoDate = (startTime, endTime) => {
  const startDate = dayjs(startTime);
  const endDate = dayjs(endTime);

  return startDate.month() === endDate.month()
    ? `${dayjs(startTime).format('MMM DD')} &mdash; ${dayjs(endTime).format('DD')}`
    : `${dayjs(startTime).format('MMM DD')} &mdash; ${dayjs(endTime).format('MMM DD')}`;
};
