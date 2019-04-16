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
