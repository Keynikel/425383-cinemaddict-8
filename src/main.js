/* Импорты */
import {getFilm} from './get-film.js';
import {getFilters} from './get-filter.js';
import {Filter} from './filter.js';
import {Film} from './film.js';
import {FilmPopup} from './film-popup.js';

/* Переменные */

const cardsContainer = document.querySelector(`.films-list .films-list__container `);
const bodyContainer = document.querySelector(`body`);
const filterContainer = document.querySelector(`.main-navigation`);
const initialFilters = getFilters();
const initialCards = [];
for (let i = 0; i <= 7; i++) {
  initialCards[i] = getFilm();
}

const filterCards = (cards, filterName) => {
  switch (filterName) {
    case `all`:
      return cards;
    case `watchlist`:
      return cards.filter((card) => card.state.isListed);
    case `history`:
      return cards.filter((card) => card.state.isWatched);
  }
  return 0;
};

const renderCards = (films) => {
  cardsContainer.innerHTML = ``;

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
      popup.update(film);
    };

    card.onMarkAsWatched = (evt) => {
      evt.preventDefault();
      film.state.isWatched = !film.state.isWatched;
      if (film.state.isListed) {
        film.state.isListed = !film.state.isListed;
      }
      popup.update(film);
    };

    popup.onClick = () => {
      popup.unrender();
    };

    popup.onChange = (newObject) => {
      film.yourScore = newObject;
      popup.update(film);
      popup.unrender();
    };

    popup.onEnter = (newComments) => {
      film.comments.push(newComments);
      popup.update(film);
      card.update(film);
      card.unrender();
      cardsContainer.appendChild(card.render());
      popup.unrender();
    };

    cardsContainer.appendChild(card.render());
  }
};

const renderFilters = (filters) => {
  filterContainer.innerHTML = ``;

  filters.forEach((item) => {
    const filter = new Filter(item);

    filter.onFilter = (anchor) => {
      const filteredCards = filterCards(initialCards, anchor);
      renderCards(filteredCards, cardsContainer);
    };

    filterContainer.appendChild(filter.render());
  });
};

renderFilters(initialFilters, filterContainer);
renderCards(initialCards, cardsContainer);
