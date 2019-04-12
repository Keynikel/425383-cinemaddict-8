/* Импорты */
// import {toggleVisuallity} from './utils.js';
import * as view from './view-utils.js';
import {Filter} from './filter.js';

import {ShowMoreButton} from './show-more.js';
import {Film} from './film.js';
import {TopFilm} from './top-film.js';
import {FilmPopup} from './film-popup.js';
import {Statistic} from './statistic.js';
import {API} from './api.js';


/* Переменные */
const bodyContainer = document.querySelector(`body`);
const mainContainer = document.querySelector(`main`);
const searchContainer = document.querySelector(`.header__search`);
const filterContainer = document.querySelector(`.main-navigation`);
const cardsContainer = document.querySelector(`.films-list .films-list__container `);
const filmsCountContainer = document.querySelector(`.footer__statistics p`);
const showMoreButton = new ShowMoreButton();
let cardsCount = 0;

const filtersData = [
  {
    name: `All movies`,
    anchor: `all`,
    state: `active`
  },
  {
    name: `Watchlist`,
    anchor: `watchlist`
  },
  {
    name: `History`,
    anchor: `history`
  },
  {
    name: `Favorites`,
    anchor: `favorites`
  },
  {
    name: `Stats`,
    anchor: `stats`,
    state: `additional`
  }
];


const showCards = (allCardsCount) => {
  cardsCount = cardsCount + FILMS_LOADING_STEP;
  api.getFilms(cardsCount)
    .then((films) => {
      const chart = new Statistic(films);
      renderFilters(filtersData, films, chart);
      renderChart(chart);
      renderCards(films, `render`, chart);
      if (films.length >= allCardsCount) {
        showMoreButton.hideButton();
      }

      searchField.onInput = () => {
        const searchingValue = searchField._element.value;
        const filteredFilms = films.filter((film) => film.title.match(`^` + searchingValue));
        renderCards(filteredFilms, `filter`, ``);
      };
    })
    .catch(() => {
      const error = `<div>${ERROR_STRING}</div>`;
      cardsContainer.innerHTML = error;
    });
};

const renderUserStatus = (films) => {
  const userStatusContainer = document.querySelector(`.profile__rating`);
  const watchedFilms = films.filter((film) => film.user_details.already_watched);
  let status = ``;
  if (watchedFilms.length <= 10) {
    status = `novice`;
  } else {
    if (watchedFilms.length > 10 && watchedFilms.length <= 20) {
      status = `fan`;
    } else {
      status = `movie buff`;
    }
  }
  userStatusContainer.innerHTML = status;
};

const createCommonCallbacks = (films, card, film, popup, chart) => {
  card.onClick = () => {
    bodyContainer.appendChild(popup.render());
  };

  popup.onClick = () => {
    popup.unrender();
  };

  popup.onChange = (newScore) => {
    film.yourScore = newScore;

    view.blockRaitingInput(popup);
    api.updateFilm({id: film.id, data: film.toRAW()})
    .then((newFilm) => {
      popup.update(newFilm);
      popup.updateUserScore();
      view.unblockRaitingInput(popup);
    })
   .catch(() => {
     view.errorRaitingInput(popup);
   });
  };

  popup.onEnter = (newComments) => {
    film.comments.push(newComments);

    view.blockComment(popup);
    api.updateFilm({id: film.id, data: film.toRAW()})
    .then((newFilm) => {
      popup.update(newFilm);
      card.update(newFilm);
      popup.updateComments();
      view.unblockComment(popup);
    })
    .catch(() => {
      view.errorCOmment(popup);
    });
  };

  popup.onAddToWatchList = (evt) => {
    evt.preventDefault();
    film.state.isListed = !film.state.isListed;

    api.updateFilm({id: film.id, data: film.toRAW()})
    .then((newFilm) => {
      popup.update(newFilm);
      renderFilters(filtersData, films, chart);
      popup.updateFilmDetails(`listed`);
    });
  };

  popup.onAddToWatched = (evt) => {
    evt.preventDefault();
    film.state.isWatched = !film.state.isWatched;
    if (film.state.isWatched && film.state.isListed) {
      film.state.isListed = !film.state.isListed;
    }

    api.updateFilm({id: film.id, data: film.toRAW()})
    .then((newFilm) => {
      popup.update(newFilm);
      popup.updateFilmDetails(`watched`);
      renderFilters(filtersData, films, chart);
      api.getFilmsCount()
        .then((responce) => {
          renderUserStatus(responce);
        });
    });
  };

  popup.onAddToFavorite = (evt) => {
    evt.preventDefault();
    film.state.isFavorite = !film.state.isFavorite;

    api.updateFilm({id: film.id, data: film.toRAW()})
    .then((newFilm) => {
      popup.update(newFilm);
      renderFilters(filtersData, films, chart);
      popup.updateFilmDetails(`favorite`);
    });
  };

  popup.onDelete = () => {
    film.comments.pop();

    view.blockRemoveButton(popup);
    api.updateFilm({id: film.id, data: film.toRAW()})
    .then((newFilm) => {
      popup.update(newFilm);
      card.update(newFilm);
      popup.updateComments();
      popup.updateCommentsControls();
      view.unblockRemoveButton(popup);
    })
    .catch(() => {
      view.errorRemoveButton(popup);
    });
  };
};

