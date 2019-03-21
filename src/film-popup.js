import {Component} from './component';

export class FilmPopup extends Component {

  constructor(data) {
    super();
    this._title = data.title;
    this._rating = data.rating;
    this._yourScore = data.yourScore;
    this._year = data.year;
    this._duration = data.duration;
    this._genre = data.genre;
    this._poster = data.poster;
    this._description = data.description;
    this._commtens = data.comments;
    this._element = null;

    this._onChange = null;
    this._onClick = null;
    this._onEnter = null;

    this._onCloseButtonClick = this._onCloseButtonClick.bind(this);
    this._onChangeScore = this._onChangeScore.bind(this);
  }

  get template() {
    return `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${this._poster}" alt="${this._title}">
            <p class="film-details__age">18+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${this._title}</h3>
                <p class="film-details__title-original">Original: ${this._title}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${this._rating}</p>
                <p class="film-details__user-rating">Your rate ${this._yourScore}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">Brad Bird</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">Brad Bird</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">Samuel L. Jackson, Catherine Keener, Sophia Bush</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">15 June 2018 (USA)</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">118 min</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">USA</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                  <span class="film-details__genre">Animation</span>
                  <span class="film-details__genre">Action</span>
                  <span class="film-details__genre">Adventure</span></td>
              </tr>
            </table>

            <p class="film-details__film-description">
              ${this._description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" checked>
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>

        <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._commtens.length}</span></h3>

        <ul class="film-details__comments-list">
          ${this._commentsMarkdown()}
        </ul>

          <div class="film-details__new-comment">
        <div>
          <label for="add-emoji" class="film-details__add-emoji-label">😐</label>
          <input type="checkbox" class="film-details__add-emoji visually-hidden" id="add-emoji">

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">😴</label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-neutral-face" value="neutral-face" checked>
            <label class="film-details__emoji-label" for="emoji-neutral-face">😐</label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-grinning" value="grinning">
            <label class="film-details__emoji-label" for="emoji-grinning">😀</label>
          </div>
        </div>
        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="← Select reaction, add comment here" name="comment"></textarea>
        </label>
      </div>
        </section>

        <section class="film-details__user-rating-wrap">
          <div class="film-details__user-rating-controls">
            <span class="film-details__watched-status film-details__watched-status--active">Already watched</span>
            <button class="film-details__watched-reset" type="button">undo</button>
          </div>

          <div class="film-details__user-score">
            <div class="film-details__user-rating-poster">
              <img src="images/posters/blackmail.jpg" alt="film-poster" class="film-details__user-rating-img">
            </div>

            <section class="film-details__user-rating-inner">
              <h3 class="film-details__user-rating-title">Incredibles 2</h3>

              <p class="film-details__user-rating-feelings">How you feel it?</p>

              <div class="film-details__user-rating-score">
                ${this._raitingScoreMarkdown()}
              </div>
            </section>
          </div>
        </section>
      </form>
    </section>`.trim();
  }

  set onClick(fn) {
    this._onClick = fn;
  }

  set onChange(fn) {
    this._onChange = fn;
  }

  set onEnter(fn) {
    this._onEnter = fn;
  }

  _onChangeScore(value) {
    return typeof this._onClick === `function` && this._onChange(value);
  }

  _onTextareaEnter() {
    let comment = {};
    comment.icon = this._element.querySelector(`.film-details__add-emoji-label`).innerHTML;
    comment.text = this._element.querySelector(`.film-details__comment-input`).value;
    comment.author = `Olika Kell`;
    comment.date = `1 day ago`;
    return typeof this._onEnter === `function` && this._onEnter(comment);
  }

  _onCloseButtonClick() {
    return typeof this._onClick === `function` && this._onClick();
  }

  update(data) {
    this._yourScore = parseInt(data.yourScore, 10);
    this._comments = data.comments;
  }

  createListeners() {
    this._element.querySelector(`.film-details__close-btn`)
        .addEventListener(`click`, this._onCloseButtonClick);

    let scores = this._element.querySelectorAll(`.film-details__user-rating-input`);
    scores.forEach(
        (score) => score.addEventListener(`change`, () => {
          this._onChangeScore(score.getAttribute(`value`));
        })
    );

    this._element.querySelector(`.film-details__comment-input`)
      .addEventListener(`keydown`, (e) => {
        if (e.ctrlKey && e.keyCode === 13) {
          this._onTextareaEnter();
        }
      });
  }

  removeListeners() {
    this._element.querySelector(`.film-details__close-btn`)
        .removeEventListener(`click`, this._onCloseButtonClick);
  }

  _raitingScoreMarkdown() {
    let scoreMarkdown = ``;
    for (let i = 1; i <= 9; i++) {
      scoreMarkdown += `
        <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${i}" id="rating-${i}" ${this._yourScore === i ? `checked` : ``}>
        <label class="film-details__user-rating-label" for="rating-${i}">${i}</label>
      `;
    }
    return scoreMarkdown;
  }

  _commentsMarkdown() {
    let commentMarkdown = ``;
    this._commtens.forEach((comment) => {
      commentMarkdown += `
              <li class="film-details__comment">
                <span class="film-details__comment-emoji">${comment.icon}</span>
                <div>
                  <p class="film-details__comment-text">${comment.text}</p>
                  <p class="film-details__comment-info">
                    <span class="film-details__comment-author">${comment.author}</span>
                    <span class="film-details__comment-day">${comment.date}</span>
                  </p>
                </div>
              </li>`;
    });
    return commentMarkdown;
  }
}
