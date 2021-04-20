import PointPresenter from './point.js';

import MainInfoView from '../view/main-info.js';
import InfoView from '../view/info.js';
import CostView from '../view/cost.js';
import SortingView from '../view/sorting.js';
import PointsListView from '../view/points-list.js';
import ListEmptyView from '../view/list-empty.js';

import { RenderPosition, render } from '../utils/render.js';

export default class Trip {
  constructor(headerContainer, mainContainer) {
    this._headerContainer = headerContainer;
    this._mainContainer = mainContainer;

    this._mainInfoComponent = new MainInfoView();

    this._pointsListComponent = new PointsListView();
    this._listEmptyComponent = new ListEmptyView();
  }

  init(points, sortsTitle) {
    this._points = points.slice();
    this._infoComponent = new InfoView(points);
    this._costComponent = new CostView(points);
    this._sortComponent = new SortingView(sortsTitle);

    if (points.length === 0) {
      this._renderListEmpty();
      return;
    }

    this._renderTripInfo();
    this._renderPointsSection(sortsTitle);
  }

  _renderTripInfo() {
    render(this._headerContainer, this._mainInfoComponent, RenderPosition.AFTER_BEGIN);

    render(this._mainInfoComponent, this._infoComponent, RenderPosition.BEFORE_END);
    render(this._mainInfoComponent, this._costComponent, RenderPosition.BEFORE_END);
  }

  _renderPointsSection() {

    render(this._mainContainer, this._sortComponent, RenderPosition.BEFORE_END);

    render(this._mainContainer, this._pointsListComponent, RenderPosition.BEFORE_END);

    this._points.forEach((point) => this._renderPoint(point));

  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointsListComponent);
    pointPresenter.init(point);
  }

  _renderListEmpty() {
    render(this._mainContainer, this._listEmptyComponent, RenderPosition.BEFORE_END);
  }
}