const filterCards = (cards, filterName) => {
  switch (filterName) {
    case `all`:
      return cards;
    case `watchlist`:
      return cards.filter((card) => card.state.isListed);
    case `history`:
      return cards.filter((card) => card.state.isWatched);
    case `favorites`:
      return cards.filter((card) => card.state.isFavorite);
  }
  return 0;
};

const renderCards = (films, renderState, chart) => {
  const mostRatedContainer = document.querySelectorAll(`.films-list--extra .films-list__container`)[0];
  const mostCommentedContainer = document.querySelectorAll(`.films-list--extra .films-list__container`)[1];
  const mostRatedFilms = films.sort((a, b) => b.rating - a.rating).slice(0, 2);
  const mostCommentedFilms = films.sort((a, b) => b.comments.length - a.comments.length).slice(0, 2);
  cardsContainer.innerHTML = ``;
  mostRatedContainer.innerHTML = ``;
  mostCommentedContainer.innerHTML = ``;

  for (let i = 0; i < films.length; i++) {
    const film = films[i];
    const card = new Film(film);
    const popup = new FilmPopup(film);

    card.onAddToWatchList = (evt) => {
      evt.preventDefault();
      film.state.isListed = !film.state.isListed;

      view.blockControls(card);
      api.updateFilm({id: film.id, data: film.toRAW()})
      .then((newFilm) => {
        popup.update(newFilm);
        renderFilters(filtersData, films, chart);
        view.unblockControls(card);
      })
      .catch(() => {
        view.errorControls(card);
      });
    };

    card.onAddToWatched = (evt) => {
      evt.preventDefault();
      film.state.isWatched = !film.state.isWatched;
      if (film.state.isWatched && film.state.isListed) {
        film.state.isListed = !film.state.isListed;
      }

      view.blockControls(card);
      api.updateFilm({id: film.id, data: film.toRAW()})
      .then((newFilm) => {
        chart.unrender();
        popup.update(newFilm);
        chart.update(films);
        renderFilters(filtersData, films, chart);
        renderChart(chart);
        view.unblockControls(card);
        api.getFilmsCount()
          .then((responce) => {
            renderUserStatus(responce);
          });
      })
      .catch(() => {
        view.errorControls(card);
      });
    };

    card.onAddToFavorite = (evt) => {
      evt.preventDefault();
      film.state.isFavorite = !film.state.isFavorite;

      view.blockControls(card);
      api.updateFilm({id: film.id, data: film.toRAW()})
      .then((newFilm) => {
        chart.unrender();
        popup.update(newFilm);
        chart.update(films);
        renderFilters(filtersData, films, chart);
        renderChart(chart);
        view.unblockControls(card);
      })
      .catch(() => {
        view.errorControls(card);
      });
    };

    createCommonCallbacks(films, card, film, popup, chart);
    cardsContainer.appendChild(card.render());

    if (mostRatedFilms.includes(film)) {
      const topCard = new TopFilm(film);
      createCommonCallbacks(films, topCard, film, popup, chart);
      mostRatedContainer.appendChild(topCard.render());
    }

    if (mostCommentedFilms.includes(film)) {
      const topCard = new TopFilm(film);
      createCommonCallbacks(films, topCard, film, popup, chart);
      mostCommentedContainer.appendChild(topCard.render());
    }
  }
};

const renderFilters = (filters, films, chart) => {
  filterContainer.innerHTML = ``;
  filters.forEach((item) => {
    const filter = new Filter(item, films);
    filter.onFilter = (anchor) => {
      filter.setState(`active`);
      const filteredCards = filterCards(films, anchor);
      renderCards(filteredCards, `filter`, chart);
    };

    filterContainer.appendChild(filter.render());
  });
};

const renderChart = (stat) => {
  mainContainer.appendChild(stat.render());
  stat.chartView();
};

cardsContainer.innerHTML = `<div>${START_STRING}</div>`;
api.getFilmsCount()
  .then((responce) => {
    const ALL_FILMS_COUNT = responce.length; // общее количество фильмов в системе

    renderUserStatus(responce);

    showCards(ALL_FILMS_COUNT);

    cardsContainer.parentNode.appendChild(showMoreButton.render());
    showMoreButton.onClick = () => {
      showCards(ALL_FILMS_COUNT);
    };

    filmsCountContainer.innerHTML = `${responce.length} movies inside`;
  });
