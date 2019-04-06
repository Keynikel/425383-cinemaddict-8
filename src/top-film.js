import {Film} from './film';
let moment = require(`moment`);

export class TopFilm extends Film {
  constructor(data) {
    super(data);
  }

  get template() {
    return `
      <article class="film-card film-card--no-controls">
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

        <button class="film-card__comments">${this._commtens.length} comments </button>
      </article>`.trim();
  }

  createListeners() {
    this._element.querySelector(`.film-card__comments`)
        .addEventListener(`click`, this._onCommentsLinkClick);
  }
}
