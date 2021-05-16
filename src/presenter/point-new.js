import EditPointView from '../view/edit-point.js';

import { RenderPosition, render, remove } from '../utils/render.js';
import {UserAction, UpdateType} from '../utils/const.js';
import {generateID} from '../utils/random.js';

export default class PointNew {
  constructor(pointListContainer, changeData) {
    this._pointListContainer = pointListContainer;
    this._changeData = changeData;

    this._editPointComponent = null;
    // this._destroyCallback = null;


    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._handleFormClick = this._handleFormClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);

  }

  init() {
    // this._destroyCallback = callback;

    if (this._editPointComponent !== null) {
      return;
    }

    this._editPointComponent = new EditPointView();
    this._editPointComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._editPointComponent.setDeleteClickHandler(this._handleDeleteClick);
    this._editPointComponent.setFormRollupBtnClickHandler(this._handleFormClick);

    render(this._pointListContainer, this._editPointComponent, RenderPosition.AFTER_BEGIN);

    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  destroy() {
    if (this._editPointComponent !== null) {
      return
    }

      remove(this._editPointComponent);
      this._editPointComponent = null;

      // if (this._destroyCallback !== null) {
      //   this._destroyCallback();
      // }
      document.querySelector(`.trip-main__event-add-btn`).disabled = false;
      document.removeEventListener(`keydown`, this._escKeyDownHandler);

  }


  _handleFormSubmit(point) {
    this._changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      Object.assign({id: generateID()}, point)
    );
    this.destroy();
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _handleFormClick() {
    // this._editPointComponent.reset(this._point);
    // this._replaceFormToPoint();
    this.destroy();
  }


  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }
}
