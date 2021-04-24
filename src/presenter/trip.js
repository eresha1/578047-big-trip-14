import PointPresenter from './point.js';

import MainInfoView from '../view/main-info.js';
import InfoView from '../view/info.js';
import CostView from '../view/cost.js';
import SortingView from '../view/sorting.js';
import PointsListView from '../view/points-list.js';
import ListEmptyView from '../view/list-empty.js';

import { RenderPosition, render } from '../utils/render.js';
import { updateItem } from '../utils/common.js';
import { SortType } from '../utils/const.js';

export default class Trip {
  constructor(headerContainer, mainContainer) {
    this._headerContainer = headerContainer;
    this._mainContainer = mainContainer;
    this._pointPresenter = {};
    this._currentSortType = SortType.DEFAULT;

    this._mainInfoComponent = new MainInfoView();
    this._pointsListComponent = new PointsListView();
    this._listEmptyComponent = new ListEmptyView();
    this._sortComponent = new SortingView();

    this._infoComponent = null;
    this._costComponent = null;

    this._handleDataChange = this._handleDataChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(points) {
    this._points = points.slice();
    this._sourcedPoints = points.slice();

    this._infoComponent = new InfoView(points);
    this._costComponent = new CostView(points);

    if (points.length === 0) {
      this._renderListEmpty();
      return;
    }

    this._renderTripInfo();
    this._renderPointsSection();
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortPoints(sortType);
    this._clearPointsList();
    this._renderPointList();
  }

  _handleDataChange(updatedPoint) {
    this._points = updateItem(this._points, updatedPoint);
    this._sourcedPoints = updateItem(this._sourcedPoints, updatedPoint);
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
  }

  _handleModeChange() {
    Object.values(this._pointPresenter).forEach((presenter) =>
      presenter.resetView());
  }

  _sortPoints(sortType) {
    switch (sortType) {
      case SortType.DEFAULT:
        this._points.sort((a, b) => a.startTime - b.startTime);
        break;
      case SortType.TIME:
        this._points.sort(
          (a, b) => b.startTime - b.endTime - (a.startTime - a.endTime));
        break;
      case SortType.PRICE:
        this._points.sort((a, b) => a.price - b.price);
        break;
    }
    this._currentSortType = sortType;
  }

  _renderTripInfo() {
    render(this._headerContainer, this._mainInfoComponent, RenderPosition.AFTER_BEGIN);

    render(this._mainInfoComponent, this._infoComponent, RenderPosition.BEFORE_END);
    render(this._mainInfoComponent, this._costComponent, RenderPosition.BEFORE_END);
  }

  _renderSort() {
    render(this._mainContainer, this._sortComponent, RenderPosition.BEFORE_END);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointsListComponent, this._handleDataChange, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPointList() {
    render(this._mainContainer, this._pointsListComponent, RenderPosition.BEFORE_END);
    this._points.forEach((point) => this._renderPoint(point));
  }

  _renderPointsSection() {
    this._renderSort();
    this._renderPointList();
  }

  _clearPointsList() {
    Object.values(this._pointPresenter).forEach((presenter) =>
      presenter.destroy());
    this._pointPresenter = {};
  }

  _renderListEmpty() {
    render(this._mainContainer, this._listEmptyComponent, RenderPosition.BEFORE_END);
  }
}
