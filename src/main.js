/* Импорты */
import {getFilm} from './get-film.js';
import {getFilters} from './get-filter.js';
import {toggleVisuallity} from './utils.js';
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
const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});



const initialFilters = getFilters();

api.getFilms()
  .then((films) => {
    renderCards(films, cardsContainer)
  });

// const chart = new Statistic(initialCards);
//
// const filterCards = (cards, filterName) => {
//   switch (filterName) {
//     case `all`:
//       toggleVisuallity(`films`);
//       return cards;
//     case `watchlist`:
//       toggleVisuallity(`films`);
//       return cards.filter((card) => card.state.isListed);
//     case `history`:
//       toggleVisuallity(`films`);
//       return cards.filter((card) => card.state.isWatched);
//     case `stats`:
//       toggleVisuallity(`statistic`);
//
//   }
//   return 0;
// };
//
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
      // chart.unrender();
      // chart.update(films);
      // popup.update(film);
      // renderChart(chart);
    };

    popup.onClick = () => {
      popup.unrender();
    };

    popup.onChange = (newScore) => {
      film.yourScore = newScore;
      api.updateFilm({id: film.id, data: film.toRAW()})
      .then((newFilm) => {
        popup.update(newFilm);
        popup.unrender();
      })
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

// const renderFilters = (filters) => {
//   filterContainer.innerHTML = ``;
//
//   filters.forEach((item) => {
//     const filter = new Filter(item);
//
//     filter.onFilter = (anchor) => {
//       const filteredCards = filterCards(initialCards, anchor);
//       renderCards(filteredCards, cardsContainer);
//     };
//
//     filterContainer.appendChild(filter.render());
//   });
// };
//
// const renderChart = (stat) => {
//   mainContainer.appendChild(stat.render());
//   stat.chartView();
// };
//
// renderFilters(initialFilters, filterContainer);
//
//
// renderCards(initialCards, cardsContainer);
// renderChart(chart);
