import {Component} from './component';

export class Filter extends Component {
  constructor(data) {
    super();
    this._label = data.label;
    this._anchor = data.anchor;
    this._count = data.count;
    this._state = data.state;

    this._element = null;

    this._onFilter = this._onFilter.bind(this);
  }

  get template() {
    return `
    <a href="#${this._anchor}"
      class="main-navigation__item  ${this._state ? `main-navigation__item--` + this._state : ``}">
      ${this._label}
      ${this._count ? `<span class="main-navigation__item-count">` + this._count + `</span>` : ``}
      </a>
    `.trim();
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  _onFilter(anchor) {
    return typeof this._onFilter === `function` && this._onFilter(anchor);
  }

  createListeners() {
    this._element.addEventListener(`click`, () => this._onFilter(this._anchor));
  }
}
