import Component from './component';
import moment from 'moment';

class Film extends Component {
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
    this._watchingDate = data.watchingDate;
    this._element = null;

    this._state = {
      isListed: data.state.isListed,
      isWatched: data.state.isWatched,
      isFavorite: data.state.isFavorite
    };

    this._onClick = null;
    this._onCommentsLinkClick = this._onCommentsLinkClick.bind(this);
    this._onAddToWatchList = this._onAddToWatchList.bind(this);
    this._onAddToWatched = this._onAddToWatched.bind(this);
    this._onAddToFavorite = this._onAddToFavorite.bind(this);
  }

  get element() {
    return this._element;
  }

  get template() {
    return `
      <article class="film-card">
        <h3 class="film-card__title">${this._title}</h3>
        <p class="film-card__rating">${this._rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${moment(this._year).format(`YYYY`)}</span>
          <span class="film-card__duration">
             ${ moment.utc(moment.duration(this._duration, `minutes`).asMilliseconds()).format(`HH:mm`)}
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

  set watchingDate(val) {
    this._watchingDate = val;
  }

  set onClick(fn) {
    this._onClick = fn;
  }

  set onAddToWatchList(fn) {
    this._onAddToWatchList = fn;
  }

  set onAddToWatched(fn) {
    this._onAddToWatched = fn;
  }

  set onAddToFavorite(fn) {
    this._onAddToFavorite = fn;
  }

  update(data) {
    this._state.isListed = data.user_details.watchlist;
    this._state.isWatched = data.user_details.already_watched;
    this._state.isFavorite = data.user_details.favorite;
    this._comments = data.comments;
    this._element.querySelector(`.film-card__comments`).innerHTML = this._comments.length + ` comments`;
  }

  _onCommentsLinkClick() {
    return typeof this._onClick === `function` && this._onClick();
  }

  _onAddToWatchList(evt) {
    evt.preventDefault();
    return typeof this._onAddToWatchList === `function` && this._onAddToWatchList();
  }

  _onAddToWatched(evt) {
    evt.preventDefault();
    return typeof this._onAddToWatched === `function` && this._onAddToWatched();
  }

  _onAddToFavorite(evt) {
    evt.preventDefault();
    return typeof this._onAddToFavorite === `function` && this._onAddToFavorite();
  }

  createListeners() {
    this._element.querySelector(`.film-card__comments`)
        .addEventListener(`click`, this._onCommentsLinkClick);

    this._element.querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, this._onAddToWatchList);

    this._element.querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, this._onAddToWatched);

    this._element.querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, this._onAddToFavorite);
  }

  removeListeners() {
    this._element.querySelector(`.film-card__comments`)
        .removeEventListener(`click`, this._onCommentsLinkClick);

    this._element.querySelector(`.film-card__controls-item--add-to-watchlist`)
      .removeEventListener(`click`, this._onAddToWatchList);

    this._element.querySelector(`.film-card__controls-item--mark-as-watched`)
      .removeEventListener(`click`, this._onAddToWatched);

    this._element.querySelector(`.film-card__controls-item--favorite`)
      .removeEventListener(`click`, this._onAddToFavorite);
  }
}

export default Film;
