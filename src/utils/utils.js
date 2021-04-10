import dayjs from 'dayjs';

export const humanizeShortDate = (date) => {
  return dayjs(date).format('MMM DD');
};

export const humanizeAttributeDate = (date) => {
  return dayjs(date).format('YYYY-MM-DD');
};

export const humanizeFullDate = (date) => {
  return dayjs(date).format('YY/MM/DD HH:mm');
};

export const humanizeTime = (date) => {
  return dayjs(date).format('HH:mm');
};

const castomizeTimeFormat = (time) => {
  return time < 10 ? '0' + time : time;
};

export const getDuration = (startTime, endTime) => {
   return dayjs(endTime).diff(startTime, 'minute');
};

export const getDurationFormat = (duration) => {
  const day = Math.trunc(duration / 1440);
  const hours = Math.trunc((duration % 1440) / 60);
  const minutes = (duration % 1440) % 60;

  if (duration >= 1440) {
    return (
      castomizeTimeFormat(day) +
      'D ' +
      castomizeTimeFormat(hours) +
      'H ' +
      castomizeTimeFormat(minutes) +
      'M'
    );
  } else if (duration >= 60) {
    return (
      castomizeTimeFormat(hours) + 'H ' + castomizeTimeFormat(minutes) + 'M'
    );
  } else {
    return castomizeTimeFormat(minutes) + 'M';
  }
};
