import Component from './component';

class ShowMoreButton extends Component {
  constructor() {
    super();

    this._element = null;
    this._onClick = null;
    this._state = `show`;

    this._onButtonClick = this._onButtonClick.bind(this);

  }

  get template() {
    return `<button class="films-list__show-more">Show more</button>`.trim();
  }

  set onClick(fn) {
    this._onClick = fn;
  }

  hideButton() {
    this._state = `hide`;
    this._element.classList.add(`visually-hidden`);
  }

  showButton() {
    this._state = `show`;
    this._element.classList.remove(`visually-hidden`);
  }

  _onButtonClick() {
    return typeof this._onClick === `function` && this._onClick();
  }

  createListeners() {
    this._element.addEventListener(`click`, this._onButtonClick);
  }

  removeListeners() {
    this._element.removeEventListener(`click`, this._onButtonClick);
  }
}

export default ShowMoreButton;
