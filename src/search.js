import {Component} from './component';

export class Search extends Component {
  constructor() {
    super();

    this._element = null;
    this._onInput = null;

    this._onWordsInput = this._onWordsInput.bind(this);
  }

  get template() {
    return `
      <input type="text" name="search" class="search__field" placeholder="Search">
    `.trim();
  }

  set onInput(fn) {
    this._onInput = fn;
  }

  _onWordsInput() {
    return typeof this._onInput === `function` && this._onInput();
  }

  createListeners() {
    this._element.addEventListener(`keyup`, this._onWordsInput);
  }
}