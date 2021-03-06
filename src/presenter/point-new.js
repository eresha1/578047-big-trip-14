import EditPointView from '../view/edit-point.js';

import { RenderPosition, render, remove } from '../utils/render.js';
import {UserAction, UpdateType, Mode, EMPTY_POINT} from '../utils/const.js';

export default class PointNew {
  constructor(pointListContainer, changeData, storage) {
    this._pointListContainer = pointListContainer;
    this._changeData = changeData;
    this._storage = storage;

    this._newPointComponent = null;

    this._mode = Mode.ADDING;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._handleFormClick = this._handleFormClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);

  }

  setSaving() {
    this._newPointComponent.updateData({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this._newPointComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this._newPointComponent.shake(resetFormState);
  }


  init() {
    if (this._newPointComponent !== null) {
      return;
    }
    this._newPointComponent = new EditPointView(EMPTY_POINT, this._storage, this._mode);
    this._newPointComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._newPointComponent.setDeleteClickHandler(this._handleDeleteClick);
    this._newPointComponent.setFormRollupBtnClickHandler(this._handleFormClick);

    render(this._pointListContainer, this._newPointComponent, RenderPosition.AFTER_BEGIN);

    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  destroy() {
    if (this._newPointComponent === null) {
      return;
    }

    remove(this._newPointComponent);
    this._newPointComponent = null;
    document.querySelector('.trip-main__event-add-btn').disabled = false;
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }


  _handleFormSubmit(point) {
    this._changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );

    this.destroy();
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _handleFormClick() {
    this.destroy();
  }


  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }
}
