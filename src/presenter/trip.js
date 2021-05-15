import PointPresenter from './point.js';

import MainInfoView from '../view/main-info.js';
import InfoView from '../view/info.js';
import CostView from '../view/cost.js';
import SortingView from '../view/sorting.js';
import PointsListView from '../view/points-list.js';
import ListEmptyView from '../view/list-empty.js';

import { RenderPosition, render, remove } from '../utils/render.js';
import { updateItem, sortPointsByDate, sortPointsByPrice, sortPointsByTime } from '../utils/common.js';
import { SortType, UpdateType, UserAction } from '../utils/const.js';
import {filter} from '../utils/filter.js';

export default class Trip {
  constructor(headerContainer, mainContainer, pointsModel, filterModel) {
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._headerContainer = headerContainer;
    this._mainContainer = mainContainer;
    this._pointPresenter = {};
    this._currentSortType = SortType.DEFAULT;

    this._mainInfoComponent = new MainInfoView();
    this._pointsListComponent = new PointsListView();
    this._listEmptyComponent = new ListEmptyView();
    // this._sortComponent = new SortingView();

    this._sortComponent = null;

    this._infoComponent = null;
    this._costComponent = null;

    // this._handleDataChange = this._handleDataChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    // this._points = this._getPoints();
  }

  init() {
    // this._points = points.slice();
    // this._sourcedPoints = points.slice();

    console.log(this._pointsModel)
    console.log(this._filterModel)
    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);


    this._renderBoard(this._pointsModel)

    // this._infoComponent = new InfoView(points);
    // this._costComponent = new CostView(points);

    // if (points.length === 0) {
    //   this._renderListEmpty();
    //   return;
    // }

    // this._renderTripInfo();
    // this._renderPointsSection();
  }

  _getPoints() {
    const filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filtredPoints = filter[filterType](points);

    switch (this._currentSortType) {
      case SortType.DEFAULT:
        return filtredPoints.sort(sortPointsByDate);
        // return this._pointsModel.getPoints().slice().sort(sortPointsByDate);
      case SortType.TIME:
        return filtredPoints.sort(sortPointsByTime);
        // return this._pointsModel.getPoints().slice().sort(sortPointsByTime);
      case SortType.PRICE:
        return filtredPoints.sort(sortPointsByPrice);
      }
    return filtredPoints;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearPointsSection();
    this._renderPointsSection();
  }

  // _handleDataChange(updatedPoint) {
  //   // this._points = updateItem(this._points, updatedPoint);
  //   // this._sourcedPoints = updateItem(this._sourcedPoints, updatedPoint);
  //   this._pointPresenter[updatedPoint.id].init(updatedPoint);
  // }

  _handleViewAction(actionType, updateType, update) {
    console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, update);
        console.log(updateType, update)
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        console.log(updateType, update)
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        console.log(updateType, update)
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        console.log('PATCH')
        this._pointPresenter[data.id].init(data);

        // console.log('PATCH')
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        console.log('MINOR')
        this._clearPointsSection();
        this._renderPointsSection();
        // console.log("MINOR")
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        console.log("MAJOR")
        this._clearPointsSection(true);
        this._renderPointsSection();
        console.log("MAJOR")
        break;
    }
  }

  _handleModeChange() {
    Object.values(this._pointPresenter).forEach((presenter) =>
      presenter.resetView(),
    );
  }

  _renderTripInfo() {
    render(
      this._headerContainer,
      this._mainInfoComponent,
      RenderPosition.AFTER_BEGIN,
    );

    render(
      this._mainInfoComponent,
      this._infoComponent,
      RenderPosition.BEFORE_END,
    );
    render(
      this._mainInfoComponent,
      this._costComponent,
      RenderPosition.BEFORE_END,
    );
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortingView(this._currentSortType);

    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._mainContainer, this._sortComponent, RenderPosition.BEFORE_END);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(
      this._pointsListComponent,
      this._handleViewAction,
      this._handleModeChange,
    );
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints(points) {
    points.forEach((point) => this._renderPoint(point));
  }

  _renderPointsList() {
    const points = this._getPoints().slice();
    // console.log(points)
    render(this._mainContainer, this._pointsListComponent, RenderPosition.BEFORE_END);
    this._renderPoints(points);
    // points.forEach((point) => this._renderPoint(point));
  }

  _renderPointsSection() {
    this._renderSort();
    this._renderPointsList();
  }

  _clearPointsSection(resetSortType = false) {
    Object.values(this._pointPresenter).forEach((presenter) =>
      presenter.destroy(),
    );
    this._pointPresenter = {};

    remove(this._sortComponent);
    remove(this._listEmptyComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  // _clearPointsSection() {
  //   Object.values(this._pointPresenter).forEach((presenter) =>
  //     presenter.destroy(),
  //   );
  //   this._pointPresenter = {};
  // }

  _renderListEmpty() {
    render(this._mainContainer, this._listEmptyComponent, RenderPosition.BEFORE_END);
  }

  _renderBoard() {
    const points = this._getPoints().slice();
    // console.log(points)
    this._infoComponent = new InfoView(points);
    this._costComponent = new CostView(points);

    if (points.length === 0) {
      this._renderListEmpty();
      return;
    }

    this._renderTripInfo();
    this._renderPointsSection();

  }
}
