import {Component} from './component';
let moment = require(`moment`);

export class TopFilm extends Component {
  constructor(data) {
    super(data);
    this._title = data.title;
    this._rating = data.rating;
    this._year = data.year;
    this._duration = data.duration;
    this._genre = data.genre;
    this._poster = data.poster;
    this._description = data.description;
    this._commtens = data.comments;
    this._element = null;

    this._onClick = null;
    this._onCommentsLinkClick = this._onCommentsLinkClick.bind(this);
  }

  get template() {
    return `
      <article class="film-card film-card--no-controls">
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

        <button class="film-card__comments">${this._commtens.length} comments </button>
      </article>`.trim();
  }

  set onClick(fn) {
    this._onClick = fn;
  }

  _onCommentsLinkClick() {
    return typeof this._onClick === `function` && this._onClick();
  }

  createListeners() {
    this._element.querySelector(`.film-card__comments`)
        .addEventListener(`click`, this._onCommentsLinkClick);
  }
}
