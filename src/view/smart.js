import Abstract from './abstract.js';

export default class Smart extends Abstract {
  constructor() {
    super();
  }

  updateElement() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);

    this.restoreHandlers();
  }

  updateData() {

  }

  _restoreHandlers() {
    throw new Error('Abstract method not implemented: resetHandlers');
  }


}
