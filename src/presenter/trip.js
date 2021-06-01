import PointPresenter, {State as PointPresenterViewState} from './point.js';
import PointNewPresenter from './point-new.js';

import MainInfoView from '../view/main-info.js';
import InfoView from '../view/info.js';
import CostView from '../view/cost.js';
import SortingView from '../view/sorting.js';
import PointsListView from '../view/points-list.js';
import ListEmptyView from '../view/list-empty.js';
import LoadingView from '../view/loading.js';

import { RenderPosition, render, remove } from '../utils/render.js';
import { sortPointsByDate, sortPointsByPrice, sortPointsByTime } from '../utils/common.js';
import { SortType, UpdateType, UserAction } from '../utils/const.js';
import {filter} from '../utils/filter.js';

export default class Trip {
  constructor(headerContainer, mainContainer, pointsModel, filterModel, api, storage) {
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._headerContainer = headerContainer;
    this._mainContainer = mainContainer;
    this._pointPresenter = {};
    this._currentSortType = SortType.DEFAULT;
    this._isLoading = true;
    this._api = api;
    this._storage = storage;

    this._mainInfoComponent = new MainInfoView();
    this._pointsListComponent = new PointsListView();
    this._listEmptyComponent = new ListEmptyView();
    this._loadingComponent = new LoadingView();

    this._sortComponent = null;

    this._infoComponent = null;
    this._costComponent = null;

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._pointNewPresenter = new PointNewPresenter(
      this._pointsListComponent,
      this._handleViewAction,
      storage
    );
  }

  _getPoints() {
    const filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filtredPoints = filter[filterType](points);

    switch (this._currentSortType) {
      case SortType.DEFAULT:
        return filtredPoints.sort(sortPointsByDate);
      case SortType.TIME:
        return filtredPoints.sort(sortPointsByTime);
      case SortType.PRICE:
        return filtredPoints.sort(sortPointsByPrice);
    }
    return filtredPoints;
  }

  createPoint() {
    this._pointNewPresenter.init();
  }

  init() {
    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderBoard();
  }

  destroy() {
    this._clearBoard({ resetSortType: true });

    remove(this._pointsListComponent);

    this._pointsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  hide() {
    this._mainContainer.classList.add("trip-events--hidden");
  }

  show() {
    this._mainContainer.classList.remove("trip-events--hidden");
  }

  _renderTripInfo(points) {
    render(
      this._headerContainer,
      this._mainInfoComponent,
      RenderPosition.AFTER_BEGIN
    );
    this._renderInfo(points);
    this._renderCost(points);
  }


  _renderCost(points) {
    if (this._costComponent !== null) {
      this._costComponent = null;
    }

    this._costComponent = new CostView(points);
    render(
      this._mainInfoComponent,
      this._costComponent,
      RenderPosition.BEFORE_END
    );
  }

  _renderInfo(points) {
    if (this._infoComponent !== null) {
      this._infoComponent = null;
    }

    this._infoComponent = new InfoView(points);
    render(this._mainInfoComponent, this._infoComponent, RenderPosition.BEFORE_END);
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
      this._storage
    );
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints(points) {
    points.forEach((point) => this._renderPoint(point));
  }

  _renderPointsList() {
    const points = this._getPoints().slice();
    render(
      this._mainContainer,
      this._pointsListComponent,
      RenderPosition.BEFORE_END
    );
    this._renderPoints(points);
  }

  _renderPointsSection() {
    this._renderSort();
    this._renderPointsList();
  }

  _renderLoading() {
    render(
      this._boardComponent,
      this._loadingComponent,
      RenderPosition.AFTERBEGIN
    );
  }

  _renderListEmpty() {
    render(
      this._mainContainer,
      this._listEmptyComponent,
      RenderPosition.BEFORE_END
    );
  }

  _renderBoard() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }
    const points = this._getPoints().slice();

    if (points.length === 0) {
      this._renderListEmpty();
      return;
    }

    this._renderTripInfo(points);
    this._renderPointsSection();
  }

  _clearBoard(resetSortType = false) {
    this._pointNewPresenter.destroy();
    Object.values(this._pointPresenter).forEach((presenter) =>
      presenter.destroy()
    );
    this._pointPresenter = {};

    remove(this._sortComponent);
    remove(this._listEmptyComponent);
    remove(this._costComponent);
    remove(this._infoComponent);
    remove(this._loadingComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }
  
  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearBoard();
    this._renderBoard();
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointPresenter[update.id].setViewState(
          PointPresenterViewState.SAVING
        );
        this._api
          .updatePoint(update)
          .then((response) => {
            this._pointsModel.updatePoint(updateType, response);
          })
          .catch(() => {
            this._pointPresenter[update.id].setViewState(
              PointPresenterViewState.ABORTING
            );
          });
        break;
      case UserAction.ADD_POINT:
        this._pointNewPresenter.setSaving();
        this._api
          .addPoint(update)
          .then((response) => {
            this._pointsModel.addPoint(updateType, response);
          })
          .catch(() => {
            this._pointNewPresenter.setAborting();
          });
        break;
      case UserAction.DELETE_POINT:
        this._pointPresenter[update.id].setViewState(
          PointPresenterViewState.DELETING
        );

        this._api
          .deletePoint(update)
          .then(() => {
            this._pointsModel.deletePoint(updateType, update);
          })
          .catch(() => {
            this._pointPresenter[update.id].setViewState(
              PointPresenterViewState.ABORTING
            );
          });
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearBoard();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        this._clearBoard(true);
        this._renderBoard();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderBoard();
        break;
    }
  }

  _handleModeChange() {
    this._pointNewPresenter.destroy();
    Object.values(this._pointPresenter).forEach((presenter) =>
      presenter.resetView()
    );
  }
}
