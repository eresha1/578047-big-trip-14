import FilterView from '../view/filters.js';
import {render, RenderPosition, replace, remove} from '../utils/render.js';
import {FilterType, UpdateType} from '../utils/const.js';


export default class Filter {
  constructor(filterContainer, pointsModel, filterModel) {
    this._filterContainer = filterContainer;
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._currentFilter = null;

    this._filterComponent = null;

    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  _getFilters() {
    return [
      {
        type: FilterType.EVERYTHING,
        title: 'Everything',
      },
      {
        type: FilterType.FUTURE,
        title: 'Future',
      },
      {
        type: FilterType.PAST,
        title: 'Past',
      },
    ];
  }

  init() {
    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(filters, this._filterModel.getFilter());

    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.BEFORE_END);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  disable() {
    const inputs = this._filterComponent.getElement().querySelectorAll('.trip-filters__filter-input');
    inputs.forEach((input) => {
      input.disabled = true;
    });
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._filterModel.getFilter() === filterType) {
      return;
    }
    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }
}
