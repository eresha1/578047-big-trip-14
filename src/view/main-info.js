import AbstractView  from '../view/abstract.js';

const createMainInfoTemplate = () => {
  return `<section class="trip-main__trip-info  trip-info">
  </section>`;
};

export default class MainInfo extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return createMainInfoTemplate();
  }
}

