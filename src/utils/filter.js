import {FilterType} from '../utils/const';
// import {getPointFuture, getPointPast} from '../utils/common.js';
import dayjs from 'dayjs';

export const filter = {
  [FilterType.EVERYTHING]: (points) => points.filter((point) => point),
  [FilterType.FUTURE]: (points) => points.filter((point) => point.startTime >= dayjs() || point.endTime >= dayjs()),
  [FilterType.PAST]: (points) => points.filter((point) => point.startTime < dayjs()),
};
