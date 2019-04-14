/* Глобальные константы */
export const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=${Math.random()}`;
export const END_POINT = ` https://es8-demo-srv.appspot.com/moowle/`;
export const START_STRING = `Loading movies...`;
export const ERROR_STRING = `Something went wrong while loading movies. Check your connection or try again later`;
export const FILMS_LOADING_STEP = 5;

export const FILTERS_DATA = [
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
