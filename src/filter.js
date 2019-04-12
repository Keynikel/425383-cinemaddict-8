import {Component} from './component';

export class Filter extends Component {
  constructor(data, films) {
    super();
    this._label = data.name;
    this._anchor = data.anchor;
    this._count = this._countFilms(films, this._anchor);
    this._state = data.state;
    this._showed = 0;

    this._element = null;
    this._onFilter = null;

    this._onFilterClick = this._onFilterClick.bind(this);

  }

  get template() {
    return `
    <a href="#${this._anchor}"
      class="main-navigation__item ${this._state ? `main-navigation__item--` + this._state : ``}">
      ${this._label}
      ${this._count ? `<span class="main-navigation__item-count">` + this._count + `</span>` : ``}
      </a>
    `.trim();
  }

  get showedFilms() {
    return this._showed;
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  set showedFilms(num) {
    this._showed = num;
  }

  setState(state) {
    this._state = state;
    if (this._state === `active`) {
      this._element.classList.add(`main-navigation__item--` + state);
    } else {
      this._element.classList.remove(`main-navigation__item--active`);
    }
  }

  _countFilms(films, anchor) {
    switch (anchor) {
      case `watchlist`:
        return films.filter((film) => film.state.isListed).length;
      case `history`:
        return films.filter((film) => film.state.isWatched).length;
      case `favorites`:
        return films.filter((film) => film.state.isFavorite).length;
    }
    return 0;
  }

  _onFilterClick(anchor) {
    return typeof this._onFilter === `function` && this._onFilter(anchor);
  }

  createListeners() {
    this._element.addEventListener(`click`, () => this._onFilterClick(this._anchor));
  }
}
