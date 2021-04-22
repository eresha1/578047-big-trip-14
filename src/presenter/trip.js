import PointPresenter from './point.js';

import MainInfoView from '../view/main-info.js';
import InfoView from '../view/info.js';
import CostView from '../view/cost.js';
import SortingView from '../view/sorting.js';
import PointsListView from '../view/points-list.js';
import ListEmptyView from '../view/list-empty.js';

import { RenderPosition, render } from '../utils/render.js';
import { updateItem } from '../utils/common.js';

export default class Trip {
  constructor(headerContainer, mainContainer) {
    this._headerContainer = headerContainer;
    this._mainContainer = mainContainer;
    this._pointPresenter = {};

    this._mainInfoComponent = new MainInfoView();
    this._pointsListComponent = new PointsListView();
    this._listEmptyComponent = new ListEmptyView();

    this._handleDataChange = this._handleDataChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
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

  _handleDataChange(updatedPoint) {
    this._points = updateItem(this._points, updatedPoint);
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _renderTripInfo() {
    render(this._headerContainer, this._mainInfoComponent, RenderPosition.AFTER_BEGIN);

    render(this._mainInfoComponent, this._infoComponent, RenderPosition.BEFORE_END);
    render(this._mainInfoComponent, this._costComponent, RenderPosition.BEFORE_END);
  }

  _renderPointsSection() {
    render(this._mainContainer, this._sortComponent, RenderPosition.BEFORE_END);
    render(this._mainContainer, this._pointsListComponent, RenderPosition.BEFORE_END);
    this._renderPointList();
  }

  _renderPointList() {
    this._points.forEach((point) => this._renderPoint(point));
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointsListComponent, this._handleDataChange, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  // _clearPointsList() {
  //   Object
  //     .values(this._pointPresenter)
  //     .forEach((presenter) => presenter.destroy());
  //   this._pointPresenter = {};
  // }

  _renderListEmpty() {
    render(this._mainContainer, this._listEmptyComponent, RenderPosition.BEFORE_END);
  }
}
