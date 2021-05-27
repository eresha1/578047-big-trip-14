import EditPointView from '../view/edit-point.js';

import { RenderPosition, render, remove } from '../utils/render.js';
import {UserAction, UpdateType, EMPTY_POINT} from '../utils/const.js';
import {generateID} from '../utils/random.js';


export default class PointNew {
  constructor(pointListContainer, changeData, storage) {
    this._pointListContainer = pointListContainer;
    this._changeData = changeData;
    this._storage = storage;

    this._newPointComponent = null;


    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._handleFormClick = this._handleFormClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);

  }

  init() {
    if (this._newPointComponent !== null) {
      return;
    }

    this._newPointComponent = new EditPointView(EMPTY_POINT, storage);
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
      Object.assign({id: generateID()}, point),
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
