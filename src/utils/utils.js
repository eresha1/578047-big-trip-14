import dayjs from 'dayjs';

export const humanizeShortDate = (date) => {
  return dayjs(date).format('MMM DD');
};

export const humanizeFullDate = (date) => {
  return dayjs(date).format('YY/MM/DD HH:mm');
};

const castomizeTimeFormat = (time) => {
  return time < 10 ? '0${time}' : '${time}';
};

export const getDurationFormat = (startTime, endTime) => {
  const diff = dayjs(endTime).diff(startTime, 'minute');

  const day = Math.trunc(diff / 1440);
  const hours = Math.trunc((diff % 1440) / 60);
  const minutes = (diff % 1440) % 60;

  if (diff >= 1440) {
    return (
      castomizeTimeFormat(day) +
      'D ' +
      castomizeTimeFormat(hours) +
      'H ' +
      castomizeTimeFormat(minutes) +
      'M'
    );
  } else if (diff >= 60) {
    return (
      castomizeTimeFormat(hours) + 'H ' + castomizeTimeFormat(minutes) + 'M'
    );
  } else {
    return castomizeTimeFormat(minutes) + 'M';
  }
};
