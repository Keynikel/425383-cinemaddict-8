import {createElement} from './utils.js';

export class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate Component, only concrete one.`);
    }
  }

  get element() {
    return this._element;
  }

  get template() {
    throw new Error(`You have to define template.`);
  }

  render() {
    this._element = createElement(this.template);
    this.createListener();
    return this._element;
  }

  unrender() {
    this.removeListener();
    this._element.remove();
    this._element = null;
  }

  createListener() {}

  removeListener() {}
}
