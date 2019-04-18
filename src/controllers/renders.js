import Filter from '../components/filter.js';
import Film from '../components/film.js';
import TopFilm from '../components/top-film.js';
import FilmPopup from '../components/film-popup.js';
import Search from '../components/search';
import ShowMoreButton from '../components/show-more';
import Statistic from '../components/statistic';

import {createCommonCallbacks, createSpetialCallbacks} from './callbacks.js';
import {FILTERS_DATA, FILMS_LOADING_STEP} from '../data/data';
import {filterCards, setFilterActive} from '../utils/filters-utils.js';
import {renderElement} from '../utils/view-utils.js';

const mainContainer = document.querySelector(`main`);
const cardsContainer = document.querySelector(`.films-list .films-list__container `);
const searchContainer = document.querySelector(`.header__search`);

export const showMoreButton = new ShowMoreButton();

export const renderInterface = (allFilms, countToShow) => {
  const searchField = new Search();
  const mostRatedContainer = document.querySelectorAll(`.films-list--extra .films-list__container`)[0];
  const mostCommentedContainer = document.querySelectorAll(`.films-list--extra .films-list__container`)[1];
  const filteredFilms = allFilms.slice();
  const visibleFilms = filteredFilms.slice(0, countToShow);
  const mostRatedFilms = allFilms.sort((a, b) => b.rating - a.rating).slice(0, 2);
  const mostCommentedFilms = allFilms.sort((a, b) => b.comments.length - a.comments.length).slice(0, 2);

  renderElement(searchContainer, searchField.render());
  renderFilters(FILTERS_DATA, filteredFilms);
  renderCards(visibleFilms, filteredFilms);
  renderShowMoreButton(filteredFilms, countToShow);
  renderTopRatedCards(mostRatedFilms, mostRatedContainer, visibleFilms);
  renderTopRatedCards(mostCommentedFilms, mostCommentedContainer, visibleFilms);
  cardsContainer.parentNode.appendChild(showMoreButton.render());

  searchField.onInput = () => {
    const searchingValue = searchField.value;
    const filtered = visibleFilms.filter((film) => film.title.toLowerCase().match(searchingValue));
    renderCards(filtered, allFilms);
  };
};

export const renderFilters = (filters, allFilms) => {
  const filterContainer = document.querySelector(`.main-navigation`);
  const activeFilter = document.querySelector(`.main-navigation__item--active`).getAttribute(`href`);

  filterContainer.innerHTML = ``;
  filters.forEach((item) => {
    const filter = new Filter(item, allFilms);

    filter.onFilter = (anchor) => {
      const fullAnchor = `#` + anchor;
      setFilterActive(fullAnchor);
      if (anchor === `stats`) {
        renderCharts(allFilms);
      } else {
        if (mainContainer.querySelector(`.films`).classList.contains(`visually-hidden`)) {
          mainContainer.querySelector(`.films`).classList.remove(`visually-hidden`);
          mainContainer.removeChild(mainContainer.querySelector(`.statistic`));
        }
        const filteredCards = filterCards(allFilms, anchor);
        filter.showedFilms += FILMS_LOADING_STEP;
        renderFilters(FILTERS_DATA, allFilms);
        renderShowMoreButton(filteredCards, filter.showedFilms, anchor);
        renderCards(filteredCards.slice(0, filter.showedFilms), allFilms);
      }
    };
    setFilterActive(activeFilter);
    filterContainer.appendChild(filter.render());
  });
};

export const renderShowMoreButton = (allFilms, countToShow, state = `all`) => {
  let visibleFilms = allFilms.slice(0, countToShow);

  if (countToShow >= allFilms.length) {
    showMoreButton.hideButton();
  } else {
    if (showMoreButton.state === `hide`) {
      showMoreButton.showButton();
    }
  }

  showMoreButton.onClick = () => {
    countToShow += FILMS_LOADING_STEP;
    visibleFilms = allFilms.slice(0, countToShow);
    renderShowMoreButton(allFilms, countToShow, state);
    renderCards(visibleFilms, allFilms);
  };
};

export const renderCards = (films, allFilms) => {
  cardsContainer.innerHTML = ``;
  films.forEach((film) => {
    const card = new Film(film);
    const popup = new FilmPopup(film);

    createCommonCallbacks(card, popup, film, allFilms);
    createSpetialCallbacks(card, popup, film, allFilms);
    cardsContainer.appendChild(card.render());
  });
};

export const renderTopRatedCards = (films, container, allFilms) => {
  container.innerHTML = ``;
  films.forEach((film) => {
    const card = new TopFilm(film);
    const popup = new FilmPopup(film);

    createCommonCallbacks(card, popup, film, allFilms);
    container.appendChild(card.render());
  });
};

export const renderCharts = (films) => {
  const watchedFilms = films.filter((film) => film.state.isWatched);
  const stats = new Statistic(watchedFilms);

  mainContainer.querySelector(`.films`).classList.add(`visually-hidden`);
  mainContainer.appendChild(stats.render());
};
