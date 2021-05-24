import SmartView from './smart.js';
import {renderMoneyChart, renderTypeChart, renderTimeChart} from '../utils/stats.js';

const createStatisticsTemplate = () => {
  return `<section class="statistics visually-hidden">
  <h2 class="visually-hidden">Trip statistics</h2>
  <div class="statistics__item statistics__item--money">
    <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
  </div>
  <div class="statistics__item statistics__item--transport">
    <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
  </div>
  <div class="statistics__item statistics__item--time-spend">
    <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
  </div>
</section>`;
};

export default class Statistics extends SmartView {
  constructor(points) {
    super();

    this._data  = points;

    this._moneyChart = null;
    this._typeChart = null;
    this._timeChart = null;

    this._setCharts();
  }

  removeElement() {
    super.removeElement();

    if (this._moneyChart !== null || this._typeChart !== null || this._timeChart !== null) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeChart = null;
    }
  }

  getTemplate() {
    return createStatisticsTemplate();
  }

  restoreHandlers() {
    this._setCharts();
  }

  _setCharts() {
    if (this._moneyChart !== null || this._typeChart !== null || this._timeChart !== null) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeChart = null;
    }

    const moneyCtx = this.getElement().querySelector('.statistics__chart--money');
    const typeCtx = this.getElement().querySelector('.statistics__chart--transport');
    const timeCtx = this.getElement().querySelector('.statistics__chart--time');

    this._typeChart = renderTypeChart(typeCtx, this._data);
    this._moneyChart = renderMoneyChart(moneyCtx, this._data);
    this._timeChart = renderTimeChart(timeCtx, this._data);
  }
}
