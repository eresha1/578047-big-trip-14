import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import dayjs from 'dayjs';
import {getDurationFormat} from '../utils/time-format.js';
import {BAR_HEIGHT} from '../utils/const.js';

const makeUniqItemsType = (items) => {
  const pointTypes = items.map((point) => point.type);
  return [...new Set(pointTypes)];
};

const makeUniqItemsArr = (items) => {
  const types = makeUniqItemsType(items);
  return types.map((type) => {
    return items.filter((item) => item.type === type);
  });
};

const getCountTypes = (points) => {
  const pointsByType = makeUniqItemsArr(points);
  return pointsByType.map((item) => item.length).sort((a, b) => b - a);
};

const getMoneyByType = (points) => {
  const pointsByType = makeUniqItemsArr(points);
  return pointsByType.map((items) => {
    return items.reduce((acc, item) => acc + item.basePrice, 0);
  }).sort((a, b) => b - a);
};

const getTimeByType = (points) => {
  const pointsByType = makeUniqItemsArr(points);
  return pointsByType.map((items) => {
    return items.reduce(
      (acc, item) => acc + dayjs(item.endTime).diff(item.startTime, 'minute'), 0);
  }).sort((a, b) => b - a);
};

export const renderTypeChart = (typeCtx, points) => {
  const uniqTypes = makeUniqItemsType(points);
  const typesCount = getCountTypes(points);
  const typeLabels = uniqTypes.map((point) => point.toUpperCase());

  typeCtx.height = BAR_HEIGHT * uniqTypes.length - 1;

  return new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: typeLabels,
      datasets: [
        {
          data: typesCount,
          backgroundColor: '#ffffff',
          hoverBackgroundColor: '#ffffff',
          anchor: 'start',
        },
      ],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${val}x`,
        },
      },
      title: {
        display: true,
        text: 'TYPE',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: '#000000',
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            barThickness: 44,
          },
        ],
        xAxes: [
          {
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            minBarLength: 50,
          },
        ],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

export const renderMoneyChart = (moneyCtx, points) => {
  const uniqTypes = makeUniqItemsType(points);
  const moneyByTypes = getMoneyByType(points);

  const typeLabels = uniqTypes.map((point) => point.toUpperCase());

  moneyCtx.height = BAR_HEIGHT * uniqTypes.length - 1;

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: typeLabels,
      datasets: [
        {
          data: moneyByTypes,
          backgroundColor: '#ffffff',
          hoverBackgroundColor: '#ffffff',
          anchor: 'start',
          barThickness: 44,
          minBarLength: 50,
        },
      ],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `€ ${val}`,
        },
      },
      title: {
        display: true,
        text: 'MONEY',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: '#000000',
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          },
        ],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

export const renderTimeChart = (timeCtx, points) => {
  const uniqTypes = makeUniqItemsType(points);
  const timeByTypes = getTimeByType(points);

  const typeLabels = uniqTypes.map((point) => point.toUpperCase());

  timeCtx.height = BAR_HEIGHT * uniqTypes.length - 1;

  return new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: typeLabels,
      datasets: [
        {
          data: timeByTypes,
          backgroundColor: '#ffffff',
          hoverBackgroundColor: '#ffffff',
          anchor: 'start',
          barThickness: 44,
          minBarLength: 50,
        },
      ],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => getDurationFormat(val),
        },
      },
      title: {
        display: true,
        text: 'TIME-SPEND',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: '#000000',
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          },
        ],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};
