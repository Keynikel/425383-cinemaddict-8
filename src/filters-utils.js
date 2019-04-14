import * as moment from 'moment';

export const filterCards = (showedCards, filterName, allCards = showedCards) => {
  switch (filterName) {
    case `all`:
      return allCards;
    case `watchlist`:
      return showedCards.filter((card) => card.state.isListed);
    case `history`:
      return showedCards.filter((card) => card.state.isWatched);
    case `favorites`:
      return showedCards.filter((card) => card.state.isFavorite);
  }
  return 0;
};

export const setFilterActive = (anchor) => {
  const filters = document.querySelectorAll(`.main-navigation__item `);
  const activeClass = `main-navigation__item--active`;
  filters.forEach((filter) => {
    if (filter.classList.contains(activeClass)) {
      filter.classList.remove(activeClass);
    }
    if (filter.getAttribute(`href`) === anchor) {
      filter.classList.add(activeClass);
    }
  });
};

export const filterFilmsByTime = (films, value) => {
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
