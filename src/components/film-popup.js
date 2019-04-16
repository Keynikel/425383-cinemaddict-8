import Component from './component';
import moment from 'moment';
import toEmoji from 'emoji-name-map';

class FilmPopup extends Component {

  constructor(data) {
    super();
    this._id = data.id;
    this._title = data.title;
    this._alternative = data.alternative;
    this._rating = data.rating;
    this._age = data.age;
    this._yourScore = data.yourScore;
    this._director = data.director;
    this._writers = data.writers;
    this._actors = data.actors;
    this._year = data.year;
    this._country = data.country;
    this._duration = data.duration;
    this._genres = data.genre;
    this._poster = data.poster;
    this._description = data.description;
    this._comments = data.comments;
    this._watchingDate = data.watchingDate;
    this._element = null;

    this._state = {
      isListed: data.state.isListed,
      isWatched: data.state.isWatched,
      isFavorite: data.state.isFavorite
    };

    this._onChange = null;
    this._onClick = null;
    this._onEnter = null;
    this._onDelete = null;

    this._onCloseButtonClick = this._onCloseButtonClick.bind(this);
    this._onEscPress = this._onEscPress.bind(this);
    this._onAddToWatchList = this._onAddToWatchList.bind(this);
    this._onAddToWatched = this._onAddToWatched.bind(this);
    this._onAddToFavorite = this._onAddToFavorite.bind(this);
    this._onChangeScore = this._onChangeScore.bind(this);
    this._onDeleteLastComment = this._onDeleteLastComment.bind(this);

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
            <p class="film-details__age">${this._age}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${this._title}</h3>
                <p class="film-details__title-original">Original: ${this._alternative}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${this._rating}</p>
                <p class="film-details__user-rating">Your rate ${this._yourScore}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${this._director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${this._writers.join(`, `)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${this._actors.join(`, `)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${moment(this._year).format(`DD MMMM YYYY`)} (${this._country})</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell"> ${this._duration} min</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${this._country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                  ${this._genres.map((genre) => `<span class="film-details__genre">${genre}</span>`.trim()).join(``)}
                </td>
              </tr>
            </table>

            <p class="film-details__film-description">
              ${this._description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${this._state.isListed ? `checked` : ``}>
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${this._state.isWatched ? `checked` : ``}>
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${this._state.isFavorite ? `checked` : ``}>
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>

        <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._comments.length}</span></h3>

        <ul class="film-details__comments-list">
          ${this._changeCommentsMarkdown()}
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
          <span class="film-details__watched-status ${this._state.isWatched ? `film-details__watched-status--active` : ``} "> ${this._changeFilmStatusText()} </span>
            <button class="film-details__watched-reset  visually-hidden" type="button">undo</button>
          </div>

          <div class="film-details__user-score">
            <div class="film-details__user-rating-poster">
              <img src="images/posters/blackmail.jpg" alt="film-poster" class="film-details__user-rating-img">
            </div>

            <section class="film-details__user-rating-inner">
              <h3 class="film-details__user-rating-title">Incredibles 2</h3>

              <p class="film-details__user-rating-feelings">How you feel it?</p>

              <div class="film-details__user-rating-score">
                ${this._changeRaitingScoreMarkdown()}
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

  set onAddToWatchList(fn) {
    this._onAddToWatchList = fn;
  }

  set onAddToWatched(fn) {
    this._onAddToWatched = fn;
  }

  set onAddToFavorite(fn) {
    this._onAddToFavorite = fn;
  }

  set onDelete(fn) {
    this._onDelete = fn;
  }

  set onChange(fn) {
    this._onChange = fn;
  }

  set onEnter(fn) {
    this._onEnter = fn;
  }

  update(data) {
    this._state.isListed = data.user_details.watchlist;
    this._state.isWatched = data.user_details.already_watched;
    this._state.isFavorite = data.user_details.favorite;
    this._yourScore = data.user_details.personal_rating;
    this._comments = data.comments;
  }

  updateComments() {
    const raitingControlsContainer = this._element.querySelector(`.film-details__watched-reset`);
    const commentsCounter = this._element.querySelector(`.film-details__comments-count`);
    const commentsContainer = this._element.querySelector(`.film-details__comments-list`);
    const commentsList = this._changeCommentsMarkdown();
    raitingControlsContainer.classList.remove(`visually-hidden`);
    commentsCounter.textContent = this._comments.length;
    commentsContainer.innerHTML = commentsList;
  }

  updateCommentsControls() {
    const raitingControlsContainer = this._element.querySelector(`.film-details__watched-reset`);
    raitingControlsContainer.classList.add(`visually-hidden`);
  }

  updateUserScore() {
    const scoreContainer = this._element.querySelector(`.film-details__user-rating`);
    scoreContainer.textContent = `Your rate ${this._yourScore}`;
  }

  updateFilmDetails(state) {
    const detalisContainer = this._element.querySelector(`.film-details__controls`);
    const statusContainer = this._element.querySelector(`.film-details__watched-status`);
    const filmStatusContainer = this._element.querySelector(`.film-details__watched-status`);
    let checkField = ``;
    let newCheckField = ``;

    switch (state) {
      case `listed`:
        checkField = detalisContainer.querySelector(`#watchlist`);
        newCheckField = document.createElement(`div`);
        newCheckField.innerHTML = `<input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${this._state.isListed ? `checked` : ``}>`;
        break;
      case `watched`:
        checkField = detalisContainer.querySelector(`#watchlist`);
        newCheckField = document.createElement(`div`);
        newCheckField.innerHTML = `<input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${this._state.isListed ? `checked` : ``}>`;
        detalisContainer.replaceChild(newCheckField.firstChild, checkField);
        checkField = detalisContainer.querySelector(`#watched`);
        newCheckField = document.createElement(`div`);
        newCheckField.innerHTML = `<input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${this._state.isWatched ? `checked` : ``}>`;
        break;
      case `favorite`:
        checkField = detalisContainer.querySelector(`#favorite`);
        newCheckField = document.createElement(`div`);
        newCheckField.innerHTML = `<input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${this._state.isFavorite ? `checked` : ``}>`;
        break;
    }
    statusContainer.innerHTML = status;
    detalisContainer.replaceChild(newCheckField.firstChild, checkField);
    if (this._state.isWatched) {
      filmStatusContainer.classList.add(`film-details__watched-status--active`);
    } else {
      filmStatusContainer.classList.remove(`film-details__watched-status--active`);
    }
    filmStatusContainer.innerHTML = this._changeFilmStatusText();
  }

  _changeRaitingScoreMarkdown() {
    let scoreMarkdown = ``;
    for (let i = 1; i <= 9; i++) {
      scoreMarkdown += `
        <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${i}" id="rating-${i}" ${this._yourScore === i ? `checked` : ``}>
        <label class="film-details__user-rating-label" for="rating-${i}">${i}</label>
      `;
    }
    return scoreMarkdown;
  }

  _changeCommentsMarkdown() {
    let commentMarkdown = ``;

    this._comments.forEach((comment) => {
      let emojiText = comment.emotion;
      emojiText = emojiText.replace(/\-/gi, `_`);

      commentMarkdown += `
        <li class="film-details__comment">
          <span class="film-details__comment-emoji">${toEmoji.get(`:${emojiText}:`)}</span>
            <div>
              <p class="film-details__comment-text">${comment.comment}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${comment.author}</span>
                <span class="film-details__comment-day">${moment().to(comment.date)}</span>
              </p>
            </div>
          </li>`;
    });
    return commentMarkdown;
  }

  _changeIconMarkdown(icon) {
    icon = icon.replace(/\-/gi, `_`);
    const iconContainer = this._element.querySelector(`.film-details__add-emoji-label`);
    iconContainer.innerHTML = toEmoji.get(`:${icon}:`);
  }

  _changeFilmStatusText() {
    if (this._state.isWatched) {
      return `Already watched`;
    } else {
      if (this._state.isListed) {
        return `Will watch`;
      } else {
        return ``;
      }
    }
  }

  _onAddToWatchList(evt) {
    evt.preventDefault();
    return typeof this._onAddToWatchList === `function` && this._onAddToWatchList();
  }

  _onAddToWatched(evt) {
    evt.preventDefault();
    return typeof this._onAddToWatched === `function` && this._onAddToWatched();
  }

  _onDeleteLastComment() {
    return typeof this._onDelete === `function` && this._onDelete();
  }

  _onAddToFavorite(evt) {
    evt.preventDefault();
    return typeof this._onAddToFavorite === `function` && this._onAddToFavorite();
  }

  _onChangeScore(value) {
    return typeof this._onClick === `function` && this._onChange(value);
  }

  _onTextareaEnter() {
    let comment = {};
    comment.author = `Olika Kell`;
    comment.emotion = this._element.querySelector(`.film-details__emoji-item:checked`).getAttribute(`value`);
    comment.comment = this._element.querySelector(`.film-details__comment-input`).value;
    comment.date = moment().format();
    return typeof this._onEnter === `function` && this._onEnter(comment);
  }

  _onCloseButtonClick() {
    return typeof this._onClick === `function` && this._onClick();
  }

  _onEscPress(evt) {
    if (evt.keyCode === 27) {
      return typeof this._onClick === `function` && this._onClick();
    }
    return 0;
  }

  createListeners() {
    document.addEventListener(`keydown`, this._onEscPress);

    this._element.querySelector(`.film-details__close-btn`)
        .addEventListener(`click`, this._onCloseButtonClick);

    this._element.querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, this._onAddToWatchList);

    this._element.querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, this._onAddToWatched);

    this._element.querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, this._onAddToFavorite);

    let scores = this._element.querySelectorAll(`.film-details__user-rating-input`);
    scores.forEach(
        (score) => score.addEventListener(`change`, () => {
          this._onChangeScore(score.getAttribute(`value`));
        })
    );

    this._element.querySelector(`.film-details__comment-input`)
      .addEventListener(`keydown`, (e) => {
        const isMac = window.navigator.platform.match(`Mac`);
        if ((isMac ? e.metaKey : e.ctrlKey) && e.keyCode === 13) {
          this._onTextareaEnter();
        }
      });

    let icons = this._element.querySelectorAll(`.film-details__emoji-item`);
    icons.forEach(
        (icon) => icon.addEventListener(`change`, () =>
          this._changeIconMarkdown(icon.getAttribute(`value`))
        )
    );

    this._element.querySelector(`.film-details__watched-reset`)
      .addEventListener(`click`, this._onDeleteLastComment);
  }

  removeListeners() {
    document.removeEventListener(`keydown`, this._onEscPress);

    this._element.querySelector(`.film-details__close-btn`)
        .removeEventListener(`click`, this._onCloseButtonClick);

    this._element.querySelector(`.film-details__control-label--watchlist`)
      .removeEventListener(`click`, this._onAddToWatchList);

    this._element.querySelector(`.film-details__control-label--watched`)
      .removeEventListener(`click`, this._onAddToWatched);

    this._element.querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, this._onAddToFavorite);
  }

}

export default FilmPopup;
