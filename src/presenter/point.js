import PointView from '../view/point.js';
import EditPointView from '../view/edit-point.js';

import { RenderPosition, render, replace, remove } from '../utils/render.js';
import {UserAction, UpdateType} from '../utils/const.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export const State = {
  SAVING: 'SAVING',
  DELETING: 'DELETING',
  ABORTING: 'ABORTING',
};

export default class Point {
  constructor(pointListContainer, changeData, changeMode, storage) {
    this._pointListContainer = pointListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._storage = storage;

    this._pointComponent = null;
    this._editPointComponent = null;
    this._mode = Mode.DEFAULT;

    this._handlePointClick = this._handlePointClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFormClick = this._handleFormClick.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(point) {
    this._point = point;

    const prevPointComponent = this._pointComponent;
    const prevEditPointComponent = this._editPointComponent;

    this._pointComponent = new PointView(point);
    this._editPointComponent = new EditPointView(point, this._storage);

    this._pointComponent.setRollupBtnClickHandler(this._handlePointClick);
    this._pointComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._editPointComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._editPointComponent.setFormRollupBtnClickHandler(this._handleFormClick);
    this._editPointComponent.setDeleteClickHandler(this._handleDeleteClick);


    if (prevPointComponent === null || prevEditPointComponent === null) {
      render(this._pointListContainer, this._pointComponent, RenderPosition.BEFORE_END);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._editPointComponent, prevEditPointComponent);
      this._mode = Mode.DEFAULT;
    }

    remove(prevPointComponent);
    remove(prevEditPointComponent);
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._editPointComponent);
  }

  setViewState(state) {
    const resetFormState = () => {
      this._editPointComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };
    switch (state) {
      case State.SAVING:
        this._editPointComponent.updateData({
          isDisabled: true,
          isSaving: true,
        });
        break;
      case State.DELETING:
        this._editPointComponent.updateData({
          isDisabled: true,
          isDeleting: true,
        });
        break;
      case State.ABORTING:
        this._pointComponent.shake(resetFormState);
        this._editPointComponent.shake(resetFormState);
        break;
    }
  }

  _replacePointToForm() {
    replace(this._editPointComponent, this._pointComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToPoint() {
    replace(this._pointComponent, this._editPointComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _handleFavoriteClick() {
    this._changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      Object.assign(
        {},
        this._point,
        {
          isFavorite: !this._point.isFavorite,
        },
      ),
    );
  }

  _handlePointClick() {
    this._replacePointToForm();
  }

  _handleFormClick() {
    this._editPointComponent.reset(this._point);
    this._replaceFormToPoint();
  }

  _handleFormSubmit(update) {
    this._changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      update,
    );
  }

  _handleDeleteClick(point) {
    this._changeData(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      this._editPointComponent.reset(this._point);
      this._replaceFormToPoint();
      document.removeEventListener('keydown', this._escKeyDownHandler);
    }
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToPoint();
    }
  }
}
