/* Импорты */
import {getFilters} from './get-filter.js';
import {toggleVisuallity, shake} from './utils.js';
import {Filter} from './filter.js';
import {Film} from './film.js';
import {FilmPopup} from './film-popup.js';
import {Statistic} from './statistic.js';
import {API} from './api.js';

/* Переменные */
const bodyContainer = document.querySelector(`body`);
const mainContainer = document.querySelector(`main`);
const filterContainer = document.querySelector(`.main-navigation`);
const cardsContainer = document.querySelector(`.films-list .films-list__container `);

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=${Math.random()}`;
const END_POINT = ` https://es8-demo-srv.appspot.com/moowle/`;
const START_STRING = `Loading movies...`;
const ERROR_STRING = `Something went wrong while loading movies. Check your connection or try again later`;

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

const initialFilters = getFilters();

const filterCards = (cards, filterName) => {
  switch (filterName) {
    case `all`:
      toggleVisuallity(`films`);
      return cards;
    case `watchlist`:
      toggleVisuallity(`films`);
      return cards.filter((card) => card.state.isListed);
    case `history`:
      toggleVisuallity(`films`);
      return cards.filter((card) => card.state.isWatched);
    case `stats`:
      toggleVisuallity(`statistic`);
      return cards;

  }
  return 0;
};

const renderCards = (films, chart) => {
  cardsContainer.textContent = ``;
  for (let i = 0; i < films.length; i++) {
    const film = films[i];
    const card = new Film(film);
    const popup = new FilmPopup(film);

    card.onClick = () => {
      bodyContainer.appendChild(popup.render());
    };

    card.onAddToWatchList = (evt) => {
      evt.preventDefault();
      film.state.isListed = !film.state.isListed;

      const block = () => {
        const userButtons = card._element.querySelectorAll(`.film-card__controls button`);
        userButtons.forEach((button) => {
          button.disabled = true;
          button.style.opacity = `0.5`;
        });
      };

      const unblock = () => {
        const userButtons = card._element.querySelectorAll(`.film-card__controls button`);
        userButtons.forEach((button) => {
          button.disabled = false;
          button.style.opacity = `1`;
        });
      };

      const error = () => {
        shake(card._element);
        const userButtons = card._element.querySelectorAll(`.film-card__controls button`);
        userButtons.forEach((button) => {
          button.disabled = false;
          button.style.opacity = `1`;
        });
      };

      block();
      api.updateFilm({id: film.id, data: film.toRAW()})
      .then((newFilm) => {
        popup.update(newFilm);
        unblock();
      })
      .catch(() => {
        error();
      });
    };

    card.onMarkAsWatched = (evt) => {
      evt.preventDefault();
      film.state.isWatched = !film.state.isWatched;
      if (film.state.isWatched && film.state.isListed) {
        film.state.isListed = !film.state.isListed;
      }

      const block = () => {
        const userButtons = card._element.querySelectorAll(`.film-card__controls button`);
        userButtons.forEach((button) => {
          button.disabled = true;
          button.style.opacity = `0.5`;
        });
      };

      const unblock = () => {
        const userButtons = card._element.querySelectorAll(`.film-card__controls button`);
        userButtons.forEach((button) => {
          button.disabled = false;
          button.style.opacity = `1`;
        });
      };

      const error = () => {
        shake(card._element);
        const userButtons = card._element.querySelectorAll(`.film-card__controls button`);
        userButtons.forEach((button) => {
          button.disabled = false;
          button.style.opacity = `1`;
        });
      };

      block();
      api.updateFilm({id: film.id, data: film.toRAW()})
      .then((newFilm) => {
        chart.unrender();
        popup.update(newFilm);
        chart.update(films);
        renderChart(chart);
        unblock();
      })
      .catch(() => {
        error();
      });
    };

    popup.onClick = () => {
      popup.unrender();
    };

    popup.onChange = (newScore) => {
      film.yourScore = newScore;

      const block = () => {
        const scoreButtons = popup._element.querySelectorAll(`.film-details__user-rating-input`);
        scoreButtons.forEach(
            (button) => {
              const label = button.nextElementSibling;
              button.disabled = true;
              label.style.background = `#979797`;
            }
        );
      };

      const unblock = () => {
        const scoreButtons = popup._element.querySelectorAll(`.film-details__user-rating-input`);
        scoreButtons.forEach(
            (button) => {
              const label = button.nextSibling.nextSibling;
              button.disabled = false;
              if (button.checked) {
                label.style.background = `#ffe800`;
              } else {
                label.style.background = `#d8d8d8`;
              }

            }
        );
      };

      const error = () => {
        const scoreButtons = popup._element.querySelectorAll(`.film-details__user-rating-input`);
        scoreButtons.forEach(
            (button) => {
              const label = button.nextSibling.nextSibling;
              button.disabled = false;
              if (button.checked) {
                label.style.background = `red`;
                shake(label);
              } else {
                label.style.background = `#d8d8d8`;
              }

            }
        );
      };

      block();
      api.updateFilm({id: film.id, data: film.toRAW()})
      .then((newFilm) => {
        popup.update(newFilm);
        popup.updateUserScore();
        unblock();
      })
     .catch(() => {
       error();
     });
    };

    popup.onEnter = (newComments) => {
      film.comments.push(newComments);

      const block = () => {
        const inputField = popup._element.querySelector(`.film-details__comment-input`);
        inputField.disabled = true;
        inputField.style.border = `1px solid #979797`;
        inputField.style.background = `#979797`;
      };

      const unblock = () => {
        const inputField = popup._element.querySelector(`.film-details__comment-input`);
        inputField.disabled = false;
        inputField.style.background = `#f6f6f6`;
        inputField.value = ``;
      };

      const error = () => {
        const inputField = popup._element.querySelector(`.film-details__comment-input`);
        shake(inputField);
        inputField.disabled = false;
        inputField.style.background = `#f6f6f6`;
        inputField.style.border = `1px solid red`;
      };

      block();
      api.updateFilm({id: film.id, data: film.toRAW()})
      .then((newFilm) => {
        popup.update(newFilm);
        card.update(newFilm);
        popup.updateComments();
        unblock();
      })
      .catch(() => {
        error();
      });
    };

    cardsContainer.appendChild(card.render());
  }
};

const renderFilters = (filters, films, chart) => {
  filterContainer.textContent = ``;
  filters.forEach((item) => {
    const filter = new Filter(item);

    filter.onFilter = (anchor) => {
      const filteredCards = filterCards(films, anchor);
      renderCards(filteredCards, chart);
    };

    filterContainer.appendChild(filter.render());
  });
};

const renderChart = (stat) => {
  mainContainer.appendChild(stat.render());
  stat.chartView();
};

cardsContainer.innerHTML = `<div>${START_STRING}</div>`;
api.getFilms()
  .then((films) => {
    const chart = new Statistic(films);
    renderFilters(initialFilters, films, chart);
    renderChart(chart);
    renderCards(films, chart);

  })
  .catch(() => {
    const error = `<div>${ERROR_STRING}</div>`;
    cardsContainer.innerHTML = error;
  });
