import {Component} from './component';
let moment = require(`moment`);

export class Film extends Component {
  constructor(data) {
    super();
    this._title = data.title;
    this._rating = data.rating;
    this._year = data.year;
    this._duration = data.duration;
    this._genre = data.genre;
    this._poster = data.poster;
    this._description = data.description;
    this._commtens = data.comments;
    this._element = null;

    this._state = {
      isListed: data.state.isListed,
      isWatched: data.state.isWatched,
      isFavorite: data.state.isFavorite
    };

    this._onClick = null;
    this._onCommentsLinkClick = this._onCommentsLinkClick.bind(this);
    this._onAddToWatchList = this._onAddToWatchList.bind(this);
    this._onMarkAsWatched = this._onMarkAsWatched.bind(this);
  }

  get template() {
    return `
      <article class="film-card">
        <h3 class="film-card__title">${this._title}</h3>
        <p class="film-card__rating">${this._rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${moment(this._year).format(`YYYY`)}</span>
          <span class="film-card__duration">
             ${moment.duration(this._duration, `minutes`).hours()}h
             ${moment.duration(this._duration, `minutes`).minutes()}min
          </span>
          <span class="film-card__genre">${this._genre.length ? this._genre[0] : ``}</span>
        </p>
        <img src="${this._poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${this._description}</p>

        <button class="film-card__comments">${this._commtens.length} comments </button>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist"><!--Add to watchlist--> WL</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched"><!--Mark as watched-->WTCHD</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite"><!--Mark as favorite-->FAV</button>
        </form>
      </article>`.trim();
  }

  set onClick(fn) {
    this._onClick = fn;
  }

  set onAddToWatchList(fn) {
    this._onAddToWatchList = fn;
  }

  set onMarkAsWatched(fn) {
    this._onMarkAsWatched = fn;
  }

  update(data) {
    this._state.isListed = data.state.isListed;
    this._state.isWatched = data.state.isWatched;
    this._state.isFavorite = data.state.isFavorite;
    this._comments = data.comments;
  }

  _onCommentsLinkClick() {
    return typeof this._onClick === `function` && this._onClick();
  }

  _onAddToWatchList(evt) {
    evt.preventDefault();
    return typeof this._onAddToWatchList === `function` && this._onAddToWatchList();
  }

  _onMarkAsWatched(evt) {
    evt.preventDefault();
    return typeof this._onMarkAsWatched === `function` && this._onMarkAsWatched();
  }

  createListeners() {
    this._element.querySelector(`.film-card__comments`)
        .addEventListener(`click`, this._onCommentsLinkClick);

    this._element.querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, this._onAddToWatchList);

    this._element.querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, this._onMarkAsWatched);
  }
}
