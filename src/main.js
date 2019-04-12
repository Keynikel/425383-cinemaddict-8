import {API} from './api.js';
import {Filter} from './filter.js';
import {Film} from './film.js';
import {TopFilm} from './top-film.js';
import {FilmPopup} from './film-popup.js';
import {ShowMoreButton} from './show-more.js';
import {Statistic} from './statistic.js';
import {Search} from './search.js';

import {createCommonCallbacks, createSpetialCallbacks} from './callbacks.js';
import * as consts from './const.js';
import * as moment from 'moment';
import * as view from './view-utils.js';

const mainContainer = document.querySelector(`main`);
const cardsContainer = document.querySelector(`.films-list .films-list__container `);
const filmsCountContainer = document.querySelector(`.footer__statistics p`);
const filterContainer = document.querySelector(`.main-navigation`);
const searchContainer = document.querySelector(`.header__search`);
const userStatusContainer = document.querySelector(`.profile__rating`);

const api = new API({endPoint: consts.END_POINT, authorization: consts.AUTHORIZATION});
const searchField = new Search();
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

const renderInterface = (allFilms, countToShow) => {
  countToShow = 20;
  let visibleFilms = allFilms.slice(0, countToShow);
  const mostRatedContainer = document.querySelectorAll(`.films-list--extra .films-list__container`)[0];
  const mostCommentedContainer = document.querySelectorAll(`.films-list--extra .films-list__container`)[1];
  const mostRatedFilms = allFilms.sort((a, b) => b.rating - a.rating).slice(0, 2);
  const mostCommentedFilms = allFilms.sort((a, b) => b.comments.length - a.comments.length).slice(0, 2);

  renderFilters(filtersData, visibleFilms, allFilms);
  renderCards(visibleFilms);
  renderShowMoreButton(allFilms, countToShow);
  renderTopRatedCards(mostRatedFilms, mostRatedContainer);
  renderTopRatedCards(mostCommentedFilms, mostCommentedContainer);
  cardsContainer.parentNode.appendChild(showMoreButton.render());

  searchField.onInput = () => {
    const searchingValue = searchField._element.value;
    const filteredFilms = visibleFilms.filter((film) => film.title.match(searchingValue));
    renderCards(filteredFilms);
  };
};

const renderShowMoreButton = (allFilms, countToShow) => {
  let visibleFilms = allFilms.slice(0, countToShow);

  showMoreButton.onClick = () => {
    countToShow += consts.FILMS_LOADING_STEP;
    visibleFilms = allFilms.slice(0, countToShow);
    renderShowMoreButton(allFilms, countToShow);
    renderFilters(filtersData, visibleFilms, allFilms);
    renderCards(visibleFilms);
  };
};

const renderFilters = (filters, films, allFilms) => {
  filterContainer.innerHTML = ``;
  filters.forEach((item) => {
    const filter = new Filter(item, films);

    filter.onFilter = (anchor) => {
      if (anchor === `stats`) {
        renderCharts(allFilms);
      } else {
        if (mainContainer.querySelector(`.films`).classList.contains(`visually-hidden`)) {
          mainContainer.querySelector(`.films`).classList.remove(`visually-hidden`);
          mainContainer.removeChild(mainContainer.querySelector(`.statistic`));
        }
        let filteredCards = filterCards(films, anchor);
        filter.showedFilms += consts.FILMS_LOADING_STEP;
        if (filteredCards.length >= filter.showedFilms) {
          renderShowMoreButton(filteredCards, filter.showedFilms);
        }
        renderCards(filteredCards.slice(0, filter.showedFilms));
      }
    };

    filterContainer.appendChild(filter.render());
  });
};

const sortFilmsByTime = (films, value) => {
  switch (value) {
    case `all-time`:
      return films;
    case `today`:
      return films.filter((film) => moment(film.watchingDate).isSame(moment(), `day`));
    case `week`:
      return films.filter((film) => moment(film.watchingDate).isBetween(moment().startOf(`week`), moment().endOf(`week`)));
    case `month`:
      return films.filter((film) => moment(film.watchingDate).isSame(moment(), `month`));
    case `year`:
      return films.filter((film) => moment(film.watchingDate).isSame(moment(), `year`));
  }
  return 0;
};

const renderCharts = (films) => {
  const watchedFilms = films.filter((film) => film.state.isWatched);
  let stats = new Statistic(watchedFilms);

  mainContainer.querySelector(`.films`).classList.add(`visually-hidden`);
  mainContainer.appendChild(stats.render());
  stats.chartView();

  stats.onFilter = (value) => {
    const filteredFilms = sortFilmsByTime(watchedFilms, value);
    stats.renewValues = filteredFilms;
    stats.updateStatisticMarkup();
    stats.chartView();
  };
};

const renderCards = (films) => {
  cardsContainer.innerHTML = ``;
  films.forEach((film) => {
    const card = new Film(film);
    const popup = new FilmPopup(film);

    createCommonCallbacks(card, popup, film);
    createSpetialCallbacks(card, popup, film);
    cardsContainer.appendChild(card.render());
  });
};

const renderTopRatedCards = (films, container) => {
  container.innerHTML = ``;
  films.forEach((film) => {
    const card = new TopFilm(film);
    const popup = new FilmPopup(film);

    createCommonCallbacks(card, popup, film);
    container.appendChild(card.render());
  });
};

view.renderElement(cardsContainer, view.getConnectionStatus(consts.START_STRING));
api.getFilmsCount()
  .then((responce) => {
    const ALL_FILMS_COUNT = responce.length; // общее количество фильмов в системе

    view.renderElement(searchContainer, searchField.render());
    view.renderElement(userStatusContainer, view.getUserStatus(responce));

    filmsCountContainer.innerHTML = `${ALL_FILMS_COUNT} movies inside`;
  })
  .then(() => {
    api.getFilms()
      .then((films) => {
        renderInterface(films, cardsCount + consts.FILMS_LOADING_STEP);
      });
  })
  .catch((err) => {
    view.renderElement(cardsContainer, view.getConnectionStatus(consts.ERROR_STRING));
    console.log(err);
  });
